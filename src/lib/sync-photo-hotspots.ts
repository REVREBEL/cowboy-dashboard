import type { WebflowClient } from 'webflow-api';
import { PHOTO_HOTSPOTS_COLLECTION_ID, extractAssetIds, primaryAssetId } from './photo-hotspots';
import { ROOM_TYPES_COLLECTION_ID, extractPhotosFromFieldData, type RoomTypePhoto } from './room-type-photos';

// Amenities collection — used only to resolve friendly names for the report.
// See src/lib/collections-config.ts.
const AMENITIES_COLLECTION_ID = '6abc8175a7bbdc92fa9e6599';

export interface HotspotSummary {
  id: string;
  name: string;
  amenityId: string | null;
  amenityName: string;
  photoRef: string;
  xPercent: number | null;
  yPercent: number | null;
  roomTypeId: string | null;
  roomTypeName: string | null;
}

export interface DuplicateGroup {
  roomTypeId: string;
  roomTypeName: string;
  amenityId: string | null;
  amenityName: string;
  photoRef: string;
  kept: HotspotSummary;
  removed: HotspotSummary[];
}

export interface SyncReport {
  roomTypeCount: number;
  hotspotCount: number;
  orphans: HotspotSummary[];
  duplicateGroups: DuplicateGroup[];
  /** Ids that would be deleted (orphans + removed duplicates), respecting skip flags. */
  toDeleteIds: string[];
}

export interface SyncOptions {
  skipOrphans?: boolean;
  skipDuplicates?: boolean;
  /** Only report duplicate groups belonging to this Room Type item id. */
  roomTypeFilter?: string | null;
  /** Percent tolerance when comparing x/y for duplicate detection. */
  coordEpsilon?: number;
}

// ---------------------------------------------------------------------------
// Fetch helpers
// ---------------------------------------------------------------------------

interface RawItem {
  id: string;
  fieldData: Record<string, any>;
  createdOn?: string;
  lastUpdated?: string;
}

async function fetchAllLive(client: WebflowClient, collectionId: string): Promise<RawItem[]> {
  const items: RawItem[] = [];
  const limit = 100;
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const res: any = await client.collections.items.listItemsLive(collectionId, { limit, offset });
    const pageItems: RawItem[] = res?.items || [];
    items.push(...pageItems);
    total = res?.pagination?.total ?? pageItems.length;
    offset += limit;
    if (pageItems.length === 0) break;
  }

  return items;
}

// ---------------------------------------------------------------------------
// Data shaping
// ---------------------------------------------------------------------------

interface Hotspot {
  id: string;
  name: string;
  amenityId: string | null;
  photoFileId: string | null;
  photoUrl: string | null;
  xPercent: number | null;
  yPercent: number | null;
  displayOrder: number | null;
  createdOn: string | null;
  assetIds: string[];
}

function toHotspot(raw: RawItem): Hotspot {
  const fd = raw.fieldData || {};
  const photoFileId = fd['photo-file-id'] ?? null;
  const photoUrl = fd['photo-url'] ?? null;
  return {
    id: raw.id,
    name: fd.name || '(untitled)',
    amenityId: fd.amenity ?? null,
    photoFileId,
    photoUrl,
    xPercent: typeof fd['x-percent'] === 'number' ? fd['x-percent'] : null,
    yPercent: typeof fd['y-percent'] === 'number' ? fd['y-percent'] : null,
    displayOrder: typeof fd['display-order'] === 'number' ? fd['display-order'] : null,
    createdOn: raw.createdOn ?? null,
    assetIds: [...extractAssetIds(photoFileId), ...extractAssetIds(photoUrl)],
  };
}

interface RoomTypePhotoEntry {
  photo: RoomTypePhoto;
  assetIds: string[];
}

interface RoomTypeInfo {
  id: string;
  name: string;
  photos: RoomTypePhotoEntry[];
}

function toRoomTypeInfo(raw: RawItem): RoomTypeInfo {
  const fd = raw.fieldData || {};
  const photos = extractPhotosFromFieldData(fd).map((photo) => ({
    photo,
    assetIds: [...extractAssetIds(photo.fileId), ...extractAssetIds(photo.url)],
  }));
  return {
    id: raw.id,
    name: fd.name || '(untitled)',
    photos,
  };
}

interface MatchResult {
  roomType: RoomTypeInfo;
  photo: RoomTypePhotoEntry;
}

/** Mirrors the matching logic in src/lib/photo-hotspots-utils.ts#hotspotsForPhoto, but in reverse: given a hotspot, find which Room Type photo (if any) it belongs to. */
function findMatch(hotspot: Hotspot, roomTypes: RoomTypeInfo[]): MatchResult | null {
  const hotspotId = primaryAssetId(hotspot.photoFileId) || primaryAssetId(hotspot.photoUrl);
  if (!hotspotId) return null;

  for (const roomType of roomTypes) {
    for (const entry of roomType.photos) {
      const photoId = primaryAssetId(entry.photo.fileId) || primaryAssetId(entry.photo.url);
      if (photoId && photoId === hotspotId) {
        return { roomType, photo: entry };
      }
    }
  }

  return null;
}

