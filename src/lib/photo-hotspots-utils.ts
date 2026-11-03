// ---------------------------------------------------------------------------
// Pure, client-safe Photo Hotspot helpers.
//
// IMPORTANT: this file must have ZERO imports from `webflow-api` or
// `./webflow-client` (directly or transitively). Those pull in Node-only
// dependencies (e.g. `whatwg-url`) that break client-side hydration when
// bundled into React components. Server-only helpers (anything that needs a
// `WebflowClient` instance) belong in `./photo-hotspots.ts` instead, which
// re-exports everything from this file for convenience on the server.
// ---------------------------------------------------------------------------

// Photo Hotspots collection — fixed id for this site (see collections-config.ts).
export const PHOTO_HOTSPOTS_COLLECTION_ID = '6acfb8250c28159487fb2aaf';

export interface PhotoHotspotItem {
  id: string;
  name: string;
  slug?: string;
  amenityId?: string | null;
  photoUrl?: string | null;
  photoFileId?: string | null;
  xPercent: number | null;
  yPercent: number | null;
  displayOrder?: number | null;
  active?: boolean;
}

export function toPhotoHotspotItem(raw: { id: string; fieldData?: Record<string, any> }): PhotoHotspotItem {
  const fd = raw.fieldData || {};
  return {
    id: raw.id,
    name: fd.name || '(untitled)',
    slug: fd.slug,
    amenityId: fd.amenity ?? null,
    photoUrl: fd['photo-url'] ?? null,
    photoFileId: fd['photo-file-id'] ?? null,
    xPercent: typeof fd['x-percent'] === 'number' ? fd['x-percent'] : null,
    yPercent: typeof fd['y-percent'] === 'number' ? fd['y-percent'] : null,
    displayOrder: typeof fd['display-order'] === 'number' ? fd['display-order'] : null,
    active: fd.active !== false,
  };
}

/** Fetches every published Photo Hotspot item (paginating through the local CMS proxy route). */
export async function fetchAllPhotoHotspots(baseUrl: string): Promise<PhotoHotspotItem[]> {
  const items: PhotoHotspotItem[] = [];
  const limit = 100;
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const res = await fetch(`${baseUrl}/api/cms/${PHOTO_HOTSPOTS_COLLECTION_ID}?limit=${limit}&offset=${offset}`);
    if (!res.ok) break;
    const data = (await res.json()) as {
      items?: Array<{ id: string; fieldData?: Record<string, any> }>;
      pagination?: { total?: number };
    };
    const pageItems = data.items || [];
    pageItems.forEach((it) => items.push(toPhotoHotspotItem(it)));
    total = data.pagination?.total ?? pageItems.length;
    offset += limit;
    if (pageItems.length === 0) break;
  }

  return items;
}

// Webflow CDN urls look like:
//   https://cdn.prod.website-files.com/{siteId}/{assetId}_{filename}
// Both `siteId` and `assetId` (and, for legacy assets, an older asset id
// segment) are 24-character hex ids. The site id is the SAME for every
// asset on the site, so it must be discarded before comparing ids — only
// the fileId/legacy-asset-id segments are useful for matching a hotspot to
// a specific photo.
const ASSET_ID_REGEX = /[a-f0-9]{24}/gi;

/**
 * Extracts every 24-character hex asset id embedded in a Webflow asset file
 * id or CDN url. For Webflow CDN urls, the first match (the site id, shared
 * by every asset on the site) is discarded, returning only the remaining
 * id(s) — the asset's own fileId, and, for legacy urls, an older asset id.
 */
export function extractAssetIds(value: string | null | undefined): string[] {
  if (!value) return [];
  const matches = value.match(ASSET_ID_REGEX);
  if (!matches) return [];
  const ids = matches.map((m) => m.toLowerCase());
  if (value.includes('website-files.com')) {
    return ids.slice(1);
  }
  return ids;
}

/**
 * Returns a photo's single canonical asset id — the fileId itself if given
 * (always a clean, standalone id), or, when only a CDN url is available, the
 * id immediately after the shared site id segment.
 *
 * Deliberately ignores any *other* ids embedded deeper in a CDN url's
 * filename. Webflow CDN urls carry the originally-uploaded filename
 * verbatim, so a re-uploaded/duplicated photo whose source file happened to
 * be named after another asset's CDN filename (e.g. a stock photo that was
 * downloaded from this same site and re-uploaded) would otherwise cause two
 * entirely unrelated photos to appear to "match" — which previously caused
 * hotspots belonging to one photo to be read, edited, and even deleted as if
 * they belonged to a different photo. Using only each side's own leading id
 * keeps matching exact.
 */
export function primaryAssetId(value: string | null | undefined): string | null {
  return extractAssetIds(value)[0] ?? null;
}

/** Filters a list of Photo Hotspots down to the ones placed on a specific photo. */
export function hotspotsForPhoto(
  hotspots: PhotoHotspotItem[],
  photoFileId?: string | null,
  photoUrl?: string | null
): PhotoHotspotItem[] {
  if (!photoFileId && !photoUrl) return [];

  // This photo's own canonical asset id — prefer the explicit fileId (always
  // a clean, single id) and fall back to parsing it out of the CDN url.
  const imageId = primaryAssetId(photoFileId) || primaryAssetId(photoUrl);
  if (!imageId) return [];

  return hotspots
    .filter((h) => {
      const hotspotId = primaryAssetId(h.photoFileId) || primaryAssetId(h.photoUrl);
      return hotspotId !== null && hotspotId === imageId;
    })
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}

/**
 * Filters a full hotspot list down to the ones placed on any photo belonging
 * to a given Room Type's gallery (hero/feature/gallery images, as extracted
 * by `extractPhotosFromFieldData`). Used to scope a `rekeyHotspotsForPhoto`
 * call to only the hotspots relevant to the room type being edited.
 */
export function hotspotsForRoomTypePhotos(
  hotspots: PhotoHotspotItem[],
  roomTypePhotos: Array<{ fileId?: string | null; url?: string | null }>
): PhotoHotspotItem[] {
  const seen = new Set<string>();
  const result: PhotoHotspotItem[] = [];

  for (const photo of roomTypePhotos) {
    for (const hotspot of hotspotsForPhoto(hotspots, photo.fileId, photo.url)) {
      if (!seen.has(hotspot.id)) {
        seen.add(hotspot.id);
        result.push(hotspot);
      }
    }
  }

  return result.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}
