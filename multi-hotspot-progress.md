# Multi-Marker Photo Hotspot Tagging — Progress

## STATUS: ✅ 100% COMPLETE

The feature that lets an editor tag a single Room Type photo with **multiple**
amenity hotspots in one session — placing, repositioning, and assigning an
amenity to each pin, then saving/publishing all of them in one action — is
fully implemented and wired into the portal.

> Full architecture notes, data schema, and the step-by-step build log live in
> `HOTSPOT_ARCHITECTURE_REF.md`. This file is a short status summary.

---

## What shipped

### 1. `src/components/MultiHotspotTagger.tsx`
Presentational multi-pin tagging UI:
- State: `markers: HotspotMarker[]` where each marker is `{ id, x, y, amenityId }`.
- Click the photo to drop a new numbered pin; pointer down/move/up (keyed by
  `draggingId`) lets you drag any existing pin to reposition it.
- Side panel lists every marker with a room-type-scoped Amenity `<Select>`
  (options passed in via the `amenityOptions` prop) and a remove (`X`) button.
- `onSubmit(markers)` validates every marker has an amenity assigned before
  handing the marker list back up to the caller; `onCancel()` dismisses the
  tagger without saving.
- Reuses the same bounding-rect pointer math (`xPercent`/`yPercent`) as the
  original single-marker `HotspotPicker.tsx`, so coordinates stay consistent
  across both tagging flows.

### 2. `src/pages/api/cms/[collectionId]/bulk.ts`
Bulk creation + live publishing endpoint:
- `POST` body: `{ items: Array<{ fieldData }> }`.
- Validates the array is non-empty and every item includes `fieldData`.
- Calls `client.collections.items.createItems()` to create all hotspot items
  in a single draft-create request, then calls `publishItem()` once with
  every newly created item ID so they all go live together — same
  create-then-publish pattern as the single-item route, batched.
- Uses the shared `createCmsClient(locals)` factory from
  `src/lib/webflow-client.ts`, so it authenticates with `WEBFLOW_CMS_API_TOKEN`
  exactly like every other CMS API route.

### 3. `src/components/ItemEditor.tsx` integration
Entry point wiring:
- Imports `MultiHotspotTagger` (and its `HotspotMarker`/`AmenityOption`
  types) and renders it inside a shadcn `<Dialog>` ("Tag amenity hotspots"),
  toggled via `taggerImage` state.
- Passes `photoUrl`, `photoFileId`, a `roomTypeId` resolved from the current
  item, and `amenityOptions` scoped with the existing `extractAmenityIds()` /
  `findRoomTypeIdForPhoto()` helpers — identical scoping rules as the
  single-hotspot flow.
- `handleTaggerSubmit` turns the marker list into an array of Photo Hotspot
  `fieldData` objects (auto-generated `name`/`slug`, `display-order`,
  `x-percent`/`y-percent`, `photo-url`, `photo-file-id`, `active: true`) and
  POSTs them in one request to `/api/cms/[collectionId]/bulk`.

---

## Verification

- `npx astro check` → **0 errors, 0 warnings** (only a few pre-existing,
  unrelated "declared but never read" hints remain).
- Manual flow verified: pick a photo → drop several pins → assign an amenity
  to each → Save → all hotspot items are created and published live in one
  request, immediately visible via the existing "Review tags" overlay
  (`src/components/HotspotReview.tsx`).

---

## Follow-up bug fix: orphaned hotspots on "The Chalet"

16 previously-saved Photo Hotspot items on "The Chalet" room type weren't
rendering as pins because the asset-id matching logic in
`src/lib/photo-hotspots.ts` was comparing the **Webflow site id** (shared by
every asset on the site) instead of each photo's own unique file id, due to
a non-global regex only ever grabbing the first 24-hex-char match out of a
CDN url.

Fixed by replacing the old `extractAssetId()` helper with `extractAssetIds()`,
which extracts *every* hex id in a string and discards the leading site-id
match specifically for `website-files.com` CDN urls. `hotspotsForPhoto()` was
updated to match on substring containment of `photo-file-id` in the image's
`photo-url`, or an overlap between the hotspot's and image's extracted asset
id sets. See `HOTSPOT_ARCHITECTURE_REF.md` ("Bug fix — Orphaned hotspots due
to site-id collision in asset-id matching") for full details.

Verified with `npx astro check` (0 errors, 0 warnings) and confirmed all 16
hotspots on "The Chalet" now resolve correctly.
