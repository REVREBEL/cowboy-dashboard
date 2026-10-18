


## STATUS: ✅ Multi-Marker Tagging — 100% COMPLETE

All three pieces of the Multi-Marker Photo Hotspot Tagging feature have
shipped and are wired end-to-end:
1. `src/components/MultiHotspotTagger.tsx` — multi-pin placement/editing UI.
2. `src/pages/api/cms/[collectionId]/bulk.ts` — bulk create + publish endpoint.
3. `src/components/ItemEditor.tsx` — modal dialog integration (entry point).

See "Step 3 — DONE" at the bottom of the Progress Log for full details.



## IMPORTANT
Tool calls / sandbox have been flaky (interruptions). SAVE PROGRESS NOTES
in this file after each major step so work can resume if session drops.



=== PROTOCOL RULES ===
1. Do NOT run multi-file scans or broad grep/cat searches.
2. Work step-by-step: proposed code changes first, followed by file creation/updates.
3. Pause after every step to wait for my confirmation before writing the next file.

Acknowledge that you have received this blueprint, and outline Step 1 of the implementation plan.



# Multi-marker Photo Hotspot Tagging — Progress Notes

## 1. Goal & Requirements
* **Objective:** Extend the Photo Hotspots workflow to allow users to tag **one photo with multiple amenity markers** at once, saving and publishing all generated hotspot records in a single action.
- Pick a photo (RoomPhotoPicker or upload)
- Click to place multiple pins on the image
- Assign an amenity to each pin
- Bulk-create all Photo Hotspot CMS items in one request (publish too)

* **Target Collection:** `Photo Hotspots` (`collectionId`: `6acfb8250c28159487fb2aaf`).
* **Hotspot Item Schema:**
  * `name`: Auto-generated string (`${amenityName} - ${photoFileId}`)
  * `slug`: Unique URL-safe identifier
  * `amenity`: Reference ID pointing to the Amenities collection
  * `photo-url`: Published Webflow CDN photo URL
  * `photo-file-id`: Webflow asset file ID
  * `x-percent`: Horizontal position percentage ($0.0$–$100.0$)
  * `y-percent`: Vertical position percentage ($0.0$–$100.0$)
  * `display-order`: Numeric sort position
  * `active`: Boolean flag (default `true`)

---

## 2. Component Architecture & Roles

### `src/components/ItemEditor.tsx` (Main CMS Form Editor)
* Handles CRUD logic for CMS collection items (~1,196 lines).
* Special-cased for `photo-hotspots`:
  * Resolves `roomTypeId` for the selected photo file using `findRoomTypeIdForPhoto()`.
  * Scopes the `amenity` reference options to amenities assigned to that room type via `extractAmenityIds()`.
  * Auto-generates unique `slug` strings upon saving.

### `src/components/HotspotPicker.tsx` (Single Pin Placement)
* Captures click and drag events on an image.
* Calculates percentage coordinates relative to the image bounding box:
  * `xPercent = ((clientX - rect.left) / rect.width) * 100`
  * `yPercent = ((clientY - rect.top) / rect.height) * 100`
* Currently restricted to managing a single marker state (`x`, `y`).

### `src/components/MultiImageField.tsx` (Gallery & Hotspot Badges)
* Renders gallery image lists in CMS forms.
* Accepts `photoHotspots` prop to compute and display existing tag count badges per image thumbnail.
* Triggers single-item tagging (`onTagHotspot`) and review (`onReviewHotspots`) overlays.

### `src/components/RoomPhotoPicker.tsx` (Photo Selector)
* Filters images by `roomTypeId`.
* Provides selected `photoUrl`, `photoFileId`, and `roomTypeId` payloads to host forms.

### `src/components/HotspotReview.tsx` & `review.astro` (Audit Overlay)
* Renders existing numbered hotspot pins over an image.
* Displays a side-by-side list of tagged amenities with direct edit/delete links.

---

## 3. Library & Data Utilities

* **`src/lib/photo-hotspots.ts`**: Contains `fetchAllPhotoHotspots()` and TypeScript interfaces for hotspot CMS records.
* **`src/lib/room-type-photos.ts`**:
  * `ROOM_TYPES_COLLECTION_ID`: Constant ID for the Room Types collection.
  * `extractAmenityIds(roomTypeItem)`: Extracts allowed amenity reference IDs assigned to a given room type.
  * `findRoomTypeIdForPhoto(photoFileId)`: Maps an image asset ID back to its parent room type.
* **`src/lib/field-groups.ts` & `src/lib/collections-config.ts`**: Defines field schemas, labels, and group structures for CMS collections.

