import type { WebflowClient } from 'webflow-api';
import { createCmsClient, type Locals } from './webflow-client';

// ---------------------------------------------------------------------------
// Server-only Photo Hotspot helpers.
//
// This file imports `webflow-api`/`./webflow-client`, which pull in Node-only
// dependencies (e.g. `whatwg-url`). It must NEVER be imported from a React
// component that hydrates on the client — use `./photo-hotspots-utils`
// instead for pure, client-safe helpers (PhotoHotspotItem, extractAssetIds,
// hotspotsForPhoto, fetchAllPhotoHotspots, etc).
//
// Everything from `./photo-hotspots-utils` is re-exported below so existing
// server-side callers (API routes, scripts) can keep importing from here.
// ---------------------------------------------------------------------------
export * from './photo-hotspots-utils';
import {
  PHOTO_HOTSPOTS_COLLECTION_ID,
  toPhotoHotspotItem,
  hotspotsForPhoto,
  type PhotoHotspotItem,
} from './photo-hotspots-utils';

/**
 * Fetches every Photo Hotspot item — both live/published AND
 * draft/staged — directly via the Webflow SDK (no internal HTTP
 * round-trip). Uses `listItems` (not `listItemsLive`) so that a photo
 * replace/re-key run also catches hotspots that only exist as unpublished
 * drafts/edits; otherwise those would be silently skipped (never matched,
 * never re-pointed at the new photo) and would orphan themselves the next
 * time they're published. Intended for server-side callers that already
 * have a `WebflowClient` instance (e.g. API routes), mirroring the pattern
 * used by `buildSyncReport` in `sync-photo-hotspots.ts`.
 */
export async function fetchAllPhotoHotspotsWithClient(client: WebflowClient): Promise<PhotoHotspotItem[]> {
  const items: PhotoHotspotItem[] = [];
  const limit = 100;
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const res: any = await client.collections.items.listItems(PHOTO_HOTSPOTS_COLLECTION_ID, { limit, offset });
    const pageItems: Array<{ id: string; fieldData?: Record<string, any> }> = res?.items || [];
    pageItems.forEach((it) => items.push(toPhotoHotspotItem(it)));
    total = res?.pagination?.total ?? pageItems.length;
    offset += limit;
    if (pageItems.length === 0) break;
  }

  return items;
}

// ---------------------------------------------------------------------------
// Re-keying hotspots to a replacement photo
// ---------------------------------------------------------------------------

export interface RekeyHotspotsErrorEntry {
  /** Hotspot item id, or a sentinel like '(publish)' for a non-item-scoped failure. */
  id: string;
  error: string;
}

export interface RekeyHotspotsResult {
  updatedCount: number;
  errors: RekeyHotspotsErrorEntry[];
}

export interface RekeyHotspotsForPhotoParams {
  /** Astro `locals` — forwarded to `createCmsClient` to resolve the API token. */
  locals?: Locals;
  /** Room Type that owns the photo being replaced (kept for context/logging — this
   * collection doesn't currently expose a `room-type` reference field on each
   * hotspot, so it isn't written to `fieldData`). */
  roomTypeId?: string | null;
  /** The photo being replaced/removed. Either `fileId` or `url` is enough to match. */
  oldPhoto: { fileId?: string | null; url?: string | null };
  /** The photo that should take its place. Both fields are required. */
  newPhoto: { fileId: string; url: string };
  /** Every Photo Hotspot item currently assigned to this Room Type (pre-fetched by the caller). */
  allRoomTypeHotspots: PhotoHotspotItem[];
}

/**
 * Re-points every Photo Hotspot pinned to `oldPhoto` so it's pinned to
 * `newPhoto` instead — used when a gallery photo is replaced/re-uploaded and
 * its CDN fileId/url changes, which would otherwise orphan any hotspots tagged
 * on it (see `hotspotsForPhoto`/`extractAssetIds`).
 *
 * For every matching hotspot, patches `photo-file-id` and `photo-url` to the
 * new photo's values while explicitly re-sending every other field
 * (`amenity`, `x-percent`, `y-percent`, `display-order`, `name`, `slug`,
 * `active`) unchanged, so the patch can't silently clear them. Matched items
 * are published live once all updates succeed.
 */
export async function rekeyHotspotsForPhoto({
  locals,
  roomTypeId,
  oldPhoto,
  newPhoto,
  allRoomTypeHotspots,
}: RekeyHotspotsForPhotoParams): Promise<RekeyHotspotsResult> {
  if (!newPhoto?.fileId || !newPhoto?.url) {
    return {
      updatedCount: 0,
      errors: [{ id: '(none)', error: 'newPhoto requires both fileId and url.' }],
    };
  }

  const matches = hotspotsForPhoto(allRoomTypeHotspots, oldPhoto?.fileId, oldPhoto?.url);

  if (matches.length === 0) {
    const warningMessage = `No Photo Hotspots were found matching the previous photo (fileId: ${
      oldPhoto?.fileId || '(none)'
    }, url: ${oldPhoto?.url || '(none)'}) — nothing was re-keyed to the new photo.`;
    console.warn(`[rekeyHotspotsForPhoto] ${warningMessage}`);
    return {
      updatedCount: 0,
      errors: [{ id: '(none)', error: warningMessage }],
    };
  }

  let client;
  try {
    client = createCmsClient(locals);
  } catch (error: any) {
    return {
      updatedCount: 0,
      errors: matches.map((hotspot) => ({
        id: hotspot.id,
        error: error?.message || 'Failed to create CMS client.',
      })),
    };
  }

  const errors: RekeyHotspotsErrorEntry[] = [];
  const updatedIds: string[] = [];

  for (const hotspot of matches) {
    try {
      await client.collections.items.updateItem(PHOTO_HOTSPOTS_COLLECTION_ID, hotspot.id, {
        fieldData: {
          // Fields being re-keyed to the replacement photo.
          'photo-file-id': newPhoto.fileId,
          'photo-url': newPhoto.url,
          // Preserve every other field explicitly so this patch can't wipe them.
          name: hotspot.name,
          ...(hotspot.slug ? { slug: hotspot.slug } : {}),
          amenity: hotspot.amenityId ?? null,
          'x-percent': hotspot.xPercent,
          'y-percent': hotspot.yPercent,
          'display-order': hotspot.displayOrder,
          active: hotspot.active ?? true,
        },
      });
      updatedIds.push(hotspot.id);
    } catch (error: any) {
      errors.push({ id: hotspot.id, error: error?.message || 'Unknown error' });
    }
    // Small delay to stay well within Webflow's rate limits (mirrors deleteHotspotItems).
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  if (updatedIds.length > 0) {
    try {
      await client.collections.items.publishItem(PHOTO_HOTSPOTS_COLLECTION_ID, {
        itemIds: updatedIds,
      });
    } catch (error: any) {
      errors.push({ id: '(publish)', error: error?.message || 'Failed to publish updated hotspots.' });
    }
  }

  // `roomTypeId` isn't written to fieldData (see param doc above) but is
  // accepted so callers can pass it through for logging/telemetry without
  // a type error.
  void roomTypeId;

  return { updatedCount: updatedIds.length, errors };
}
