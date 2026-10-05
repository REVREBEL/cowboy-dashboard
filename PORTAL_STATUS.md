


# CMS Portal Development Status

## Current State (Latest Session)

### What's Working ✅
1. **Portal Home** (`/portal`) - Lists all 9 CMS collections organized by complexity
2. **Collection List Pages** (`/portal/[slug]`) - Shows all items in a collection with edit links
3. **Item Editor Pages** (`/portal/[slug]/[itemId]`) - Form-based editor for individual items
4. **Reference Fields** - Now displaying human-readable names instead of IDs! 🎉
5. **API Endpoints**:
   - `GET /api/cms/[collectionId]` - List items in a collection
   - `GET /api/cms/[collectionId]/[itemId]` - Get single item
   - `PUT /api/cms/[collectionId]/[itemId]` - Update item
   - `GET /api/cms/reference/[itemId]?collectionId=X` - Get referenced item name

### Recent Fix ✅
**Problem**: Reference fields showing IDs instead of names (e.g., "6abc9142d98b325b2821ca23" instead of "Catskills")

**Root Cause**: Using incorrect field type names
- ❌ Was checking for: `'ItemRef'` and `'ItemRefSet'`
- ✅ Should be: `'Reference'` and `'MultiReference'`

**Solution**: Updated ItemEditor.tsx to use correct Webflow API field types:
- Changed all `'ItemRef'` → `'Reference'`
- Changed all `'ItemRefSet'` → `'MultiReference'`
- Changed `'Bool'` → `'Switch'`
- Changed `'ImageRef'` → `'Image'`

**Verified Field Types** (from `webflow-api` package):
```typescript
type FieldType = 
  | "Color" 
  | "DateTime" 
  | "Email" 
  | "ExtFileRef" 
  | "File" 
  | "Image" 
  | "Link" 
  | "MultiImage" 
  | "MultiReference" 
  | "Number" 
  | "Option" 
  | "Phone" 
  | "PlainText" 
  | "Reference" 
  | "RichText" 
  | "Switch" 
  | "VideoLink"
```

### Current Issue 🔴
**Reference fields showing IDs instead of names**

**Problem**: In the ItemEditor, reference fields like `property-location` and `onsite-event-location` display the raw ID (e.g., "6abc9142d98b325b2821ca23") instead of the human-readable name (e.g., "Catskills").

**What We Know**:
- The API endpoint `/api/cms/reference/[itemId]?collectionId=X` works correctly
- Test: `curl "http://localhost:3000/api/cms/reference/6abc9142d98b325b2821ca23?collectionId=6abc812fd98b325b281d6301"` returns `"Catskills"`
- The ItemEditor component has a `useEffect` hook to load reference names
- There's a hardcoded mapping `REFERENCE_COLLECTIONS` in ItemEditor.tsx
- The component state `referenceNames` should store the loaded names
- The `renderField` function should display `referenceNames[field.slug]` instead of the raw ID

**What to Check Next**:
1. Open browser console and look for logs from ItemEditor
2. Check if the `useEffect` is actually running
3. Check if fetch requests are being made to `/api/cms/reference/...`
4. Check if there are any CORS or network errors
5. Verify the `referenceNames` state is being updated
6. Check if the component is re-rendering after state update

**Reference Collection Mappings**:
```typescript
const REFERENCE_COLLECTIONS: Record<string, string> = {
  'property-location': '6abc812fd98b325b281d6301', // Locations
  'onsite-event-location': '6abc819c43b4b395a2b80752', // Buildings
  'location': '6abc812fd98b325b281d6301', // Locations
  'amenities': '6abc819c43b4b395a2b80753', // Amenities
};
```

### Key Files Modified
- `src/components/ItemEditor.tsx` - Main editor component with reference loading logic
- `src/pages/api/cms/reference/[itemId].ts` - API endpoint for fetching reference items
- `src/pages/portal/[slug]/[itemId].astro` - Item editor page
- `src/pages/portal/[slug].astro` - Collection list page
- `src/pages/portal/index.astro` - Portal home page
- `src/lib/collections-config.ts` - Static collection configuration

### Environment Variables
```
WEBFLOW_CMS_SITE_API_TOKEN=<user's token>
WEBFLOW_SITE_ID=6abc810fd801e90511049adb
```

**Important**: Only use `WEBFLOW_CMS_SITE_API_TOKEN` - no fallbacks to auto-generated tokens.

### Design Principles Applied
- **Minimalist UI**: No gradients, glassmorphism, or excessive rounded corners
- **Clean, functional interface**: Table-style layouts, simple forms
- **Typography**: Using Webflow design system fonts (Desertrain for headings, Uchen for body, Brothers for buttons)
- **Colors**: Using CSS variables from `generated/webflow.css`

### Collections (9 Total)
1. **Menu Items** (2 fields) - Simplest
2. **Amenities** (16 fields)
3. **Locations** (22 fields) - Central hub
4. **Buildings** (8 fields)
5. **Instagrams** (11 fields)
6. **Outlets** (24 fields)
7. **Room Types** (21 fields)
8. **Offers** (29 fields) - Most fields
9. **Events** (21 fields) - Most complex (recurring logic)

### Field Types Supported
- ✅ PlainText (single & multi-line)
- ✅ RichText (textarea)
- ✅ Number
- ✅ DateTime (datetime-local input)
- ✅ Switch (boolean toggle)
- ✅ Option (button group selector)
- ✅ Reference (displays name, read-only)
- ✅ Image (displays image, read-only)
- ✅ Link (URL input)
- ✅ Color (color picker + hex input)
- ✅ Email (text input)
- ✅ Phone (text input)
- ⚠️ MultiReference - Displays ID, needs nested collection list UI
- ⚠️ MultiImage - Not yet implemented
- ⚠️ File - Not yet implemented
- ⚠️ VideoLink - Not yet implemented
- ⚠️ ExtFileRef - Not yet implemented

