# CMS Collections Documentation Summary

## 📋 Documentation Files Created

1. **CMS_COLLECTIONS_DOCUMENTATION.md** - High-level overview with field descriptions
2. **PORTAL_SPECIFICATION.md** - Technical specification for building the portal
3. **DETAILED_FIELDS.md** - Complete field-by-field breakdown with validations
4. **cms-collections-documentation.json** - Raw JSON data from API

---

## 🎯 Quick Reference

### Site Information
- **Site Name:** Urban Cowboy Mockup
- **Site ID:** `6aaa2497c8ea366207beba30`
- **Total Collections:** 9
- **Total Fields:** 154 fields across all collections

### Collections at a Glance

| # | Collection | ID | Slug | Fields | Complexity |
|---|------------|----|----- |--------|------------|
| 1 | Events | `6abc810f36cbcba74b8af4a3` | events | 21 | High (recurring events) |
| 2 | Offers | `6abc811cb92ea32dd64d79e0` | offers | 29 | High (many options) |
| 3 | Locations | `6abc812fd98b325b281d6301` | locations | 22 | Medium (central hub) |
| 4 | Menu Items | `6abc8145eb90b8f4d6d650f4` | menu-items | 2 | Low (simple) |
| 5 | Room Types | `6abc815b36cbcba74b8b01c4` | room-types | 21 | Medium |
| 6 | Amenities | `6abc8175a7bbdc92fa9e6599` | amenities | 16 | Low |
| 7 | Buildings | `6abc8192a900d21d00b7c588` | buildings | 8 | Low |
| 8 | Outlets | `6abc819c43b4b395a2b80752` | outlets | 24 | Medium |
| 9 | Instagrams | `6abe1d64ff9619885c7e5cf7` | instagram | 11 | Low |

---

## 🔗 Collection Relationships

### Primary Hub: Locations
Almost all collections reference the Locations collection:
- Events → Locations (property-location)
- Offers → Locations (property-location)
- Room Types → Locations (property-location)
- Buildings → Locations (property-location)
- Outlets → Locations (property-location)
- Instagrams → Locations (property-location)

### Secondary Relationships
- Events → Buildings (onsite-event-location)
- Room Types → Amenities
- Locations → Amenities

---

## 📊 Field Type Distribution

### Field Types Used:
- **PlainText** (single-line & multi-line) - Most common
- **Number** (integer & decimal)
- **DateTime** (date-time format)
- **Switch** (boolean toggles)
- **Option** (dropdown selections)
- **Reference** (collection relationships)
- **Link** (URLs)
- **Image** (with dimension validations)
- **RichText** (formatted text)

### Special Features:
- **Recurring Events** - Complex recurrence patterns (Events)
- **Image Validations** - Specific dimensions required (Offers)
- **Mews Integration** - Rate ID fields (Offers)
- **Geographic Data** - Lat/long coordinates (Locations)
- **Social Media** - Instagram post management (Instagrams)

---

## 🏗️ Portal Structure Recommendation

### Phase 1: Simple Collections (Start Here)
1. **Menu Items** (2 fields) - Simplest collection
2. **Buildings** (8 fields) - Simple with one reference
3. **Amenities** (16 fields) - Moderate complexity

### Phase 2: Core Collections
4. **Locations** (22 fields) - Central hub, needed for others
5. **Instagrams** (11 fields) - Social media content
6. **Outlets** (24 fields) - Restaurant/bar management

### Phase 3: Complex Collections
7. **Room Types** (21 fields) - Accommodation management
8. **Offers** (29 fields) - Many options and validations
9. **Events** (21 fields) - Most complex (recurring events)

---

## 🛠️ Technical Requirements

### API Endpoints Created:
✅ `GET /api/cms/collections` - List all collections with fields  
✅ `GET /api/cms/discover-site` - Get site information

### API Endpoints Needed:
- `GET /api/cms/[collectionId]` - List items
- `GET /api/cms/[collectionId]/[itemId]` - Get item
- `PATCH /api/cms/[collectionId]/[itemId]` - Update item
- `POST /api/cms/[collectionId]` - Create item
- `DELETE /api/cms/[collectionId]/[itemId]` - Delete item (optional)

### UI Components Needed:
1. **Form Inputs:**
   - TextInput (single-line)
   - TextArea (multi-line)
   - NumberInput
   - DateTimePicker
   - Switch/Toggle
   - Select/Dropdown
   - ReferenceSelect (with search)
   - LinkInput
   - ImageUpload
   - RichTextEditor

2. **Specialized Components:**
   - RecurringEventEditor (for Events)
   - LocationSelector (for location references)
   - ImageGallery (for multiple images)
   - ColorPicker (for button/text colors in Offers)

3. **Layout Components:**
   - Dashboard
   - Collection List View
   - Item Detail/Edit View
   - Create New Item Form

---

## 📝 Key Findings

### All Collections Have:
- `name` field (PlainText, required, max 256 chars)
- `slug` field (PlainText, required, max 256 chars, alphanumeric only)

### Most Collections Have:
- `active` or `archived` Switch field for visibility control
- Reference to Locations collection
- Multiple image fields
- Description fields (short and/or long)

### Validation Rules:
- Image dimensions are strictly enforced in some collections
- Number fields often have precision and negative value restrictions
- PlainText fields specify single-line vs multi-line
- Option fields have predefined choices with IDs

### Special Considerations:
- **Events:** Complex recurring event logic needs careful implementation
- **Offers:** Many color options for buttons and text
- **Locations:** Central to most other collections, implement first
- **Images:** Some have strict dimension requirements (500x1038, 500x675)

---

## 🚀 Next Steps

1. **Review Documentation:**
   - Read through PORTAL_SPECIFICATION.md for detailed technical requirements
   - Check DETAILED_FIELDS.md for complete field information

2. **Start Development:**
   - Create base CRUD API routes
   - Build dashboard page
   - Implement simple collections first (Menu Items, Buildings)
   - Add form components incrementally

3. **Testing:**
   - Test with Menu Items collection (simplest)
   - Verify all field types work correctly
   - Test relationships between collections

4. **Deployment:**
   - Add authentication layer
   - Implement error handling
   - Add loading states and notifications
   - Deploy to Cloudflare Workers

---

## 📚 Additional Resources

- **Webflow API Docs:** https://developers.webflow.com/data/reference
- **webflow-api SDK:** https://www.npmjs.com/package/webflow-api
- **Astro Docs:** https://docs.astro.build
- **shadcN UI:** https://ui.shadcn.com

---

## 🔐 Environment Variables

Required in `.env`:
```env
WEBFLOW_SITE_ID="6aaa2497c8ea366207beba30"
WEBFLOW_CMS_SITE_API_TOKEN="[your-token]"
WEBFLOW_API_HOST="[api-host]"
```

---

## ✅ Completion Checklist

- [x] Fetch all CMS collections
- [x] Document all fields and types
- [x] Identify relationships between collections
- [x] Create technical specification
- [x] Prioritize implementation phases
- [ ] Create base API routes
- [ ] Build dashboard UI
- [ ] Implement form components
- [ ] Add authentication
- [ ] Deploy portal

---

**Generated:** $(date)  
**Total Collections:** 9  
**Total Fields:** 154  
**Documentation Files:** 4
