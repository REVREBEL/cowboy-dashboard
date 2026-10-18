





# CMS Portal Development Status

## Current State (Latest Session) — Updated

### ✅ New: Multi-Marker Photo Hotspot Tagging — 100% COMPLETE
**Ask**: Let editors tag a single Room Type photo with multiple amenity hotspots in one session (place several pins, assign an amenity to each, save/publish all at once) instead of repeating the single-marker flow one hotspot at a time.

**Shipped**:
- `src/components/MultiHotspotTagger.tsx` — new multi-pin tagging UI. Maintains a `markers: HotspotMarker[]` array (`{ id, x, y, amenityId }`); click the photo to drop a numbered pin, drag to reposition, side-panel `<Select>` per marker to assign a room-type-scoped amenity, remove button per pin. Reuses the same bounding-rect percentage math as the original `HotspotPicker.tsx`.
- `src/pages/api/cms/[collectionId]/bulk.ts` — new bulk endpoint. `POST { items: Array<{ fieldData }> }` creates every hotspot item in a single `createItems()` call, then publishes all new item IDs together with one `publishItem()` call — mirrors the single-item create-then-publish pattern, batched.
- `src/components/ItemEditor.tsx` — integration point. Renders `MultiHotspotTagger` inside a shadcn `<Dialog>` ("Tag amenity hotspots"), feeds it `photoUrl`/`photoFileId`/`roomTypeId` plus amenity options scoped via the existing `extractAmenityIds()`/`findRoomTypeIdForPhoto()` helpers, and on submit POSTs the generated `fieldData` array to `/api/cms/[collectionId]/bulk`.

Full build log and architecture detail: `HOTSPOT_ARCHITECTURE_REF.md` and `multi-hotspot-progress.md`.

### ✅ CMS API & Authentication — Standardized
All API routes under `src/pages/api/cms/` (`[collectionId].ts`, `[collectionId]/[itemId].ts`, `[collectionId]/[itemId]/publish.ts`, `[collectionId]/bulk.ts`, `[collectionId]/reorder.ts`, `reference/[itemId].ts`, `collections.ts`, `upload-image.ts`) now go through the centralized `createCmsClient(locals)` (and `getCmsToken(locals)`) factory in `src/lib/webflow-client.ts`, which strictly resolves `WEBFLOW_CMS_API_TOKEN` (checking `locals.runtime.env`, `import.meta.env`, then `process.env`, in that order) and throws if it isn't set — no silent fallback to any other token name. This replaces the previous pattern of each route independently reading `locals?.runtime?.env?.WEBFLOW_CMS_SITE_API_TOKEN || import.meta.env.WEBFLOW_CMS_SITE_API_TOKEN` and constructing its own `WebflowClient`, so token rotation or env changes now only require a single-file edit.

### ✅ Build & Type Safety
`npx astro check` passes with **0 errors, 0 warnings** across the entire project (97 files) — only a handful of pre-existing, harmless "declared but never read" hints remain.

---

### ✅ New: Read-only "review tags" view for Photo Hotspots
**Ask**: Give editors a way to review a Room Type photo and see every amenity hotspot already tagged on it — dots plus the item's name only, no editing controls.

**Shipped**:
- `src/lib/photo-hotspots.ts` — shared helpers: `fetchAllPhotoHotspots(baseUrl)` paginates the Photo Hotspots collection via the local `/api/cms/[collectionId]` proxy and normalizes each item (`PhotoHotspotItem`); `hotspotsForPhoto(hotspots, photoFileId, photoUrl)` filters/sorts matches for a specific photo (File ID match wins, falls back to URL match).
- `src/components/HotspotReview.tsx` — read-only review UI. Reuses `RoomPhotoPicker` to choose a Room Type + photo, then overlays a colored dot for each **active** matching hotspot at its stored `x-percent`/`y-percent`, labeled with the hotspot's `name` only. Lists active/inactive matches below the image with hover-to-highlight syncing between the list and the markers.
- `src/pages/portal/photo-hotspots/review.astro` — page wrapper; accepts optional `?roomTypeId=&photoUrl=&photoFileId=` query params to deep-link straight to a specific photo.
- Entry points wired up: "Review tags" link on the Photo Hotspots collection list page (`src/pages/portal/[slug].astro`) and a "Review tags" action on each Room Type gallery thumbnail (`src/components/MultiImageField.tsx`), which pre-fills the deep link for that exact photo.

