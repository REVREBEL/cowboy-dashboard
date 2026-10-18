

# CMS Collections Documentation

**Site:** Urban Cowboy Mockup  
**Site ID:** `6aaa2497c8ea366207beba30`  
**Total Collections:** 10

---

## Collections Overview

| Collection | Slug | Fields | ID |
|------------|------|--------|-----|
| Events | events | 21 | 6abc810f36cbcba74b8af4a3 |
| Offers | offers | 29 | 6abc8120e0e0e0e0e0e0e0e0 |
| Locations | locations | 22 | 6abc812fd98b325b281d6301 |
| Menu Items | menu-items | 2 | (see below) |
| Room Types | room-types | 21 | (see below) |
| Amenities | amenities | 16 | (see below) |
| Buildings | buildings | 8 | 6abc819c43b4b395a2b80752 |
| Outlets | outlets | 24 | (see below) |
| Instagrams | instagram | 11 | (see below) |
| Photo Hotspots | photo-hotspots | 9 | 6acfb8250c28159487fb2aaf |

---

## Detailed Field Documentation

### 1. Events Collection
**ID:** `6abc810f36cbcba74b8af4a3`  
**Slug:** `events`  
**Total Fields:** 21

| Field Name | Slug | Type | Required | Notes |
|------------|------|------|----------|-------|
| Property Location | property-location | Reference | No | References: Locations collection (6abc812fd98b325b281d6301) |
| Datetime Start | datetime | DateTime | No | Format: date-time |
| Read More | read-more | Link | No | - |
| Short Description | short-description | PlainText | No | Single line |
| Long Description | long-description | PlainText | No | Multi-line |
| Onsite Event Location | onsite-event-location | Reference | No | References: Buildings collection (6abc819c43b4b395a2b80752) |
| Offsite Event | offsite-event | Switch | No | Boolean toggle |
| Offsite Event Location | offsite-event-location | PlainText | No | Single line |
| Image Long | image-long | Image | No | - |
| Image Short | image | Image | No | - |
| Onsite | onsite | Switch | No | Boolean toggle |
| Onsite Custom Location | onsite-custom-location | PlainText | No | Single line |
| Datetime End | datetime-end | DateTime | No | Format: date-time |
| Recurrence Type | recurrence-type | Option | No | Options: One Time, Daily, Weekly, Monthly |
| Repeat Every | repeat-every | Number | No | Integer, non-negative |
| Repeat On | repeat-on | Option | No | Options: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday |
| Ends On | ends-on | DateTime | No | Format: date-time |
| Ends After | ends-after | Number | No | Integer, non-negative |
| Recurrence End Type | recurrence-end-type | Option | No | Options: Never, On Date, After Occurrences |
| Event Type | event-type | Option | No | Options: (multiple event types) |
| Archived | archived | Switch | No | Boolean toggle |

---

### 2. Offers Collection
**Slug:** `offers`  
**Total Fields:** 29

Key fields include:
- Property Location (Reference to Locations)
- Offer Type (Option)
- Title, Short Description, Long Description (PlainText)
- Start Date, End Date (DateTime)
- Discount Percentage, Discount Amount (Number)
- Images (multiple Image fields)
- Terms & Conditions (RichText)
- Active status (Switch)
- Various display options and settings

---

### 3. Locations Collection
**ID:** `6abc812fd98b325b281d6301`  
**Slug:** `locations`  
**Total Fields:** 22

Key fields include:
- Location Name (PlainText)
- Address fields (Street, City, State, Zip, Country)
- Coordinates (Number fields for latitude/longitude)
- Phone, Email (PlainText)
- Website (Link)
- Description (RichText)
- Images (multiple Image fields)
- Amenities (Reference to Amenities collection)
- Active status (Switch)

---

### 4. Menu Items Collection
**Slug:** `menu-items`  
**Total Fields:** 2

Simple collection with:
- Name (PlainText)
- Link/URL (Link)

---

### 5. Room Types Collection
**Slug:** `room-types`  
**Total Fields:** 21

Key fields include:
- Room Name (PlainText)
- Property Location (Reference to Locations)
- Description (RichText)
- Price per night (Number)
- Max occupancy (Number)
- Bed configuration (PlainText)
- Square footage (Number)
- Images (multiple Image fields)
- Amenities (Reference to Amenities collection)
- Availability status (Switch)
- Booking link (Link)

---

### 6. Amenities Collection
**Slug:** `amenities`  
**Total Fields:** 16

Key fields include:
- Amenity Name (PlainText)
- Category (Option)
- Description (PlainText)
- Icon (Image)
- Available at locations (Reference to Locations)
- Display order (Number)
- Active status (Switch)

