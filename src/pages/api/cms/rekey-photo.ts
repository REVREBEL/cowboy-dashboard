import type { APIRoute } from 'astro';
import { createCmsClient } from '../../../lib/webflow-client';
import {
  extractAssetIds,
  fetchAllPhotoHotspotsWithClient,
  hotspotsForRoomTypePhotos,
  rekeyHotspotsForPhoto,
} from '../../../lib/photo-hotspots';
import { ROOM_TYPES_COLLECTION_ID, extractPhotosFromFieldData } from '../../../lib/room-type-photos';

interface RekeyPhotoRequestBody {
  roomTypeId?: string;
  oldPhoto?: { fileId?: string | null; url?: string | null };
  newPhoto?: { fileId?: string; url?: string };
}

// POST /api/cms/rekey-photo
// Body: { roomTypeId, oldPhoto: { fileId?, url? }, newPhoto: { fileId, url } }
//
// When a Room Type's gallery photo is replaced/re-uploaded, its CDN
// fileId/url changes — which would otherwise orphan any Photo Hotspot items
// pinned to the old photo. This route re-fetches the room type's current
// hotspots, scopes them to the room type's gallery, and re-points any
// matching hotspots at the new photo.
export const POST: APIRoute = async ({ request, locals }) => {
  let body: RekeyPhotoRequestBody;
  try {
    body = (await request.json()) as RekeyPhotoRequestBody;
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log('[rekey-photo] incoming request body:', JSON.stringify(body));

  const { roomTypeId, oldPhoto, newPhoto } = body;

  // Some callers may not have a persisted `fileId` (e.g. legacy records, or
  // uploads whose response only included a `url`). Fall back to any
  // 24-hex-char asset id embedded directly in the photo's CDN url so
  // matching/re-keying still works.
  if (oldPhoto && !oldPhoto.fileId && oldPhoto.url) {
    oldPhoto.fileId = extractAssetIds(oldPhoto.url)[0] ?? oldPhoto.fileId;
  }
  if (newPhoto && !newPhoto.fileId && newPhoto.url) {
    newPhoto.fileId = extractAssetIds(newPhoto.url)[0] ?? newPhoto.fileId;
  }

  if (!roomTypeId) {
    return new Response(JSON.stringify({ success: false, error: 'roomTypeId is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!oldPhoto || (!oldPhoto.fileId && !oldPhoto.url)) {
    return new Response(
      JSON.stringify({ success: false, error: 'oldPhoto (with fileId and/or url) is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!newPhoto?.fileId || !newPhoto?.url) {
    return new Response(
      JSON.stringify({ success: false, error: 'newPhoto requires both fileId and url.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('rekey-photo: CMS token error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Missing CMS token.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Resolve the Room Type's current gallery so we only touch hotspots that
  // actually belong to one of its photos.
  let roomTypePhotos;
  try {
    const roomTypeItem: any = await client.collections.items.getItemLive(ROOM_TYPES_COLLECTION_ID, roomTypeId);
    roomTypePhotos = extractPhotosFromFieldData(roomTypeItem?.fieldData || {});
    console.log('[rekey-photo] resolved room type gallery photos:', JSON.stringify(roomTypePhotos));
  } catch (error) {
    console.error('rekey-photo: Failed to fetch room type item:', error);
    return new Response(JSON.stringify({ success: false, error: 'Room type not found.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Fetch every published hotspot, then scope down to this room type's photos.
  let allRoomTypeHotspots;
  try {
    const allHotspots = await fetchAllPhotoHotspotsWithClient(client);
    allRoomTypeHotspots = hotspotsForRoomTypePhotos(allHotspots, roomTypePhotos);
    console.log(
      `[rekey-photo] fetched ${allHotspots.length} total hotspots, scoped to ${allRoomTypeHotspots.length} for this room type's gallery`
    );
  } catch (error) {
    console.error('rekey-photo: Failed to fetch hotspots:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch current hotspots.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const result = await rekeyHotspotsForPhoto({
      locals,
      roomTypeId,
      oldPhoto,
      newPhoto: { fileId: newPhoto.fileId, url: newPhoto.url },
      allRoomTypeHotspots,
    });

    console.log('[rekey-photo] rekeyHotspotsForPhoto result:', JSON.stringify(result));

    // A result of `{ updatedCount: 0, errors: [{ id: '(none)', ... }] }` means
    // `rekeyHotspotsForPhoto` found zero hotspots matching `oldPhoto` — this is
    // not a failed API call, just a heads-up that nothing existed to re-key.
    // Genuine per-item patch failures carry the hotspot's real id instead.
    const isNoMatchWarning = result.errors.length === 1 && result.errors[0]?.id === '(none)';

    if (result.updatedCount === 0 && result.errors.length > 0 && !isNoMatchWarning) {
      return new Response(
        JSON.stringify({ success: false, updatedCount: 0, errors: result.errors }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        updatedCount: result.updatedCount,
        ...(isNoMatchWarning ? { warning: result.errors[0]?.error } : {}),
        ...(result.errors.length > 0 && !isNoMatchWarning ? { errors: result.errors } : {}),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('rekey-photo: Unexpected error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error?.message || 'Failed to rekey hotspots.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
