# CMS Client Portal - Technical Specification

## Overview
This document outlines the technical requirements for building a client portal to manage Webflow CMS collections for the Urban Cowboy Mockup site.

---

## Site Information
- **Site Name:** Urban Cowboy Mockup
- **Site ID:** `6aaa2497c8ea366207beba30`
- **Total Collections:** 9
- **API Base:** Configured via `WEBFLOW_API_HOST`
- **Authentication:** `WEBFLOW_CMS_SITE_API_TOKEN`

---

## Collections Summary

### 1. Events (`6abc810f36cbcba74b8af4a3`)
**Purpose:** Manage property events (both onsite and offsite)  
**Fields:** 21  
**Key Features:**
- Recurring event support (daily, weekly, monthly)
- Location management (onsite/offsite)
- Multiple images (long/short format)
- Date/time range support
- Event type categorization

**Critical Fields:**
- `name` (auto-generated)
- `slug` (auto-generated)
- `datetime` (DateTime) - Event start
- `datetime-end` (DateTime) - Event end
- `property-location` (Reference → Locations)
- `onsite-event-location` (Reference → Buildings)
- `recurrence-type` (Option: One Time, Daily, Weekly, Monthly)
- `event-type` (Option)
- `archived` (Switch)

---

### 2. Offers (`6abc811cb92ea32dd64d79e0`)
**Purpose:** Manage promotional offers and special rates  
**Fields:** 29  
**Key Features:**
- Integration with Mews (rate ID)
- Cancellation policy management
- Multiple image formats (full card, compact card)
- Button color customization
- Date range validity

**Critical Fields:**
- `name` (auto-generated)
- `slug` (auto-generated)
- `mews-rate-id` (PlainText)
- `full-card` (Image - 500x1038px)
- `compact-card` (Image - 500x675px)
- `button-color` (Option)
- `cancellation-penalty-window` (Number)
- `cancellation-penalty-window-period` (Option: Hours, Days)

---

### 3. Locations (`6abc812fd98b325b281d6301`)
**Purpose:** Manage property locations  
**Fields:** 22  
**Key Features:**
- Full address management
- Geographic coordinates
- Contact information
- Multiple images
- Amenity associations

**Critical Fields:**
- `name` (auto-generated)
- `slug` (auto-generated)
- Address fields (street, city, state, zip, country)
- `latitude`, `longitude` (Number)
- `phone`, `email` (PlainText)
- `website` (Link)
- `amenities` (Reference → Amenities)

---

### 4. Menu Items (`6abc8145eb90b8f4d6d650f4`)
**Purpose:** Simple navigation menu management  
**Fields:** 2  
**Key Features:**
- Minimal structure for menu links

**Critical Fields:**
- `name` (auto-generated)
- `slug` (auto-generated)

---

### 5. Room Types (`6abc815b36cbcba74b8b01c4`)
**Purpose:** Manage room/accommodation types  
**Fields:** 21  
**Key Features:**
- Pricing information
- Occupancy details
- Bed configuration
- Multiple images
- Amenity associations
- Booking integration

**Critical Fields:**
- `name` (auto-generated)
- `slug` (auto-generated)
- `property-location` (Reference → Locations)
- `price-per-night` (Number)
- `max-occupancy` (Number)
- `square-footage` (Number)
- `amenities` (Reference → Amenities)
- `booking-link` (Link)
- `available` (Switch)

---

### 6. Amenities (`6abc8175a7bbdc92fa9e6599`)
**Purpose:** Manage property amenities/features  
**Fields:** 16  
**Key Features:**
- Categorization
- Icon support
- Location associations
- Display ordering

**Critical Fields:**
- `name` (auto-generated)
- `slug` (auto-generated)
- `category` (Option)
- `icon` (Image)
- `locations` (Reference → Locations)
- `display-order` (Number)
- `active` (Switch)

---

### 7. Buildings (`6abc8192a900d21d00b7c588`)
**Purpose:** Manage buildings within properties  
**Fields:** 8  
**Key Features:**
- Simple building information
- Location association

**Critical Fields:**
- `name` (auto-generated)
- `slug` (auto-generated)
- `property-location` (Reference → Locations)
- `floor-count` (Number)
- `active` (Switch)

---

### 8. Outlets (`6abc819c43b4b395a2b80752`)
**Purpose:** Manage restaurants, bars, cafes, etc.  
**Fields:** 24  
**Key Features:**
- Outlet type categorization
- Hours of operation
- Menu and reservation links
- Multiple images
- Capacity management

**Critical Fields:**
- `name` (auto-generated)
- `slug` (auto-generated)
- `property-location` (Reference → Locations)
- `outlet-type` (Option: Restaurant, Bar, Cafe, etc.)
- `cuisine-type` (PlainText)
- `hours` (PlainText/DateTime)
- `menu-link` (Link)
- `reservation-link` (Link)
- `capacity` (Number)
- `active` (Switch)

---

