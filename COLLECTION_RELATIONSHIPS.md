# CMS Collection Relationships Diagram

## Visual Relationship Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         LOCATIONS                                │
│                   (Central Hub Collection)                       │
│                  ID: 6abc812fd98b325b281d6301                   │
│                                                                  │
│  Fields: name, slug, address, city, state, zip, country,       │
│          latitude, longitude, phone, email, website,            │
│          description, images, amenities (ref), active           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Referenced by (property-location):
                         │
        ┌────────────────┼────────────────┬──────────────┬────────────────┐
        │                │                │              │                │
        ▼                ▼                ▼              ▼                ▼
   ┌─────────┐     ┌─────────┐     ┌──────────┐   ┌─────────┐    ┌──────────┐
   │ EVENTS  │     │ OFFERS  │     │  ROOM    │   │OUTLETS  │    │INSTAGRAMS│
   │         │     │         │     │  TYPES   │   │         │    │          │
   │ 21 flds │     │ 29 flds │     │ 21 flds  │   │ 24 flds │    │ 11 flds  │
   └────┬────┘     └─────────┘     └────┬─────┘   └─────────┘    └──────────┘
        │                                │
        │                                │
        │ onsite-event-location          │ amenities (ref)
        │ (Reference)                    │
        │                                │
        ▼                                ▼
   ┌──────────┐                    ┌──────────┐
   │BUILDINGS │                    │AMENITIES │
   │          │                    │          │
   │  8 flds  │                    │ 16 flds  │
   └──────────┘                    └──────────┘
        │
        │ property-location
        │ (Reference back to Locations)
        │
        └──────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                      MENU ITEMS                                  │
│                   (Standalone Collection)                        │
│                  ID: 6abc8145eb90b8f4d6d650f4                   │
│                                                                  │
│  Fields: name, slug                                             │
│  Note: No relationships to other collections                    │
└────────────────────────────��────────────────────────────────────┘
```

---

## Relationship Details

### 1. Locations → Everything
**Locations** is the central hub. Almost every collection references it via `property-location` field.

**Collections that reference Locations:**
- Events
- Offers  
- Room Types
- Buildings
- Outlets
- Instagrams

---

### 2. Events → Buildings
**Events** can reference **Buildings** for onsite event locations via `onsite-event-location` field.

**Flow:**
```
Event → property-location → Location
Event → onsite-event-location → Building → property-location → Location
```

---

### 3. Room Types → Amenities
**Room Types** can reference multiple **Amenities** to show what features each room has.

**Flow:**
```
Room Type → amenities → Amenities (multiple)
Room Type → property-location → Location
```

---

### 4. Locations → Amenities
**Locations** can reference **Amenities** to show what features each property has.

**Flow:**
```
Location → amenities → Amenities (multiple)
```

---

## Reference Field Summary

| Collection | Field Name | References | Collection ID |
|------------|------------|------------|---------------|
| Events | property-location | Locations | 6abc812fd98b325b281d6301 |
| Events | onsite-event-location | Buildings | 6abc819c43b4b395a2b80752 |
| Offers | property-location | Locations | 6abc812fd98b325b281d6301 |
| Room Types | property-location | Locations | 6abc812fd98b325b281d6301 |
| Room Types | amenities | Amenities | 6abc8175a7bbdc92fa9e6599 |
| Buildings | property-location | Locations | 6abc812fd98b325b281d6301 |
| Outlets | property-location | Locations | 6abc812fd98b325b281d6301 |
| Instagrams | property-location | Locations | 6abc812fd98b325b281d6301 |
| Locations | amenities | Amenities | 6abc8175a7bbdc92fa9e6599 |

---

## Implementation Order Based on Dependencies

### Level 0: No Dependencies
```
1. Menu Items (standalone, no references)
2. Amenities (referenced by others, but has no outgoing references)
```

### Level 1: References Level 0
```
3. Locations (references Amenities only)
```

### Level 2: References Level 1
```
4. Buildings (references Locations)
5. Instagrams (references Locations)
6. Outlets (references Locations)
7. Offers (references Locations)
8. Room Types (references Locations and Amenities)
```

### Level 3: References Level 2
```
9. Events (references Locations and Buildings)
```

---

## Data Flow Examples

### Example 1: Creating an Event
```
1. Select Property Location (from Locations collection)
2. If onsite event:
   - Select Building (filtered by selected Location)
   - OR enter custom location text
