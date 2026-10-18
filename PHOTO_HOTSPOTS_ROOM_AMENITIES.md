
# Webflow Photo Hotspots and Room Amenities

The Photo booking engine now reads published editorial content from the **Room Types**, **Amenities**, and **Photo Hotspots** Webflow CMS collections. Mews still controls availability, occupancy and rates.

## Existing CMS relationships

- **Room Types** collection `6abc815b36cbcba74b8b01c4`: `mews-room-type-id` connects the collection item to its Mews Room Type. `features-amenities` is a multi-reference to Amenities.
- **Amenities** collection `6abc8175a7bbdc92fa9e6599`: `short-name`, `name`, `short-description`, `long-description`, `image-path`, `image-name` and `active` drive the on-image note, the Little Comforts list and icon artwork. Paths such as `assets/icons/icons-simple/marshall_speaker.svg` resolve to `/assets/icons/icons-simple/marshall_speaker.svg` under `public/`. Raw SVG content from `icon-svg` is never injected into the page.

## New Photo Hotspots collection

Collection ID: `6acfb8250c28159487fb2aaf`. Configure the environment variable `WEBFLOW_PHOTO_HOTSPOT_COLLECTION_ID` (already present in `wrangler.toml`).

Create **one CMS item per marker on a photo**, with:

| Field | Example | Description |
| --- | --- | --- |
| Name | Alpine tub, hero image | Editorial identifier for the CMS record |
| Amenity | Copper Clawfoot Soaking Tub | Reference to the existing Amenity item |
| Photo File ID | `6ac89730346974fa55ed2a44` | Stable Webflow image `fileId`, preferably copied from the Room Type gallery asset; not a room ID |
| Photo URL | `https://cdn.prod.website-files.com/.../photo.jpg` | Alternative when the image does not have a Webflow file ID |
| X Percent | `38` | Horizontal position, 0 = left and 100 = right |
| Y Percent | `58` | Vertical position, 0 = top and 100 = bottom |
| Display Order | `1` | 1-based order for numbered medallions and mobile cards |
| Active | enabled | Only active, published markers are displayed |

Use **Photo File ID or Photo URL**; if both exist, File ID wins. The coordinates are percentages of the displayed source photograph, not browser pixels. Because photos render with their own aspect ratio, the marker stays aligned as the screen resizes.

The marker is displayed **only if** the guest's room type references the same Amenity through `features-amenities`. Reusing a photo in another room therefore never grants that room an unrelated fixture.

## Content lifecycle and behavior

1. Edit the Amenity's short and long descriptions and its local `image-path`.
2. Assign that Amenity to one or more Room Types via their existing `features-amenities` multi-reference field.
3. Add a Photo Hotspot record for each on-image detail, selecting that Amenity, photo and X/Y coordinates.
4. Set Active and **publish** all required CMS items. Draft Amenity, draft Room Type and draft Photo Hotspot records are ignored by the production Worker. Publishing the new collection's schema alone is not enough.
5. Refresh room content. The Worker has a six-hour fresh editorial cache and stale-while-revalidate behavior; a fresh deployment or cache invalidation can make newly published content visible sooner.

When Details opens, the room's published Amenity list populates the Little Comforts panel. Markers are displayed only for photos with published hotspot coordinates. Clicking a marker uses the short name and long description in the editorial detail card; mobile markers reuse the same data with numbered dots. If an icon path is invalid or the SVG file is missing, a built-in icon is used as a fallback.

No automatic coordinate guesses are made, and no Photo Hotspot items are created until their positions have been verified against the exact image.

## Known issues we've hit (and fixed)

