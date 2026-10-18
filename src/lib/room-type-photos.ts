import type { ImageData } from './image-upload-client';

// Room Types collection — fixed id for this site (see collections-config.ts).
export const ROOM_TYPES_COLLECTION_ID = '6abc815b36cbcba74b8b01c4';

export interface RoomTypePhoto {
  url: string;
  fileId?: string;
  alt?: string;
  source: string;
}

export interface RoomTypeSummary {
  id: string;
  name: string;
}

export function dedupePhotos(photos: RoomTypePhoto[]): RoomTypePhoto[] {
  const seen = new Set<string>();
  const result: RoomTypePhoto[] = [];
  for (const photo of photos) {
    const key = photo.fileId || photo.url;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(photo);
  }
  return result;
}

export function extractPhotosFromFieldData(fieldData: Record<string, any>): RoomTypePhoto[] {
  const photos: RoomTypePhoto[] = [];

  const addSingle = (img: ImageData | null | undefined, source: string) => {
    if (img?.url) {
      photos.push({ url: img.url, fileId: img.fileId, alt: img.alt, source });
    }
  };

  addSingle(fieldData['hero-image'], 'Hero image');
  addSingle(fieldData['feature-image-1'], 'Feature image 1');
  addSingle(fieldData['feature-image-2'], 'Feature image 2');

  const gallery: ImageData[] = Array.isArray(fieldData['images']) ? fieldData['images'] : [];
  gallery.forEach((img, i) => {
    if (img?.url) {
      photos.push({ url: img.url, fileId: img.fileId, alt: img.alt, source: `Gallery photo ${i + 1}` });
    }
  });

  return dedupePhotos(photos);
}

/** Extracts the set of Amenity item ids this Room Type references via `features-amenities`. */
export function extractAmenityIds(fieldData: Record<string, any>): string[] {
  const raw = fieldData?.['features-amenities'];
  if (!Array.isArray(raw)) return [];
  return raw.filter((v): v is string => typeof v === 'string');
}

/** Fetches every published Room Type item (paginating through the local CMS proxy route). */
export async function fetchAllRoomTypes(
  baseUrl: string
): Promise<Array<{ id: string; fieldData: Record<string, any> }>> {
  const items: Array<{ id: string; fieldData: Record<string, any> }> = [];
  const limit = 100;
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const res = await fetch(`${baseUrl}/api/cms/${ROOM_TYPES_COLLECTION_ID}?limit=${limit}&offset=${offset}`);
    if (!res.ok) break;
    const data = (await res.json()) as {
      items?: Array<{ id: string; fieldData?: Record<string, any> }>;
      pagination?: { total?: number };
    };
    const pageItems = data.items || [];
    pageItems.forEach((it) => {
      items.push({ id: it.id, fieldData: it.fieldData || {} });
    });
    total = data.pagination?.total ?? pageItems.length;
    offset += limit;
    if (pageItems.length === 0) break;
  }

  return items;
}

/**
 * Given a Photo Hotspot's photo-file-id / photo-url, finds the Room Type
 * whose gallery contains that exact photo. Used to auto-detect which Room
 * Type an existing hotspot belongs to (so the Amenity dropdown can be
 * filtered to only that room's attached amenities) when the id wasn't
 * passed in explicitly via the URL.
 */
export async function findRoomTypeIdForPhoto(
  baseUrl: string,
  photoFileId?: string | null,
  photoUrl?: string | null
): Promise<string | null> {
  if (!photoFileId && !photoUrl) return null;
  const roomTypes = await fetchAllRoomTypes(baseUrl);
  for (const rt of roomTypes) {
    const photos = extractPhotosFromFieldData(rt.fieldData);
    const match = photos.some(
      (p) => (photoFileId && p.fileId === photoFileId) || (!photoFileId && photoUrl && p.url === photoUrl)
    );
    if (match) return rt.id;
  }
  return null;
}