---

### 7. Buildings Collection
**ID:** `6abc819c43b4b395a2b80752`  
**Slug:** `buildings`  
**Total Fields:** 8

Key fields include:
- Building Name (PlainText)
- Property Location (Reference to Locations)
- Description (PlainText)
- Floor count (Number)
- Images (Image)
- Active status (Switch)

---

### 8. Outlets Collection
**Slug:** `outlets`  
**Total Fields:** 24

Key fields include:
- Outlet Name (PlainText)
- Property Location (Reference to Locations)
- Outlet Type (Option: Restaurant, Bar, Cafe, etc.)
- Description (RichText)
- Cuisine Type (PlainText)
- Hours of operation (PlainText/DateTime)
- Menu link (Link)
- Reservation link (Link)
- Phone (PlainText)
- Images (multiple Image fields)
- Capacity (Number)
- Dress code (PlainText)
- Active status (Switch)

---

### 9. Instagrams Collection
**Slug:** `instagram`  
**Total Fields:** 11

Key fields include:
- Post URL (Link)
- Image (Image)
- Caption (PlainText)
- Posted Date (DateTime)
- Likes count (Number)
- Property Location (Reference to Locations)
- Display order (Number)
- Active status (Switch)

---

### 10. Photo Hotspots Collection
**ID:** `6acfb8250c28159487fb2aaf`  
**Slug:** `photo-hotspots`  
**Total Fields:** 9

One CMS item represents a single Amenity marker pinned to an X/Y position
on a Room Type photo — not one item per photo. A single photo can have any
number of Photo Hotspot items pointing at it.

Key fields include:
- Name (auto-generated, PlainText)
- Slug (auto-generated, unique per room type + amenity + photo)
- Amenity (Reference to Amenities collection, scoped to the parent Room
  Type's assigned amenities)
- Photo URL (Link) — published Webflow CDN photo URL
- Photo File ID (PlainText) — stable Webflow asset file ID, preferred over
  Photo URL when both are present
- X Percent / Y Percent (Number, 0–100) — marker position as a percentage
  of the rendered photo
- Display Order (Number) — 1-based order for numbered medallions/mobile
  cards
- Active status (Switch)

**Bulk API endpoint support:** Unlike the other collections in this
document, Photo Hotspots items are typically created in batches (one
request per photo, many markers per request) rather than one at a time.
The portal's multi-marker tagging flow (`MultiHotspotTagger.tsx`) saves all
markers tagged on a photo in a single round-trip to
`POST /api/cms/[collectionId]/bulk`
(`src/pages/api/cms/[collectionId]/bulk.ts`), which creates every item via
one call to `client.collections.items.createItems()` and then publishes all
of the new item IDs live via one call to
`client.collections.items.publishItem({ itemIds })`. This endpoint is
authenticated the same way as every other CMS route, via the shared
`createCmsClient(locals)` factory. See `PORTAL_SPECIFICATION.md` for the
full bulk save & publish behavior, including partial-failure handling.

---

## Field Type Reference

### Common Field Types:
- **PlainText**: Simple text input (can be single-line or multi-line)
- **RichText**: Formatted text with styling options
- **Number**: Numeric values (can be integer or decimal)
- **DateTime**: Date and/or time values
- **Switch**: Boolean on/off toggle
- **Option**: Dropdown selection from predefined options
- **Reference**: Link to another collection item
- **Link**: URL field
- **Image**: Image upload field

---

## Portal Requirements

Based on this documentation, the client portal needs to support:

1. **Collection Management Pages** (9 collections)
   - List view for each collection
   - Detail/edit view for each item
   - Create new item functionality

2. **Field Type Support**
   - Text inputs (single and multi-line)
   - Rich text editor
   - Number inputs
   - Date/time pickers
   - Toggle switches
   - Dropdown selects
   - Reference/relationship selectors
   - Image upload
   - URL inputs

3. **Special Features**
   - Recurring event management (Events collection)
   - Location-based filtering (most collections reference Locations)
   - Image gallery management
   - Active/archived status management

4. **Relationships to Handle**
   - Events → Locations (property-location)
   - Events → Buildings (onsite-event-location)
   - Offers → Locations
   - Room Types → Locations
   - Room Types → Amenities
   - Outlets → Locations
   - Instagrams → Locations

---

## Next Steps

1. Create a dashboard with collection overview
2. Build CRUD interfaces for each collection
3. Implement field-specific input components
4. Add relationship management UI
5. Implement image upload functionality
6. Add filtering and search capabilities
7. Implement user authentication/authorization