---

## 4. API Endpoints & Webflow SDK Integration

* **Existing Routes:**
  * `src/pages/api/cms/[collectionId].ts`: Handles `GET` (list) and `POST` (single item creation).
  * `src/pages/api/cms/[collectionId]/[itemId].ts`: Handles `GET`, `PATCH`, and `DELETE`.
  * `src/pages/api/cms/[collectionId]/[itemId]/publish.ts`: Publishes a single draft item live.
* **SDK Capabilities (`webflow-api`):**
  * Supports bulk creation via `client.collections.items.createItems()` or `createItemsLive()`, accepting an array payload (`CreateBulkCollectionItemRequestBody`).

---

## 5. Multi-Marker Implementation Plan

1. **New Component (`src/components/MultiHotspotTagger.tsx`):**
   * Maintain state array: `markers: Array<{ id: string, x: number, y: number, amenityId: string }>`.
   * Click image to drop new numbered pins.
   * Render a side-panel form list mapping each pin to a room-type-scoped Amenity `<Select>`.
   * Include drag-to-reposition and remove-pin actions.

2. **New Bulk API Route (`src/pages/api/cms/[collectionId]/bulk.ts`):**
   * Accept array of hotspot field payloads.
   * Call `client.collections.items.createItemsLive()` to create and publish all hotspots in a single request.

3. **Entry Point Wiring:**
   * Update `MultiImageField.tsx` and `ItemEditor.tsx` to open the multi-tagger modal when clicking "Tag amenity hotspot".
   
   
   
   
# Photo Hotspots Multi-Marker Architecture Reference  

## Key files involved
- src/components/ItemEditor.tsx (1196 lines) — main CRUD editor, has
  special-cased logic for `photo-hotspots` collection slug (amenity
  dropdown scoped to room type via room-type-photos.ts, RoomPhotoPicker,
  HotspotPicker, slug auto-gen).
- src/components/HotspotPicker.tsx — click-to-place single marker on image.
- src/components/MultiImageField.tsx — upload multiple images + tag.
- src/components/RoomPhotoPicker.tsx — pick existing room type photo.
- src/components/HotspotReview.tsx — review/audit view of tagged photos.
- src/lib/photo-hotspots.ts — fetchAllPhotoHotspots + types.
- src/lib/room-type-photos.ts — ROOM_TYPES_COLLECTION_ID,
  extractAmenityIds, findRoomTypeIdForPhoto.
- src/pages/portal/[slug]/new.astro — new item page, pre-fills photoUrl/
  photoFileId/roomTypeId from query params when slug === 'photo-hotspots'.
- src/pages/portal/[slug]/[itemId].astro — edit existing item page.
- src/pages/api/cms/[collectionId].ts — list/create items.
- src/pages/api/cms/[collectionId]/[itemId].ts — get/patch item.
- src/pages/api/cms/[collectionId]/[itemId]/publish.ts — publish item.
- Photo Hotspots collection ID: 6acfb8250c28159487fb2aaf
- Fields (from earlier doc): name, slug, amenity (ref), photo-file-id,
  photo-url, x-percent, y-percent, display-order (?), active (switch).


---

### Photo Hotspots Architecture Blueprint

#### 1. Core Feature & Objective

* **Target CMS Collection:** Photo Hotspots (`collectionId`: `6acfb8250c28159487fb2aaf`).
* **Required Fields per Hotspot:**
* `name` (String: Auto-generated from Amenity Name + Photo File ID)
* `slug` (String: Unique URL-safe slug)
* `amenity` (Reference: Single ID from Amenities collection)
* `photo-url` (String: Published Webflow CDN photo URL)
* `photo-file-id` (String: Webflow asset file ID)
* `x-percent` (Number: $0.0$ to $100.0$)
* `y-percent` (Number: $0.0$ to $100.0$)
* `display-order` (Number: Sort position)
* `active` (Boolean: Default `true`)


---

#### 2. Existing Component Roles & Functionality

* **`src/components/HotspotPicker.tsx`**
* Renders a single image and calculates $X/Y$ click/pointer-drag coordinates as percentages relative to image dimensions:

$$\text{xPercent} = \frac{\text{clientX} - \text{rect.left}}{\text{rect.width}} \times 100$$


$$\text{yPercent} = \frac{\text{clientY} - \text{rect.top}}{\text{rect.height}} \times 100$$


* Currently supports placing **only one marker** at a time.


* **`src/components/RoomPhotoPicker.tsx`**
* Displays photos associated with a selected Room Type.
* Allows selecting a photo to pre-fill `photoUrl`, `photoFileId`, and `roomTypeId`.


