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

function toPhotoHotspotItem(raw: { id: string; fieldData?: Record<string, any> }): PhotoHotspotItem {
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

/** Filters a list of Photo Hotspots down to the ones placed on a specific photo. */
export function hotspotsForPhoto(
  hotspots: PhotoHotspotItem[],
  photoFileId?: string | null,
  photoUrl?: string | null
): PhotoHotspotItem[] {
  if (!photoFileId && !photoUrl) return [];
  return hotspots
    .filter((h) => (photoFileId && h.photoFileId === photoFileId) || (!photoFileId && photoUrl && h.photoUrl === photoUrl))
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}