### Next Steps (Priority Order)
1. ✅ ~~Fix reference field display~~ - COMPLETED!
2. **Implement MultiReference display** - Show list of referenced items
3. **Make fields editable** - Currently most are read-only
4. **Add save functionality** - Wire up PATCH endpoint
5. **Implement MultiImage field** - Display gallery, upload support
6. **Implement File field** - File upload/download
7. **Implement VideoLink field** - Video embed preview
8. **Add validation and error handling**
9. **Add success/error notifications** (already partially done)
10. **Implement recurring event logic** for Events collection
11. **Add filtering and search** to collection lists
12. **Add pagination** for large collections
13. **Add image upload** functionality
14. **Add reference field selector** (dropdown to change references)

### Technical Notes
- Using Astro 5.13.5 with Cloudflare Workers adapter
- React 19.1.1 for interactive components
- TailwindCSS 4.1.11 for styling
- shadcn/ui components pre-installed
- WebflowClient from `webflow-api` package (v3.2.0)
- All API calls use `WEBFLOW_CMS_SITE_API_TOKEN` from env
- Base URL handling via `src/lib/base-url.ts` for Cloudflare deployment

### Known Limitations
- Cannot access draft/staged items (only published/live)
- API token must have `cms:read` and `cms:write` scopes
- No `sites:read` scope available (using static config instead)
- Reference fields are read-only in the editor
- No image upload functionality yet
- No user authentication/authorization

### Documentation Files
- `CMS_DOCUMENTATION_SUMMARY.md` - Executive summary
- `PORTAL_SPECIFICATION.md` - Technical specification
- `CMS_COLLECTIONS_DOCUMENTATION.md` - Detailed field descriptions
- `DETAILED_FIELDS.md` - Field-by-field breakdown
- `COLLECTION_RELATIONSHIPS.md` - Visual relationship diagrams
- `cms-collections-documentation.json` - Raw API data
- `PORTAL_STATUS.md` - This file (current status)

---

## Debugging Reference Field Issue

### Code Location
File: `src/components/ItemEditor.tsx`

### Current Implementation
```typescript
// Around line 15-60
const [referenceNames, setReferenceNames] = useState<Record<string, string>>({});

const REFERENCE_COLLECTIONS: Record<string, string> = {
  'property-location': '6abc812fd98b325b281d6301',
  'onsite-event-location': '6abc819c43b4b395a2b80752',
  'location': '6abc812fd98b325b281d6301',
  'amenities': '6abc819c43b4b395a2b80753',
};

useEffect(() => {
  const loadReferenceNames = async () => {
    const refFields = fields.filter(f => f.type === 'Reference' || f.type === 'MultiReference');
    console.log('Reference fields found:', refFields.length);
    
    for (const field of refFields) {
      const refId = formData[field.slug];
      if (refId && typeof refId === 'string') {
        console.log(`Loading reference for ${field.slug}:`, refId);
        
        const refCollectionId = REFERENCE_COLLECTIONS[field.slug];
        
        if (refCollectionId) {
          try {
            const response = await fetch(`${baseUrl}/api/cms/reference/${refId}?collectionId=${refCollectionId}`);
            if (response.ok) {
              const data = await response.json();
              setReferenceNames(prev => ({
                ...prev,
                [field.slug]: data.fieldData?.name || 'Unknown'
              }));
              console.log(`Loaded name for ${field.slug}:`, data.fieldData?.name);
            }
          } catch (error) {
            console.error(`Error loading reference ${field.slug}:`, error);
          }
        }
      }
    }
  };

  loadReferenceNames();
}, [fields, formData]);

// Render function (around line 200-210)
case 'Reference':
case 'MultiReference':
  const refValue = formData[field.slug];
  const displayName = referenceNames[field.slug] || refValue || 'Not set';
  return (
    <div className="space-y-2">
      <Input
        value={displayName}
        disabled
        className="bg-muted"
      />
      <p className="text-xs text-muted-foreground">
        Reference fields are read-only. ID: {refValue || 'none'}
      </p>
    </div>
  );
```

### What Should Happen
1. Component mounts with `fields` and `fieldData` props
2. `useEffect` runs and filters for reference fields
3. For each reference field, it extracts the ID from `formData`
4. It looks up the collection ID from `REFERENCE_COLLECTIONS`
5. It fetches the referenced item from `/api/cms/reference/[id]?collectionId=X`
6. It updates `referenceNames` state with the name
7. Component re-renders and displays the name instead of ID

### Possible Issues
- `useEffect` not running (check console logs)
- Fetch failing silently (check network tab)
- State not updating (React issue)
- Component not re-rendering after state update
- `baseUrl` import missing or incorrect
- Field type not matching ('ItemRef' vs something else)

### Quick Fix to Try
Add more aggressive logging and force re-render:
```typescript
console.log('referenceNames state:', referenceNames);
console.log('Rendering field:', field.slug, 'with value:', formData[field.slug]);
```

Or simplify by fetching inline during render (not recommended but for debugging):
```typescript
// In the render section, before the switch statement
if (field.type === 'ItemRef') {
  console.log('Rendering ItemRef field:', field.slug);
  console.log('Current referenceNames:', referenceNames);
  console.log('Looking for:', field.slug, 'in referenceNames');
}
```