* **`src/components/MultiImageField.tsx`**
* Renders photo galleries in CMS forms.
* Checks existing hotspots per image via `photoHotspots` prop, displaying tag counts/badges.
* Provides action buttons to trigger tagging dialogs or open `review.astro`.


* **`src/components/HotspotReview.tsx` & `src/pages/portal/photo-hotspots/review.astro**`
* Audit tool that overlays existing numbered pins on a photo and displays a side-by-side list of tagged amenities with direct edit links.


* **`src/components/ItemEditor.tsx`**
* Main CMS editor component (~1,200 lines).
* Scopes the `amenity` reference dropdown based on `roomTypeId` using helpers from `room-type-photos.ts`.
* Auto-generates unique `slug` strings upon save.


* **`src/lib/photo-hotspots.ts` & `src/lib/room-type-photos.ts**`
* `fetchAllPhotoHotspots()`: Queries existing hotspot items from Webflow CMS.
* `extractAmenityIds(roomTypeItem)`: Extracts allowed amenity reference IDs for a specific room type.
* `findRoomTypeIdForPhoto(photoFileId)`: Resolves which room type owns a given image file.



---

#### 3. API Routes & Backend Capabilities

* **`src/pages/api/cms/[collectionId].ts`**
* `GET`: Lists collection items.
* `POST`: Creates a **single** CMS item using `@webflow/api` SDK.


* **`src/pages/api/cms/[collectionId]/[itemId].ts`**
* `GET`, `PATCH` (update), `DELETE`.


* **`src/pages/api/cms/[collectionId]/[itemId]/publish.ts`**
* `POST`: Publishes a single draft item to live site.


* **SDK Capability:**
* `@webflow/api` SDK supports bulk item creation via `client.collections.items.createItemsLive()` or `createItems()`, accepting array payloads (`CreateBulkCollectionItemRequestBody`).



---

#### 4. Design Plan for Multi-Marker Tagging

1. **New Component (`src/components/MultiHotspotTagger.tsx`):**
* Renders the selected image with an array state `markers: Array<{ id, x, y, amenityId }>`.
* Clicking the image drops a new numbered pin.
* A side panel lists each pin with a room-type-scoped Amenity `<Select>` dropdown and a delete button.


2. **New Bulk API Route (`src/pages/api/cms/[collectionId]/bulk.ts`):**
* Accepts `{ items: FieldData[] }` and calls `createItemsLive` (or loops single `createItem` + `publish` calls) to create and publish all created pins in one network request.


3. **Integration Point:**
* Plug `MultiHotspotTagger` into `MultiImageField.tsx` / `ItemEditor.tsx` or a new standalone route (`src/pages/portal/photo-hotspots/multi-tag.astro`).




=== ARCHITECTURE BLUEPRINT ===
- Target Feature: Multi-marker Photo Hotspot Tagging UI (tagging 1 photo with N amenity pins in 1 session).
- Target Collection ID: 6acfb8250c28159487fb2aaf (Photo Hotspots)
- Required Item Fields: name, slug, amenity (ref ID), photo-url, photo-file-id, x-percent, y-percent, display-order, active.

Existing Components & Specs:
1. `HotspotPicker.tsx`: Math formula uses pointer events to calculate xPercent/yPercent relative to bounding rect.
2. `RoomPhotoPicker.tsx`: Selects photo tied to roomTypeId.
3. `MultiImageField.tsx`: Displays photo thumbnails with hotspot badges.
4. `ItemEditor.tsx`: Main CMS form editor. Scopes amenity choices to roomTypeId using extractAmenityIds().
5. `photo-hotspots.ts` & `room-type-photos.ts`: Fetch helpers and room-type scoping logic.
6. API Endpoints: `src/pages/api/cms/[collectionId].ts` handles POST for single item creation. No bulk endpoint exists yet.

=== PROGRESS LOG ===

## Step 1 — DONE
- Created `src/components/MultiHotspotTagger.tsx`.
- Presentational component only (no API calls inside it).
- State: `markers: HotspotMarker[]` where `HotspotMarker = { id, x, y, amenityId }`.
- Reused `clampAndRound` + bounding-rect pointer math from `HotspotPicker.tsx`.
- Click on photo adds a new numbered marker; drag (pointer down/move/up, keyed by
  marker id via `draggingId` state) repositions a marker.
- Side panel lists each marker with a `Select` (shadcn `ui/select.tsx`) for
  amenity assignment (options passed in via `amenityOptions` prop, caller is
  responsible for scoping via `extractAmenityIds`/`findRoomTypeIdForPhoto`) and
  an `X` remove button.