Verified with `npx astro check` — no type errors introduced (pre-existing unrelated errors remain in `api/cms/upload-image.ts`, `api/cms/[collectionId]/[itemId].ts`, and `api/cms/[collectionId]/[itemId]/publish.ts`, not touched by this change).

Full field/flow documentation lives in `PHOTO_HOTSPOTS_ROOM_AMENITIES.md` under "Portal editing tools".

---

### 🔴 → ✅ Fixed: Blank item editor pages / "Failed to fetch dynamically imported module"
**Symptom**: Item editor pages (`/portal/[slug]/[itemId]`) intermittently rendered completely blank, with the browser console showing `astro-island Error hydrating /src/components/ItemEditor.tsx TypeError: Failed to fetch dynamically imported module`.

**Root causes (two separate bugs, both fixed)**:
1. `[itemId].astro` and `new.astro` wrapped `<ItemEditor />` in an outer `<TooltipProvider>` from the Astro file. Since `ItemEditor` is a `client:only="react"` island, and `Tooltip` (used internally) already self-wraps with its own `TooltipProvider`, this created a fragile cross-island provider nesting issue.
2. Vite's dev-server dependency pre-bundling wasn't discovering `ItemEditor.tsx`'s full module graph (Radix primitives, etc.) at startup. The browser would request the dynamic import before Vite had optimized those deps, producing a `504`/failed-fetch that surfaced as a permanently blank island.

**Fix**:
1. Removed the outer `TooltipProvider` from both `[itemId].astro` and `new.astro` — `ItemEditor` now renders as a single clean `client:only="react"` island.
2. Added an explicit `vite.optimizeDeps.include` list in `astro.config.mjs` covering all Radix UI primitives and other third-party deps used by `src/components/ui/*` and `ItemEditor.tsx`, forcing Vite to pre-bundle them at dev-server startup instead of discovering them lazily at request time.

### 🔴 → ✅ Fixed: Reference / MultiReference fields showing "Not set" despite having real data
**Symptom**: `Property Location`, `Building`, `Features & Amenities`, and `Policies` fields all displayed "Not set" (or just raw Webflow item IDs) in the item editor, even though the CMS items clearly had values for them.

**Root cause**: A Radix UI `<Select>` internals quirk — the hidden native `<select>` (kept in sync for HTML form compatibility) remounts whenever the set of registered `<SelectItem>`s changes, e.g. when the async reference-options fetch finishes loading. On remount it force-syncs its value and fires a synthetic `change` event *before* the DOM has the matching `<option>`, which reports an empty string. Since Radix doesn't allow a real `<Select.Item value="">`, a genuine user selection can never actually produce `val === ''` — so this was always the internal sync glitch silently resetting `formData[field.slug]` to empty.

**Fix**: In `ItemEditor.tsx`'s `Reference` field `onValueChange` handler, added a guard to ignore any spurious empty-string value from Radix. Also hardened both `Reference` and `MultiReference` rendering so the currently-selected id always has a matching `<SelectItem>` (injecting a placeholder "Loading…" option) even before the async reference-options fetch resolves, which was a secondary source of "value with no matching item" glitches.

### ✅ New: Shared "Amenities" collection now filtered by Type per field
**Context**: Room Types' `Features & Amenities` and `Policies` fields are both `MultiReference` fields pointing at the *same* shared Amenities collection (`6abc8175a7bbdc92fa9e6599`), which has a `type` Option field (`Feature` / `Amenity` / `Policy` / `Accessibility` / `Welness` / `Nature or Envrioment` / `Activity`). Previously both fields showed the full, unfiltered list of every item in that collection, making it easy to accidentally tag a Room Type with a "policy" under Features & Amenities (or vice versa).

