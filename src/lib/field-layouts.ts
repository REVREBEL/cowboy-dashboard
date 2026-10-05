

// Field layout configuration for form rendering
// Defines which fields should be grouped in rows vs full-width

export type FieldLayout = 'full' | 'half' | 'third' | 'quarter';

export interface FieldLayoutConfig {
  slug: string;
  layout: FieldLayout;
}

export interface FieldRow {
  fields: FieldLayoutConfig[];
}

// Layout rules by field type - these are defaults that can be overridden
export const FIELD_TYPE_LAYOUTS: Record<string, FieldLayout> = {
  'PlainText': 'full',
  'Email': 'half',
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

// Collection-specific layout overrides
// Define rows of fields that should appear together
export const COLLECTION_LAYOUTS: Record<string, FieldRow[]> = {
  'room-types': [
    // Basic Information - all full width
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [{ slug: 'full-name', layout: 'full' }] },
    { fields: [{ slug: 'short-name', layout: 'full' }] },
    { fields: [{ slug: 'property-location', layout: 'full' }] },
    { fields: [{ slug: 'building', layout: 'full' }] },
    
    // Description - all full width
    { fields: [{ slug: 'short-description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },
    { fields: [{ slug: 'benefits-statment', layout: 'full' }] },
    
    // Details - compact fields in rows
    { fields: [
      { slug: 'square-feet', layout: 'half' },
      { slug: 'bed-type', layout: 'half' }
    ]},
    { fields: [
      { slug: 'number-of-bedrooms', layout: 'half' },
      { slug: 'number-of-beds', layout: 'half' }
    ]},
    { fields: [
      { slug: 'number-of-units', layout: 'third' },
      { slug: 'room', layout: 'third' },
      { slug: 'suite', layout: 'third' }
    ]},
    { fields: [
      { slug: 'component-room', layout: 'half' },
      { slug: 'sort', layout: 'half' }
    ]},
    
    // Amenities & Policies - full width
    { fields: [{ slug: 'features-amenities', layout: 'full' }] },
    { fields: [{ slug: 'policies', layout: 'full' }] },
    
    // Images - full width
    { fields: [{ slug: 'images', layout: 'full' }] },
  ],
  
  'offers': [
    // Basic Information
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [{ slug: 'mews-rate-id', layout: 'full' }] },
    
    // Descriptions
    { fields: [{ slug: 'headline', layout: 'full' }] },
    { fields: [{ slug: 'eyebrow', layout: 'full' }] },
    { fields: [{ slug: 'description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },
    { fields: [{ slug: 'call-to-action', layout: 'full' }] },
    
    // Card Images - side by side
    { fields: [
      { slug: 'full-card', layout: 'half' },
      { slug: 'compact-card', layout: 'half' }
    ]},
    
    // Styling - each color on its own row for proper display
    { fields: [{ slug: 'button-color', layout: 'full' }] },
    { fields: [{ slug: 'text-color', layout: 'full' }] },
    { fields: [{ slug: 'card-fill', layout: 'full' }] },
    { fields: [{ slug: 'rate-font', layout: 'full' }] },
    
    // Pricing
    { fields: [{ slug: 'rate-starting-from', layout: 'half' }] },
    
    // Cancellation Policy
    { fields: [
      { slug: 'cancellation-penalty-window', layout: 'half' },
      { slug: 'cancellation-penalty-window-period', layout: 'half' }
    ]},
    
    // Location & Visibility
    { fields: [
      { slug: 'active', layout: 'half' },
      { slug: 'member-only', layout: 'half' }
    ]},
    
    // Domestic Geo-Fencing
    { fields: [{ slug: 'geo-fencing-active', layout: 'full' }] },
    { fields: [
      { slug: 'miles-from-center', layout: 'half' },
      { slug: 'postal-code', layout: 'half' }
    ]},
    { fields: [
      { slug: 'exclude-from-us', layout: 'half' },
      { slug: 'exclude-from-north-america', layout: 'half' }
    ]},
    
    // International Geo-Fencing
    { fields: [{ slug: 'international-fencing-active', layout: 'full' }] },
    { fields: [
      { slug: 'europe', layout: 'quarter' },
      { slug: 'asia', layout: 'quarter' },
      { slug: 'mexico', layout: 'quarter' },
      { slug: 'canada', layout: 'quarter' }
    ]},
  ],
  
  'events': [
    // Basic Information
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [{ slug: 'short-description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },
    
    // Date & Time
    { fields: [
      { slug: 'datetime', layout: 'half' },
      { slug: 'datetime-end', layout: 'half' }
    ]},
    
    // Recurrence
    { fields: [
      { slug: 'recurrence-type', layout: 'half' },
      { slug: 'repeat-every', layout: 'half' }
    ]},
    { fields: [{ slug: 'repeat-on', layout: 'full' }] },
    { fields: [
      { slug: 'recurring-start', layout: 'half' },
      { slug: 'recurring-end', layout: 'half' }
    ]},
    
    // Location
    { fields: [{ slug: 'property-location', layout: 'full' }] },
    { fields: [
      { slug: 'onsite', layout: 'half' },
      { slug: 'offsite-event', layout: 'half' }
    ]},
    { fields: [{ slug: 'onsite-event-location', layout: 'full' }] },
    { fields: [{ slug: 'onsite-custom-location', layout: 'full' }] },
    { fields: [{ slug: 'offsite-event-location', layout: 'full' }] },
    
    // Images
    { fields: [{ slug: 'image', layout: 'full' }] },
    { fields: [{ slug: 'image-long', layout: 'full' }] },
    
    // Additional Details
    { fields: [
      { slug: 'adults-only-21', layout: 'half' },
      { slug: 'read-more', layout: 'half' }
    ]},
  ],
  
  'locations': [
    // Basic Information
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [
      { slug: 'property-name', layout: 'half' },
      { slug: 'property-code', layout: 'half' }
    ]},
    
    // Address
    { fields: [{ slug: 'address-line-1', layout: 'full' }] },
    { fields: [{ slug: 'address-line-2', layout: 'full' }] },
    { fields: [
      { slug: 'city', layout: 'half' },
      { slug: 'state', layout: 'half' }
    ]},
    { fields: [
      { slug: 'zip-code', layout: 'half' },
      { slug: 'country', layout: 'half' }
    ]},
    
    // Contact
    { fields: [
      { slug: 'phone', layout: 'half' },
      { slug: 'email', layout: 'half' }
    ]},
    { fields: [{ slug: 'website', layout: 'full' }] },
    
    // Media
    { fields: [{ slug: 'logo', layout: 'full' }] },
    { fields: [{ slug: 'hero-image', layout: 'full' }] },
    { fields: [{ slug: 'gallery', layout: 'full' }] },
    
    // Settings
    { fields: [{ slug: 'timezone', layout: 'full' }] },
    { fields: [
      { slug: 'active', layout: 'third' },
      { slug: 'featured', layout: 'third' },
      { slug: 'display-order', layout: 'third' }
    ]},
  ],
};

// Get layout for a specific field in a collection
export function getFieldLayout(collectionSlug: string, fieldSlug: string, fieldType: string): FieldLayout {
  const collectionLayout = COLLECTION_LAYOUTS[collectionSlug];
  
  if (collectionLayout) {
    // Find the field in the collection layout
    for (const row of collectionLayout) {
      const fieldConfig = row.fields.find(f => f.slug === fieldSlug);
      if (fieldConfig) {
        return fieldConfig.layout;
      }
    }
  }
  
  // Fall back to type-based layout
  return FIELD_TYPE_LAYOUTS[fieldType] || 'full';
}

// Get all rows for a collection with their fields
export function getFieldRows(collectionSlug: string, fields: any[]): FieldRow[] {
  const collectionLayout = COLLECTION_LAYOUTS[collectionSlug];
  
  if (!collectionLayout) {
    // No custom layout - return each field as its own row with type-based layout
    return fields.map(field => ({
      fields: [{ 
        slug: field.slug, 
        layout: FIELD_TYPE_LAYOUTS[field.type] || 'full' 
      }]
    }));
  }
  
  // Filter to only include fields that exist in the actual field list
  const fieldSlugs = new Set(fields.map(f => f.slug));
  
  return collectionLayout
    .map(row => ({
      fields: row.fields.filter(f => fieldSlugs.has(f.slug))
    }))
    .filter(row => row.fields.length > 0);
}

// Get CSS grid classes for a layout
export function getLayoutClasses(layout: FieldLayout): string {
  switch (layout) {
    case 'full':
      return 'col-span-12';
    case 'half':
      return 'col-span-12 sm:col-span-6';
    case 'third':
      return 'col-span-12 sm:col-span-4';
    case 'quarter':
      return 'col-span-12 sm:col-span-3';
    default:
      return 'col-span-12';
  }
}