3. If offsite event:
   - Enter offsite location text
4. Set event details (dates, times, descriptions, images)
5. Configure recurrence (if applicable)
```

### Example 2: Creating a Room Type
```
1. Select Property Location (from Locations collection)
2. Enter room details (name, description, price, etc.)
3. Select Amenities (multiple selection)
4. Upload images
5. Set availability and booking link
```

### Example 3: Creating an Offer
```
1. Select Property Location (from Locations collection)
2. Enter offer details (title, descriptions, dates)
3. Set Mews Rate ID (if applicable)
4. Configure cancellation policy
5. Upload images (with specific dimensions)
6. Choose button and text colors
7. Set active status
```

---

## Cascade Considerations

### When Deleting a Location:
⚠️ **Warning:** This will affect:
- All Events at that location
- All Offers for that location
- All Room Types at that location
- All Buildings at that location
- All Outlets at that location
- All Instagram posts tagged to that location

**Recommendation:** Implement soft delete (archive) instead of hard delete.

### When Deleting a Building:
⚠️ **Warning:** This will affect:
- All Events using that building as onsite location

### When Deleting an Amenity:
⚠️ **Warning:** This will affect:
- All Locations that include that amenity
- All Room Types that include that amenity

---

## Query Patterns

### Get all Events for a Location:
```
1. Query Events collection
2. Filter by property-location = [location-id]
3. Sort by datetime (ascending)
```

### Get all Rooms at a Location with specific Amenities:
```
1. Query Room Types collection
2. Filter by property-location = [location-id]
3. Filter by amenities contains [amenity-id]
4. Sort by price-per-night
```

### Get all active Offers for a Location:
```
1. Query Offers collection
2. Filter by property-location = [location-id]
3. Filter by active = true
4. Filter by date range (start-date <= today <= end-date)
5. Sort by priority or date
```

---

## Portal UI Implications

### Location Selector Component:
- Used in: Events, Offers, Room Types, Buildings, Outlets, Instagrams
- Should show: Location name, city, state
- Should support: Search/filter, dropdown selection
- Should display: Full address on selection

### Building Selector Component:
- Used in: Events (onsite-event-location)
- Should filter: Only buildings at selected location
- Should show: Building name, floor count
- Should support: Conditional display (only when onsite = true)

### Amenities Selector Component:
- Used in: Locations, Room Types
- Should show: Amenity name, category, icon
- Should support: Multiple selection, search/filter
- Should display: Selected amenities as chips/tags

---

## API Query Optimization

### Recommended Approach:
1. **Fetch Locations first** - Cache for dropdown selectors
2. **Fetch Amenities** - Cache for multi-select components
3. **Fetch Buildings by Location** - Load on-demand when location selected
4. **Fetch main collection items** - Paginated, with filters

### Caching Strategy:
- **Locations:** Cache for 5 minutes (rarely change)
- **Amenities:** Cache for 10 minutes (rarely change)
- **Buildings:** Cache for 5 minutes (rarely change)
- **Events/Offers/etc:** No cache or 1 minute (frequently updated)

---

## Summary

- **Central Hub:** Locations collection is referenced by 6 other collections
- **Standalone:** Menu Items has no relationships
- **Two-level References:** Events references both Locations and Buildings
- **Many-to-Many:** Room Types and Locations both reference Amenities
- **Implementation Order:** Start with Amenities and Menu Items, then Locations, then everything else

