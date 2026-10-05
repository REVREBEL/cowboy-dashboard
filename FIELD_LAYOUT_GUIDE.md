# Field Layout Configuration Guide

This guide explains how to configure field layouts in the CMS portal to control how fields are displayed in the editor forms.

## Overview

The field layout system allows you to:
- **Group fields in rows** (e.g., put "Square Feet" and "Bed Type" side-by-side)
- **Control field widths** (full, half, third, quarter)
- **Maintain consistent layouts** across collections
- **Easily add new fields** without breaking existing layouts

## How It Works

### 1. Default Layouts by Field Type

Every field type has a default layout defined in `src/lib/field-layouts.ts`:

```typescript
export const FIELD_TYPE_LAYOUTS: Record<string, FieldLayout> = {
  'PlainText': 'full',      // Full width by default
  'Email': 'half',          // Half width (2 per row)
  'Phone': 'half',
  'Number': 'half',
  'DateTime': 'half',
  'Bool': 'full',
  'Switch': 'full',
  'RichText': 'full',
  'Link': 'full',
  'Color': 'half',
  'Option': 'full',
  'Reference': 'full',
  'MultiReference': 'full',
  'Image': 'full',
};
```

**If you don't specify a custom layout, fields will use these defaults.**

### 2. Custom Layouts per Collection

For collections that need specific layouts, define them in `COLLECTION_LAYOUTS`:

```typescript
export const COLLECTION_LAYOUTS: Record<string, FieldRow[]> = {
  'room-types': [
    // Single field = full width
    { fields: [{ slug: 'name', layout: 'full' }] },
    
    // Two fields = half width each (side-by-side)
    { fields: [
      { slug: 'square-feet', layout: 'half' },
      { slug: 'bed-type', layout: 'half' }
    ]},
    
    // Three fields = third width each
    { fields: [
      { slug: 'number-of-units', layout: 'third' },
      { slug: 'room', layout: 'third' },
      { slug: 'suite', layout: 'third' }
    ]},
  ],
};
```

## Layout Options

| Layout | Width | Fields per Row | Use Case |
|--------|-------|----------------|----------|
| `full` | 100% | 1 | Long text, descriptions, images |
| `half` | 50% | 2 | Dates, numbers, short inputs |
| `third` | 33% | 3 | Toggles, small numbers, status |
| `quarter` | 25% | 4 | Very compact fields (rarely used) |

## Adding New Fields

### Scenario 1: New Field Uses Default Layout

If you add a new field and it should use the default layout for its type, **you don't need to do anything**. The system will automatically apply the default.

**Example:**
- Add a new `Number` field called `max-guests`
- It will automatically be `half` width (default for Number fields)

### Scenario 2: New Field Needs Custom Layout

If you want to customize the layout:

1. Open `src/lib/field-layouts.ts`
2. Find your collection in `COLLECTION_LAYOUTS`
3. Add the field in the desired position with the desired layout

**Example:** Add `max-guests` next to `number-of-units`:

```typescript
'room-types': [
  // ... existing fields ...
  
  { fields: [
    { slug: 'number-of-units', layout: 'half' },
    { slug: 'max-guests', layout: 'half' }  // ← Add here
  ]},
  
  // ... rest of fields ...
]
```

### Scenario 3: Reorder Fields

Fields are displayed in the order they appear in `COLLECTION_LAYOUTS`. To reorder:

1. Cut the field configuration
2. Paste it in the new position

**Example:** Move `sort` to appear earlier:

```typescript
'room-types': [
  { fields: [{ slug: 'name', layout: 'full' }] },
  { fields: [{ slug: 'sort', layout: 'half' }] },  // ← Moved up
  { fields: [{ slug: 'slug', layout: 'full' }] },
  // ... rest ...
]
```

## Best Practices

### 1. Group Related Fields

Put related fields in the same row:

```typescript
// ✅ Good - related fields together
{ fields: [
  { slug: 'start-date', layout: 'half' },
  { slug: 'end-date', layout: 'half' }
]},

// ❌ Avoid - unrelated fields together
{ fields: [
  { slug: 'start-date', layout: 'half' },
  { slug: 'active', layout: 'half' }
]},
```

### 2. Use Appropriate Widths

- **Full width** for:
  - Long text fields
  - Rich text editors
  - Image uploads
  - Multi-select references
  
- **Half width** for:
  - Dates and times
  - Numbers
  - Short text inputs
  - Single references
  
- **Third width** for:
  - Boolean toggles
  - Status indicators
  - Small numbers (sort order, counts)

### 3. Maintain Visual Balance

Avoid mixing very different field types in the same row:

```typescript
// ✅ Good - similar field types
{ fields: [
  { slug: 'active', layout: 'third' },
  { slug: 'featured', layout: 'third' },
  { slug: 'sort', layout: 'third' }
]},

// ❌ Avoid - very different heights
{ fields: [
  { slug: 'description', layout: 'half' },  // Tall textarea
  { slug: 'active', layout: 'half' }        // Short toggle
]},
```

### 4. Mobile Responsiveness

All layouts automatically stack on mobile. The grid classes handle this:

```typescript
'half': 'col-span-12 sm:col-span-6',   // Full width on mobile, half on desktop
'third': 'col-span-12 sm:col-span-4',  // Full width on mobile, third on desktop
```

## Complete Example

Here's a complete layout for a hypothetical "Products" collection:

```typescript
'products': [
  // Basic info - full width
  { fields: [{ slug: 'name', layout: 'full' }] },
  { fields: [{ slug: 'slug', layout: 'full' }] },
  { fields: [{ slug: 'description', layout: 'full' }] },
  
  // Pricing - side by side
  { fields: [
    { slug: 'price', layout: 'half' },
    { slug: 'sale-price', layout: 'half' }
  ]},
  
  // Inventory - three columns
  { fields: [
    { slug: 'sku', layout: 'third' },
    { slug: 'stock', layout: 'third' },
    { slug: 'weight', layout: 'third' }
  ]},
  
  // Category - full width
  { fields: [{ slug: 'category', layout: 'full' }] },
  
  // Images - full width
  { fields: [{ slug: 'images', layout: 'full' }] },
  
  // Status toggles - three columns
  { fields: [
    { slug: 'active', layout: 'third' },
    { slug: 'featured', layout: 'third' },
    { slug: 'on-sale', layout: 'third' }
  ]},
],
```

## Troubleshooting

### Field Not Showing Up

**Problem:** Added a field to the layout but it's not appearing.

**Solution:** Make sure the field slug matches exactly (case-sensitive):
```typescript
// ❌ Wrong
{ slug: 'squareFeet', layout: 'half' }

// ✅ Correct
{ slug: 'square-feet', layout: 'half' }
```

### Fields in Wrong Order

**Problem:** Fields appear in a different order than expected.

**Solution:** The order in `COLLECTION_LAYOUTS` determines display order. Check that your field is in the right position in the array.

### Layout Not Applied

**Problem:** Field is showing full width when it should be half.

**Solution:** 
1. Check that the collection slug is correct in `COLLECTION_LAYOUTS`
2. Verify the field slug is spelled correctly
3. Make sure you're editing the right collection

## Summary

**To add a new field:**
1. If default layout is fine → Do nothing
2. If custom layout needed → Add to `COLLECTION_LAYOUTS` in `src/lib/field-layouts.ts`

**To change field order:**
- Reorder entries in `COLLECTION_LAYOUTS`

**To change field width:**
- Update the `layout` property (`'full'`, `'half'`, `'third'`, `'quarter'`)

**To group fields in a row:**
- Put multiple fields in the same `{ fields: [...] }` array