function toSummary(hotspot: Hotspot, match: MatchResult | null, amenityNameById: Map<string, string>): HotspotSummary {
  return {
    id: hotspot.id,
    name: hotspot.name,
    amenityId: hotspot.amenityId,
    amenityName: hotspot.amenityId ? amenityNameById.get(hotspot.amenityId) || hotspot.amenityId : '(no amenity)',
    photoRef: hotspot.photoFileId || hotspot.photoUrl || '(no photo reference)',
    xPercent: hotspot.xPercent,
    yPercent: hotspot.yPercent,
    roomTypeId: match?.roomType.id ?? null,
    roomTypeName: match?.roomType.name ?? null,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Scans every published Photo Hotspot item against every published Room
 * Type's photos and returns a report of:
 *   - orphaned hotspots (no longer match any Room Type photo)
 *   - duplicate hotspots (same Room Type + photo + amenity, pinned at
 *     (effectively) the same x/y position — all but the oldest are flagged)
 *
 * This is a read-only analysis; nothing is deleted. Pass the resulting
 * `toDeleteIds` (or a user-curated subset) to `deleteHotspotItems` to apply
 * the fix.
 */
export async function buildSyncReport(client: WebflowClient, options: SyncOptions = {}): Promise<SyncReport> {
  const { skipOrphans = false, skipDuplicates = false, roomTypeFilter = null, coordEpsilon = 1.5 } = options;

  const [roomTypeRaw, hotspotRaw, amenityRaw] = await Promise.all([
    fetchAllLive(client, ROOM_TYPES_COLLECTION_ID),
    fetchAllLive(client, PHOTO_HOTSPOTS_COLLECTION_ID),
    fetchAllLive(client, AMENITIES_COLLECTION_ID).catch(() => []),
  ]);

  const roomTypes = roomTypeRaw.map(toRoomTypeInfo);
  const hotspots = hotspotRaw.map(toHotspot);
  const amenityNameById = new Map<string, string>(amenityRaw.map((a) => [a.id, a.fieldData?.name || '(untitled)']));

  // --- Orphan detection -----------------------------------------------------

  const orphans: HotspotSummary[] = [];
  const matches = new Map<string, MatchResult>();

  for (const hotspot of hotspots) {
    const match = findMatch(hotspot, roomTypes);
    if (match) {
      matches.set(hotspot.id, match);
    } else {
      orphans.push(toSummary(hotspot, null, amenityNameById));
    }
  }

  // --- Duplicate detection ---------------------------------------------------

  const groups = new Map<string, Hotspot[]>();
  for (const hotspot of hotspots) {
    const match = matches.get(hotspot.id);
    if (!match) continue;
    if (roomTypeFilter && match.roomType.id !== roomTypeFilter) continue;

    const photoKey = match.photo.assetIds[0] || match.photo.photo.url;
    const key = `${match.roomType.id}::${photoKey}::${hotspot.amenityId ?? ''}`;
    const list = groups.get(key) || [];
    list.push(hotspot);
    groups.set(key, list);
  }

  const duplicateGroups: DuplicateGroup[] = [];

  for (const group of groups.values()) {
    if (group.length < 2) continue;

    // Within this (room type + photo + amenity) group, cluster by proximity
    // of x/y coordinates — hotspots further apart than coordEpsilon are
    // treated as intentionally distinct pins, not duplicates.
    const clusters: Hotspot[][] = [];
    for (const hotspot of group) {
      const cluster = clusters.find((c) =>
        c.some((other) => {
          const dx = Math.abs((hotspot.xPercent ?? 0) - (other.xPercent ?? 0));
          const dy = Math.abs((hotspot.yPercent ?? 0) - (other.yPercent ?? 0));
          return dx <= coordEpsilon && dy <= coordEpsilon;
        })
      );
      if (cluster) {
        cluster.push(hotspot);
      } else {
        clusters.push([hotspot]);
      }
    }

    for (const cluster of clusters) {
      if (cluster.length < 2) continue;

      // Keep the oldest item (by createdOn); fall back to lowest display-order.
      const sorted = [...cluster].sort((a, b) => {
        if (a.createdOn && b.createdOn) {
          return new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime();
        }
        return (a.displayOrder ?? 0) - (b.displayOrder ?? 0);
      });
      const [kept, ...removed] = sorted;
      const match = matches.get(kept.id)!;

      duplicateGroups.push({
        roomTypeId: match.roomType.id,
        roomTypeName: match.roomType.name,
        amenityId: kept.amenityId,
        amenityName: kept.amenityId ? amenityNameById.get(kept.amenityId) || kept.amenityId : '(no amenity)',
        photoRef: kept.photoFileId || kept.photoUrl || '(no photo reference)',
        kept: toSummary(kept, match, amenityNameById),
        removed: removed.map((r) => toSummary(r, matches.get(r.id) ?? match, amenityNameById)),
      });
    }
  }

  const toDeleteIds = [
    ...(skipOrphans ? [] : orphans.map((o) => o.id)),
    ...(skipDuplicates ? [] : duplicateGroups.flatMap((g) => g.removed.map((r) => r.id))),
  ];

  return {
    roomTypeCount: roomTypes.length,
    hotspotCount: hotspots.length,
    orphans: skipOrphans ? [] : orphans,
    duplicateGroups: skipDuplicates ? [] : duplicateGroups,
    toDeleteIds,
  };
}

export interface DeleteResult {
  deleted: string[];
  failed: Array<{ id: string; error: string }>;
}

/** Deletes the given Photo Hotspot item ids. Intended to be called with ids curated from a `SyncReport`. */
export async function deleteHotspotItems(client: WebflowClient, ids: string[]): Promise<DeleteResult> {
  const deleted: string[] = [];
  const failed: Array<{ id: string; error: string }> = [];

  for (const id of ids) {
    try {
      await client.collections.items.deleteItem(PHOTO_HOTSPOTS_COLLECTION_ID, id);
      deleted.push(id);
    } catch (error: any) {
      failed.push({ id, error: error?.message || 'Unknown error' });
    }
    // Small delay to stay well within Webflow's rate limits.
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return { deleted, failed };
}