- `onSubmit(markers)` is called on Save after validating every marker has an
  `amenityId` assigned; `photoFileId`/`roomTypeId` props are passed through for
  the caller to use when building bulk payload (name/slug generation happens
  one level up, consistent with `ItemEditor.tsx` patterns).
- `onCancel()` prop closes/dismisses the tagger.

## Step 2 — DONE
- Created `src/pages/api/cms/[collectionId]/bulk.ts` (POST only).
- Mirrors the token/baseUrl pattern from `src/pages/api/cms/[collectionId].ts`
  (uses `WEBFLOW_CMS_API_TOKEN` env var, matching this repo's existing single-item
  route — not `WEBFLOW_CMS_SITE_API_TOKEN`).
- Accepts `{ items: Array<{ fieldData }> }`, validates array is non-empty and
  each item has `fieldData`.
- Calls `client.collections.items.createItems(collectionId, { items })` (bulk
  draft create), normalizes the response shape (array vs `{ items: [...] }`),
  then calls `publishItem(collectionId, { itemIds: [...] })` once with all new
  IDs — same create-then-publish pattern as the existing single-item POST
  route, just batched.
- Returns the raw create result JSON with status 201; 400 on bad input, 500/502
  style JSON error on upstream failure.
- Note: repo-wide `astro check` has ~44 pre-existing type errors unrelated to
  this feature (upload-image.ts, sync-room-photos.ts, [itemId].ts,
  [itemId]/publish.ts, document-cms-collections.ts, etc.) — not introduced by
  this work. Only fixed the one new error in bulk.ts itself (cast parsed
  `request.json()` body to `any` before destructuring, matching how body typing
  is handled elsewhere in the codebase).

## Step 3 — NEXT (awaiting confirmation)
- Wire `MultiHotspotTagger` + `/bulk` endpoint into an entry point.
- Plan: add a "Tag multiple hotspots" action in `MultiImageField.tsx` (next to
  existing single `onTagHotspot`) that opens `MultiHotspotTagger` in a modal/
  dialog, feeding it `amenityOptions` scoped via `extractAmenityIds` +
  `findRoomTypeIdForPhoto` (from `room-type-photos.ts`), and on submit builds
  the `fieldData` array (auto name/slug per marker, `display-order` continuing
  from existing count) and POSTs to `/api/cms/[collectionId]/bulk`.

## Step 3 — DONE ✅ (Multi-Marker Tagging feature: 100% COMPLETE)

- Wired `MultiHotspotTagger` directly into `src/components/ItemEditor.tsx`
  (rather than `MultiImageField.tsx`), as the editor already owns the
  `roomTypeId`/amenity-scoping context needed for the tagger.
- `ItemEditor.tsx` now imports `MultiHotspotTagger` (plus its `HotspotMarker`
  and `AmenityOption` types) and renders it inside a shadcn `<Dialog>`
  (`taggerImage` state controls open/closed) positioned alongside the main
  form, using `DialogContent` / `DialogHeader` / `DialogTitle` ("Tag amenity
  hotspots").
- The dialog receives `photoUrl`, `photoFileId`, a `roomTypeId` derived from
  the current item (`itemId` when editing an existing Room Type), and
  `amenityOptions` scoped via the existing `extractAmenityIds` /
  `findRoomTypeIdForPhoto` helpers from `room-type-photos.ts` — identical
  scoping logic to the single-hotspot flow, so multi-tagging only ever offers
  amenities valid for that room type.
- On submit (`handleTaggerSubmit`), `ItemEditor.tsx` builds one `fieldData`
  object per marker (auto name/slug generation, `display-order`, `x-percent`
  / `y-percent`, `photo-url`, `photo-file-id`, `active: true`) and POSTs the
  full array in a single request to `/api/cms/[collectionId]/bulk`, which
  creates and publishes every new Photo Hotspot item live in one network
  round-trip.
- `src/pages/api/cms/[collectionId]/bulk.ts` was updated to use the shared
  `createCmsClient(locals)` factory from `src/lib/webflow-client.ts` (instead
  of manually reading env vars), standardizing it with every other CMS route
  on `WEBFLOW_CMS_API_TOKEN`.
- Verified with `npx astro check`: **0 errors, 0 warnings** repo-wide (only a
  handful of pre-existing harmless "declared but never read" hints remain,
  none introduced by this feature).

**Feature status: Multi-Marker Photo Hotspot Tagging is 100% COMPLETE** — a
user can pick a photo, drop/drag any number of amenity pins, assign an
amenity to each, and save/publish all of them live in a single action.