**Fix**: In `ItemEditor.tsx`:
- `ReferenceOption` now also carries the referenced item's raw `type` field value (captured from `fieldData.type` when loading reference options).
- Added `filterReferenceOptionsForField()`, which — scoped specifically to fields on the shared Amenities collection — filters the selectable options so `policies` only shows `Type = Policy` items, and `features-amenities` shows everything *except* `Type = Policy` items.
- Already-selected items that fall outside the current filter (e.g. legacy/mis-tagged data) still render as removable chips so nothing is silently hidden, they just won't appear in the list of *new* items you can add.

### ✅ UI tweak: Missing alt text indicator on multi-image thumbnails
Replaced the full-width "No alt text" banner on `MultiImageField.tsx` thumbnails with a small red circular warning badge (`AlertCircle` icon) in the top-right corner, titled "Missing alt text" for accessibility. Less visually noisy while still surfacing the issue.

---

## Prior Session

### 🔴 → ✅ Fixed: Item editor pages rendering blank
**Symptom**: Opening any item (e.g. `/portal/locations/[id]`) showed the header (item name/slug) correctly, but the entire form body was empty — no fields at all.

**Root cause**: `src/lib/field-groups.ts` and `src/lib/field-layouts.ts` were written against *guessed* field slugs (e.g. `address-line-1`, `zip-code`, `phone`, `logo`, `gallery`) that don't match the **real** Webflow CMS field slugs (e.g. `street-address-line-1`, `postal-code`, `primary-phone`, `hero-image`). On top of that, `getFieldRows()` in `field-layouts.ts` *silently dropped* any field that wasn't an exact slug match when a collection had a custom layout defined — so for collections like Locations, Room Types, and Outlets, essentially every field vanished from the rendered rows even though `organizeFieldsByGroup()` still produced a (fieldless-looking) "Other Fields" section.

**Fix**:
1. Rewrote `FIELD_GROUPS` in `src/lib/field-groups.ts` and `COLLECTION_LAYOUTS` in `src/lib/field-layouts.ts` using the actual field slugs pulled from `cms-collections-documentation.json` for all 10 collections (events, offers, locations, menu-items, room-types, amenities, buildings, outlets, instagram, add-ons).
2. Made `getFieldRows()` defensive: it no longer drops fields. Any field not explicitly placed by `COLLECTION_LAYOUTS` is now appended as its own fallback row (type-based layout), so a future slug drift/typo can never again make a field disappear — worst case it just renders unexpectedly grouped.
3. Normalized `required` vs. the Webflow SDK's `isRequired` in `ItemEditor.tsx` (previously the component always read `field.required`, which the SDK never sets, so required-field asterisks/validation were silently inert).
4. Cleaned up related type errors: `[itemId].astro`/`new.astro` now cast `collectionDetails.fields` appropriately and guard against possibly-`undefined` `field.slug`; removed the dead `getFieldsByGroup` import and stale `'ItemRef'/'ItemRefSet'` type checks in `[itemId].astro`.

**Verified**: Ran `getFieldRows`/`organizeFieldsByGroup` directly against the real field lists for `locations`, `room-types`, and `outlets` — 100% of fields are now covered (28/28, 33/33, 25/25). Confirmed `/portal/locations/[id]`, `/portal/room-types/[id]`, and collection list pages all return 200 and `npx astro check` is clean for every file touched.