- **Markers not showing even though the CMS said "active": 9 existing "Cabin" Photo Hotspot items had their `Active` checkbox unchecked in the CMS, even though the editor believed otherwise. All 9 were corrected via the API (`active: true`) and republished. If a marker still doesn't show up after publishing, double-check `Active` on the Photo Hotspot item itself before assuming a caching or code issue.
- **Marker style unified across active/inactive:** both the Portal's "Review tags" view and the live booking engine now render active markers as a solid filled accent-red circle (`bg-accent`, white border, white numeral) so they're visible against any photo. Inactive markers render as a muted dashed-outline circle labeled "(inactive)" so editors can tell at a glance why a hotspot isn't showing up for guests, without the marker disappearing entirely from the review tools.
- **Slug not auto-populating:** when a Photo Hotspot's form is pre-seeded (e.g. via the "Tag amenity hotspot" hand-off from a Room Type photo) rather than typed in by the editor, the Name field arrives without triggering the normal change handler that derives the slug. The editor now backfills the slug from `name` on initial load whenever a `name` is present but `slug` is empty.
- **Name/Slug auto-generation for Photo Hotspots:** once a Room Type, Amenity and photo are all resolved, the Photo Hotspots editor automatically builds and keeps in sync both the Name (`"<Room Type> - <Amenity>"`, e.g. "The Cabin Rooms - Cabin Beds") and the Slug (`<room-type-slug>-<amenity-slug>_<photoFileId>`, e.g. `the-cabin-rooms-cabin-beds_6acfd7ba434add8425f18456`) every time the Amenity selection changes, so records stay descriptive and collision-free without manual editing.
- **Amenity dropdown now scoped to the Room Type:** the Amenity reference field on a Photo Hotspot resolves the Room Type that owns the hotspot's photo (either the Room Type passed in explicitly via the "Tag amenity hotspot" hand-off, or by matching the photo against every Room Type's gallery) and filters the dropdown down to only the amenities/features already attached to that Room Type via `features-amenities`. A helper note under the dropdown names the Room Type it's scoped to, and flags the (rare) case where that Room Type has no amenities attached yet.

## Portal editing tools

The internal CMS Portal (`/portal/photo-hotspots`) ships purpose-built tools so editors never have to hand-copy image URLs or guess coordinates:

### 1. Visual hotspot picker (`src/components/HotspotPicker.tsx`)
Used inside the Photo Hotspots item editor (`/portal/photo-hotspots/[itemId]`) in place of raw X/Y Percent number inputs. Renders the item's **Photo URL** and lets the editor click or drag directly on the image to drop/move the marker; `x-percent`/`y-percent` are computed from the click position relative to the rendered image bounds. Manual numeric inputs remain available underneath for pixel-perfect nudges.

### 2. Room photo picker (`src/components/RoomPhotoPicker.tsx`)
Lets an editor pick an existing **Room Type** gallery photo instead of pasting a Photo File ID / Photo URL by hand. Flow:
1. Select a Room Type from a dropdown (loaded from the Room Types collection).
2. Its gallery photos (from the Room Type's multi-image field) render as a thumbnail grid, with a search box to filter by filename/source.
3. Clicking a thumbnail calls `onSelect({ url, fileId })`, auto-filling `photo-url` and `photo-file-id` on the hotspot record (still manually overridable).

Embedded in both the Photo Hotspots item editor (to choose the photo a marker belongs to) and the review view below (to choose which photo to inspect).

### 3. Tag review view (`src/components/HotspotReview.tsx`, page `/portal/photo-hotspots/review`)
A read-only view for auditing what's already tagged on a given photo, so editors can check existing coverage before adding a duplicate or conflicting marker. It reuses the Room Photo Picker to choose a photo, then:
- Fetches **every** Photo Hotspot item (`src/lib/photo-hotspots.ts` → `fetchAllPhotoHotspots`, paginated via `/api/cms/[collectionId]`) and filters to the ones on the selected photo with `hotspotsForPhoto()` (matches on `photo-file-id` first, falling back to `photo-url`).
- Draws a numbered circular marker for each matching hotspot at its stored `x-percent`/`y-percent`: a solid filled accent-red circle with a white numeral for **active** hotspots, a muted dashed-outline circle labeled "(inactive)" for inactive ones — matching the live booking engine's marker treatment.
- Lists matches below the image (active and inactive separated) with the same color-coded markers for cross-reference; hovering a list row highlights its marker on the image.

Entry points: a "Review tags" link on the Photo Hotspots collection list page (`src/pages/portal/[slug].astro`) and a "Review tags" action on each Room Type gallery thumbnail (`src/components/MultiImageField.tsx`), which deep-links with `?roomTypeId=&photoUrl=&photoFileId=` pre-filled for that exact photo.

### 4. Inline tagging from the Room Type gallery (`src/components/MultiImageField.tsx`)
To cut down on the back-and-forth of hopping between the Room Types and Photo Hotspots collections, every photo thumbnail in a Room Type's gallery field now:
- Shows a small numbered-dot overlay directly on the thumbnail if it already has published hotspots attached (computed client-side from the same `fetchAllPhotoHotspots` + `hotspotsForPhoto` helpers the review view uses, passed down via the `photoHotspots` prop).
- Opens an enlarged modal on click with a "Tag amenity hotspot" button that hands the photo off to `/portal/photo-hotspots/new` pre-filled with `photoUrl`, `photoFileId`, `roomTypeId` and `roomTypeName` — skipping the Room Photo Picker step entirely since the photo and Room Type are already known.
- Also offers a "Review tags" button in the same modal when the photo already has hotspots, linking to the review view pre-filled for that exact photo.