### 9. Instagrams (`6abe1d64ff9619885c7e5cf7`)
**Purpose:** Manage Instagram post displays  
**Fields:** 11  
**Key Features:**
- Social media integration
- Display ordering
- Location tagging

**Critical Fields:**
- `name` (auto-generated)
- `slug` (auto-generated)
- `post-url` (Link)
- `image` (Image)
- `caption` (PlainText)
- `posted-date` (DateTime)
- `likes-count` (Number)
- `property-location` (Reference → Locations)
- `display-order` (Number)
- `active` (Switch)

---

## Collection Relationships

```
Locations (central hub)
├── Events (property-location)
├── Offers (property-location)
���── Room Types (property-location)
├── Buildings (property-location)
├── Outlets (property-location)
└── Instagrams (property-location)

Buildings
└── Events (onsite-event-location)

Amenities
├── Locations (reverse reference)
└── Room Types (reverse reference)
```

---

## Portal Architecture

### Pages Required

1. **Dashboard** (`/portal`)
   - Overview of all collections
   - Quick stats (total items per collection)
   - Recent activity

2. **Collection List Pages** (`/portal/[collection-slug]`)
   - Events: `/portal/events`
   - Offers: `/portal/offers`
   - Locations: `/portal/locations`
   - Menu Items: `/portal/menu-items`
   - Room Types: `/portal/room-types`
   - Amenities: `/portal/amenities`
   - Buildings: `/portal/buildings`
   - Outlets: `/portal/outlets`
   - Instagrams: `/portal/instagram`

3. **Item Detail/Edit Pages** (`/portal/[collection-slug]/[item-id]`)
   - View and edit individual items
   - Field-specific input components

4. **Create New Item Pages** (`/portal/[collection-slug]/new`)
   - Create new items in each collection

---

## API Endpoints Required

### Already Created:
- `GET /api/cms/collections` - List all collections with fields
- `GET /api/cms/discover-site` - Get site information

### To Create:
- `GET /api/cms/[collectionId]` - List items in a collection
- `GET /api/cms/[collectionId]/[itemId]` - Get single item
- `PATCH /api/cms/[collectionId]/[itemId]` - Update item
- `POST /api/cms/[collectionId]` - Create new item
- `DELETE /api/cms/[collectionId]/[itemId]` - Delete item (if needed)

---

## Field Type Components

### Input Components Needed:

1. **TextInput** - For PlainText (single-line)
2. **TextArea** - For PlainText (multi-line)
3. **RichTextEditor** - For RichText fields
4. **NumberInput** - For Number fields
5. **DateTimePicker** - For DateTime fields
6. **Switch** - For Switch/boolean fields
7. **Select** - For Option fields
8. **ReferenceSelect** - For Reference fields (with search/autocomplete)
9. **LinkInput** - For Link/URL fields
10. **ImageUpload** - For Image fields

### Special Components:

1. **RecurringEventEditor** - For Events collection
   - Recurrence type selector
   - Repeat frequency
   - End conditions
   - Day of week selector

2. **LocationSelector** - For location references
   - Dropdown with search
   - Display location name and address

3. **ImageGallery** - For multiple image fields
   - Upload multiple images
   - Reorder images
   - Set alt text

---

## Technical Stack

### Frontend:
- **Framework:** Astro + React
- **UI Components:** shadcN UI (already installed)
- **Styling:** Tailwind CSS with Webflow design tokens
- **Forms:** React Hook Form + Zod validation
- **Data Fetching:** Native fetch with SWR (optional)

### Backend:
- **Runtime:** Cloudflare Workers (Astro SSR)
- **API:** Astro API routes
- **CMS SDK:** webflow-api (already installed)

### Authentication:
- To be determined (basic auth, JWT, or Webflow OAuth)

---

## Implementation Priority

### Phase 1: Core Infrastructure
1. ✅ API endpoint for listing collections
2. ✅ API endpoint for discovering site
3. Create base API routes for CRUD operations
4. Build dashboard layout
5. Create collection list page template

### Phase 2: Basic CRUD
1. Implement simple collections first (Menu Items, Buildings)
2. Build field input components
3. Create item list views
4. Create item edit views
5. Implement create new item functionality

### Phase 3: Complex Features
1. Reference field handling
2. Image upload functionality
3. Rich text editor integration
4. Recurring event management
5. Advanced filtering and search

### Phase 4: Polish
1. Form validation
2. Error handling
3. Loading states
4. Success/error notifications
5. Responsive design
6. User authentication

---

## Next Steps

1. Create base API routes for CRUD operations
2. Build portal dashboard page
3. Create reusable field input components
4. Implement collection list view
5. Implement item edit view
6. Add authentication layer

---

## Notes

- All collections have auto-generated `name` and `slug` fields
- Most collections have an `active` or `archived` Switch field
- The Locations collection is central to most other collections
- Image fields often have specific dimension requirements
- Some fields have validation rules (min/max values, required formats)