**Takeaway for future work**: Whenever a new collection is wired into the portal (or a Webflow collection's schema changes), cross-check slugs in `field-groups.ts` / `field-layouts.ts` against `cms-collections-documentation.json` — don't guess slugs from the display name.

### What's Working ✅
1. **Portal Home** (`/portal`) — Lists all CMS collections, organized by complexity, using the static config in `src/lib/collections-config.ts` (no `sites:read`/`collections:list` calls, which avoids the 403 scope issue).
2. **Collection List Pages** (`/portal/[slug]`) — Table-style list of items per collection with links to edit, reorder (where applicable), and create new items.
3. **New Item Page** (`/portal/[slug]/new.astro`) — Create a new CMS item.
4. **Reorder Page** (`/portal/[slug]/reorder.astro`) + `PATCH /api/cms/[collectionId]/reorder.ts` — Drag/reorder support for collections with a sortable order field.
5. **Item Editor** (`/portal/[slug]/[itemId]`, powered by `src/components/ItemEditor.tsx`) — Full form-based editor:
   - Fields are grouped and laid out using `src/lib/field-groups.ts` and `src/lib/field-layouts.ts` (multi-column rows, logical grouping instead of a flat field list).
   - **Reference / MultiReference** fields resolve and display human-readable names (via `GET /api/cms/reference/[itemId]`) instead of raw IDs. A Radix `<Select>` internals glitch that could reset a resolved value back to "Not set" was fixed this session (see above) and this is now stable. `Features & Amenities` and `Policies` (both `MultiReference` into the shared Amenities collection) are additionally filtered client-side by the referenced item's `type` field so each picker only offers relevant options.
   - **Save** is wired up end-to-end via `PUT /api/cms/[collectionId]/[itemId]`.
   - **Publish** supported via `src/pages/api/cms/[collectionId]/[itemId]/publish.ts`.
   - **Image** fields use `src/components/ImageUpload.tsx` (single image, preview, replace, remove).
   - **MultiImage** fields (and array-based Image fields) now use `src/components/MultiImageField.tsx` — thumbnail grid (with a small warning badge icon for missing alt text), click-to-edit modal (alt text, remove), and an add-photos dropzone. This was the feature completed in this session.
   - Both image components share upload logic via `src/lib/image-upload-client.ts`, which posts to `POST /api/cms/upload-image.ts`.
6. **Room photo sync utility** — `src/components/SyncRoomPhotos.tsx` + `POST /api/cms/sync-room-photos.ts` for bulk-syncing room images (Mews integration, see `scripts/sync-mews-room-photos`).
7. **API Endpoints**:
   - `GET /api/cms/[collectionId]` — List live items in a collection
   - `GET/PUT /api/cms/[collectionId]/[itemId]` — Get/update a single live item
   - `POST /api/cms/[collectionId]/[itemId]/publish` — Publish an item
   - `PATCH /api/cms/[collectionId]/reorder` — Reorder items
   - `GET /api/cms/reference/[itemId]?collectionId=X` — Resolve a referenced item's display name
   - `POST /api/cms/upload-image` — Upload image asset to Webflow
   - `GET /api/cms/discover-site` — One-off helper used to discover the site ID (kept for reference)
   - `POST /api/cms/sync-room-photos` — Bulk sync room photos from Mews

### Recently Fixed/Completed This Session ✅
- **Multi-image editing**: Implemented `MultiImageField.tsx` — thumbnail grid + modal editor + add-more dropzone, wired into `ItemEditor.tsx` for `MultiImage` fields and array-based `Image` fields.
- **Shared upload helper**: Extracted common upload logic into `src/lib/image-upload-client.ts` so `ImageUpload.tsx` and `MultiImageField.tsx` don't duplicate fetch/validation logic.
- **Type-check cleanup**: Fixed outstanding TypeScript errors/warnings across `ItemEditor.tsx`, `ImageUpload.tsx`, `MultiImageField.tsx`, and `image-upload-client.ts` — removed unused imports (`baseUrl`, `FieldRow`, `ExternalLink`, unused `Select` imports), fixed an `isRequired` → `required` prop mismatch, removed dead duplicate functions, and replaced `any` JSON response types with proper types. `npx astro check` now reports zero errors/warnings in these files.

### Field Types Supported in Editor
- ✅ PlainText (single & multi-line)
- ✅ RichText (textarea)
- ✅ Number
- ✅ DateTime (datetime-local input)
- ✅ Switch (boolean toggle)
- ✅ Option (button group selector)
- ✅ Reference (resolved + editable via selector)
- ✅ MultiReference (resolved names, list display)
- ✅ Image (upload/replace/remove with preview)
- ✅ MultiImage (thumbnail grid, modal edit, add more) — **new this session**
- ✅ Link (URL input)
- ✅ Color (color picker + hex input)
- ✅ Email (text input)
- ✅ Phone (text input)
- ⚠️ File — not yet implemented
- ⚠️ VideoLink — not yet implemented
- ⚠️ ExtFileRef — not yet implemented

### Key Files
- `src/components/ItemEditor.tsx` — Main editor component (field rendering, save, publish, reference resolution)
- `src/components/ImageUpload.tsx` — Single image field UI
- `src/components/MultiImageField.tsx` — Multi-image field UI (grid + modal)
- `src/components/ReorderList.tsx` — Drag-to-reorder UI
- `src/components/SyncRoomPhotos.tsx` — Mews room photo sync UI
- `src/lib/image-upload-client.ts` — Shared image upload helper
- `src/lib/field-groups.ts` — Groups raw CMS fields into logical sections for the editor
- `src/lib/field-layouts.ts` — Row/column layout rules per collection/field
- `src/lib/collections-config.ts` — Static collection + field metadata (avoids needing `sites:read`)
- `src/pages/portal/index.astro` — Portal home
- `src/pages/portal/[slug].astro` — Collection list page
- `src/pages/portal/[slug]/[itemId].astro` — Item editor page
- `src/pages/portal/[slug]/new.astro` — New item page
- `src/pages/portal/[slug]/reorder.astro` — Reorder page
- `src/pages/api/cms/**` — All CMS API routes (see list above)

### Environment Variables
```
WEBFLOW_CMS_API_TOKEN=<user's token>
WEBFLOW_SITE_ID=6abc810fd801e90511049adb
```
**Important**: Only `WEBFLOW_CMS_API_TOKEN` is used — resolved centrally via `getCmsToken(locals)` / `createCmsClient(locals)` in `src/lib/webflow-client.ts`, no fallback to any other token name anywhere in the codebase.

### Design Principles Applied
- Minimalist UI: no gradients, glassmorphism, or excessive rounded corners
- Clean, functional interface: table-style lists, simple forms, grid-based image editing
- Typography: Webflow design system fonts (Desertrain for headings, Uchen for body, Brothers for buttons)
- Colors: CSS variables from `generated/webflow.css`

### Collections (9 Total)
1. **Menu Items** (2 fields) — Simplest
2. **Amenities** (16 fields)
3. **Locations** (22 fields) — Central hub
4. **Buildings** (8 fields)
5. **Instagrams** (11 fields)
6. **Outlets** (24 fields)
7. **Room Types** (21 fields)
8. **Offers** (29 fields) — Most fields
9. **Events** (21 fields) — Most complex (recurring logic)

### Known Limitations
- Cannot access draft/staged items (only published/live) via the listing endpoints — publish endpoint pushes changes live
- API token must have `cms:read` and `cms:write` scopes
- No `sites:read` scope available — using static collections config instead
- No `File`, `VideoLink`, or `ExtFileRef` field support yet
- No user authentication/authorization on the portal itself
- Recurring event logic (Events collection) not yet specialized — currently uses generic field editor

### Next Steps (Priority Order)
1. **Implement File field** — upload/download support
2. **Implement VideoLink field** — embed preview
3. **Add recurring event editor** for Events collection (start/end recurrence rules)
4. **Add filtering/search** to collection list pages
5. **Add pagination** for large collections
6. **Add portal authentication** (currently open to anyone with the URL)
7. **Add validation feedback** (required-field checks, inline errors) before save

### Technical Notes
- Astro 5.13.5 with Cloudflare Workers adapter
- React 19.1.1 for interactive components
- TailwindCSS 4.1.11 for styling
- shadcn/ui components pre-installed
- `WebflowClient` from `webflow-api` package (v3.2.0), instantiated exclusively via `createCmsClient(locals)` in `src/lib/webflow-client.ts`
- All API calls authenticate with `WEBFLOW_CMS_API_TOKEN` from env (centralized token resolution, see `src/lib/webflow-client.ts`)
- Base URL handling via `src/lib/base-url.ts` for Cloudflare deployment
- `npx astro check` is clean — 0 errors, 0 warnings across the entire project

### Documentation Files
- `CMS_DOCUMENTATION_SUMMARY.md` — Executive summary
- `PORTAL_SPECIFICATION.md` — Technical specification
- `CMS_COLLECTIONS_DOCUMENTATION.md` — Detailed field descriptions
- `DETAILED_FIELDS.md` — Field-by-field breakdown
- `COLLECTION_RELATIONSHIPS.md` — Visual relationship diagrams
- `IMAGE_UPLOAD_GUIDE.md` — Image/MultiImage upload implementation guide
- `cms-collections-documentation.json` — Raw API data
- `PORTAL_STATUS.md` — This file (current status)









