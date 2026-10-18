
// Field layout configuration for form rendering
// Defines which fields should be grouped in rows vs full-width
//
// IMPORTANT: Field slugs below must match the real Webflow CMS field slugs
// (see cms-collections-documentation.json). getFieldRows() is defensive —
// any field not explicitly placed in COLLECTION_LAYOUTS will still render
// as its own full-width (or type-based) row, so a slug typo/mismatch here
// can never cause a field to silently disappear from the editor.

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
  'MultiImage': 'full',
};

// Collection-specific layout overrides
// Define rows of fields that should appear together
export const COLLECTION_LAYOUTS: Record<string, FieldRow[]> = {
  'room-types': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [
      { slug: 'full-name', layout: 'half' },
      { slug: 'short-name', layout: 'half' }
    ]},
    { fields: [{ slug: 'name-split-2', layout: 'full' }] },
    { fields: [
      { slug: 'property-location', layout: 'half' },
      { slug: 'building', layout: 'half' }
    ]},

    { fields: [{ slug: 'short-description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },
    { fields: [{ slug: 'benefits-statment', layout: 'full' }] },

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

    { fields: [{ slug: 'features-amenities', layout: 'full' }] },
    { fields: [{ slug: 'policies', layout: 'full' }] },

    { fields: [{ slug: 'hero-image', layout: 'full' }] },
    { fields: [
      { slug: 'feature-image-1', layout: 'half' },
      { slug: 'feature-image-2', layout: 'half' }
    ]},
    { fields: [{ slug: 'images', layout: 'full' }] },

    { fields: [{ slug: 'review', layout: 'full' }] },
    { fields: [
      { slug: 'review-source', layout: 'half' },
      { slug: 'review-date', layout: 'half' }
    ]},
    { fields: [{ slug: 'review-url', layout: 'full' }] },
    { fields: [{ slug: 'reviewer-name-or-handle', layout: 'full' }] },

    { fields: [
      { slug: 'mews-room-type-id', layout: 'half' },
      { slug: 'mews-image-ids', layout: 'half' }
    ]},

    { fields: [{ slug: 'active', layout: 'full' }] },
  ],

  'offers': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [{ slug: 'mews-rate-id', layout: 'full' }] },

    { fields: [{ slug: 'headline', layout: 'full' }] },
    { fields: [{ slug: 'eyebrow', layout: 'full' }] },
    { fields: [{ slug: 'description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },
    { fields: [{ slug: 'call-to-action', layout: 'full' }] },

    { fields: [
      { slug: 'full-card', layout: 'half' },
      { slug: 'compact-card', layout: 'half' }
    ]},
    { fields: [{ slug: 'horizontal-card', layout: 'full' }] },

    { fields: [{ slug: 'button-color', layout: 'full' }] },
    { fields: [{ slug: 'text-color', layout: 'full' }] },
    { fields: [{ slug: 'card-fill', layout: 'full' }] },
    { fields: [{ slug: 'accent-color-2', layout: 'full' }] },
    { fields: [{ slug: 'rate-font', layout: 'full' }] },
    { fields: [{ slug: 'border-options', layout: 'full' }] },
    { fields: [
      { slug: 'desktop-overlay-position', layout: 'half' },
      { slug: 'mobile-overlay-position', layout: 'half' }
    ]},
    { fields: [{ slug: 'default-card', layout: 'full' }] },

    { fields: [
      { slug: 'rate-starting-from', layout: 'half' },
      { slug: 'sort-order', layout: 'half' }
    ]},

    { fields: [
      { slug: 'cancellation-penalty-window', layout: 'half' },
      { slug: 'cancellation-penalty-window-period', layout: 'half' }
    ]},
    { fields: [
      { slug: 'cancellation-full-forfeit-window', layout: 'half' },
      { slug: 'cancellation-full-forfeit-window-period', layout: 'half' }
    ]},

    { fields: [
      { slug: 'active', layout: 'half' },
      { slug: 'member-only', layout: 'half' }
    ]},

    { fields: [{ slug: 'geo-fencing-active', layout: 'full' }] },
    { fields: [
      { slug: 'miles-from-center', layout: 'half' },
      { slug: 'postal-code', layout: 'half' }
    ]},
    { fields: [
      { slug: 'exclude-from-us', layout: 'half' },
      { slug: 'exclude-from-north-america', layout: 'half' }
    ]},

    { fields: [{ slug: 'international-fencing-active', layout: 'full' }] },
    { fields: [
      { slug: 'europe', layout: 'quarter' },
      { slug: 'asia', layout: 'quarter' },
      { slug: 'mexico', layout: 'quarter' },
      { slug: 'canada', layout: 'quarter' }
    ]},
  ],

  'events': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [{ slug: 'short-description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },

    { fields: [
      { slug: 'datetime', layout: 'half' },
      { slug: 'datetime-end', layout: 'half' }
    ]},

    { fields: [
      { slug: 'recurrence-type', layout: 'half' },
      { slug: 'repeat-every', layout: 'half' }
    ]},
    { fields: [{ slug: 'repeat-on', layout: 'full' }] },
    { fields: [
      { slug: 'recurring-start', layout: 'half' },
      { slug: 'recurring-end', layout: 'half' }
    ]},

    { fields: [{ slug: 'property-location', layout: 'full' }] },
    { fields: [
      { slug: 'onsite', layout: 'half' },
      { slug: 'offsite-event', layout: 'half' }
    ]},
    { fields: [{ slug: 'onsite-event-location', layout: 'full' }] },
    { fields: [{ slug: 'onsite-custom-location', layout: 'full' }] },
    { fields: [{ slug: 'offsite-event-location', layout: 'full' }] },

    { fields: [{ slug: 'image', layout: 'full' }] },
    { fields: [{ slug: 'image-long', layout: 'full' }] },

    { fields: [
      { slug: 'adults-only-21', layout: 'half' },
      { slug: 'read-more', layout: 'half' }
    ]},
  ],

  'locations': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [
      { slug: 'full-location-name', layout: 'half' },
      { slug: 'short-location-name', layout: 'half' }
    ]},

    { fields: [{ slug: 'street-address-line-1', layout: 'full' }] },
    { fields: [{ slug: 'street-address-line-2', layout: 'full' }] },
    { fields: [
      { slug: 'city', layout: 'half' },
      { slug: 'state', layout: 'half' }
    ]},
    { fields: [{ slug: 'postal-code', layout: 'half' }] },

    { fields: [
      { slug: 'primary-phone', layout: 'half' },
      { slug: 'front-desk-operations-emails', layout: 'half' }
    ]},
    { fields: [
      { slug: 'reservations-email', layout: 'half' },
      { slug: 'sales-email', layout: 'half' }
    ]},
    { fields: [{ slug: 'general-email', layout: 'half' }] },
    { fields: [{ slug: 'website', layout: 'full' }] },

    { fields: [
      { slug: 'instagram', layout: 'half' },
      { slug: 'instagram-handle', layout: 'half' }
    ]},
    { fields: [{ slug: 'facebook', layout: 'full' }] },
    { fields: [{ slug: 'trip-advisor', layout: 'full' }] },
    { fields: [{ slug: 'google-maps-link', layout: 'full' }] },
    { fields: [{ slug: 'privacy-policy', layout: 'full' }] },
    { fields: [{ slug: 'terms-conditions', layout: 'full' }] },
    { fields: [{ slug: 'accessibility', layout: 'full' }] },

    { fields: [{ slug: 'short-description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },
    { fields: [{ slug: 'location-details', layout: 'full' }] },

    { fields: [{ slug: 'hero-image', layout: 'full' }] },
  ],

  'outlets': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [
      { slug: 'outlet-name', layout: 'half' },
      { slug: 'outlet-short-name', layout: 'half' }
    ]},
    { fields: [
      { slug: 'outlet-type', layout: 'half' },
      { slug: 'location', layout: 'half' }
    ]},

    { fields: [{ slug: 'street-address-line-1', layout: 'full' }] },
    { fields: [{ slug: 'street-address-line-2', layout: 'full' }] },
    { fields: [
      { slug: 'city', layout: 'half' },
      { slug: 'state', layout: 'half' }
    ]},
    { fields: [{ slug: 'postal-code', layout: 'half' }] },

    { fields: [{ slug: 'short-description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },

    { fields: [{ slug: 'hours-of-operation', layout: 'full' }] },

    { fields: [
      { slug: 'main-phone', layout: 'half' },
      { slug: 'email-address', layout: 'half' }
    ]},
    { fields: [{ slug: 'website', layout: 'full' }] },
    { fields: [
      { slug: 'instrgram', layout: 'half' },
      { slug: 'facebook', layout: 'half' }
    ]},
    { fields: [{ slug: 'yelp', layout: 'full' }] },
    { fields: [{ slug: 'reservations-url', layout: 'full' }] },
    { fields: [{ slug: 'google-maps-link', layout: 'full' }] },

    { fields: [{ slug: 'hero-image', layout: 'full' }] },
    { fields: [{ slug: 'logo', layout: 'full' }] },
    { fields: [{ slug: 'multi-images', layout: 'full' }] },
  ],

  'amenities': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [
      { slug: 'full-name', layout: 'half' },
      { slug: 'short-name', layout: 'half' }
    ]},

    { fields: [{ slug: 'marketing-headline', layout: 'full' }] },
    { fields: [{ slug: 'marketing-subheadline', layout: 'full' }] },
    { fields: [{ slug: 'short-description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },
    { fields: [{ slug: 'key-benefit-or-selling-point-headline', layout: 'full' }] },
    { fields: [{ slug: 'key-benefit-or-selling-point-description', layout: 'full' }] },

    { fields: [{ slug: 'image', layout: 'full' }] },
    { fields: [{ slug: 'icon-svg', layout: 'full' }] },

    { fields: [
      { slug: 'type', layout: 'half' },
      { slug: 'category', layout: 'half' }
    ]},
    { fields: [{ slug: 'location', layout: 'full' }] },
    { fields: [{ slug: 'active', layout: 'full' }] },
  ],

  'buildings': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [{ slug: 'location', layout: 'full' }] },

    { fields: [{ slug: 'subheadline', layout: 'full' }] },
    { fields: [{ slug: 'short-description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },
    { fields: [{ slug: 'feature-benefits', layout: 'full' }] },

    { fields: [{ slug: 'exterior-building-image', layout: 'full' }] },
    { fields: [{ slug: 'multi-image', layout: 'full' }] },
    { fields: [{ slug: 'svg-icon', layout: 'full' }] },

    { fields: [{ slug: 'sort', layout: 'half' }] },
    { fields: [{ slug: 'policy-2', layout: 'full' }] },
  ],

  'instagram': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [{ slug: 'instagram-username', layout: 'full' }] },

    { fields: [
      { slug: 'media-type', layout: 'half' },
      { slug: 'sort', layout: 'half' }
    ]},
    { fields: [{ slug: 'caption', layout: 'full' }] },
    { fields: [{ slug: 'caption-rich-text', layout: 'full' }] },
    { fields: [{ slug: 'instagram-url', layout: 'full' }] },
    { fields: [{ slug: 'image', layout: 'full' }] },
    { fields: [{ slug: 'image-url', layout: 'full' }] },
    { fields: [{ slug: 'shortcode', layout: 'full' }] },
  ],

  'add-ons': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [{ slug: 'item-name', layout: 'full' }] },

    { fields: [{ slug: 'short-description', layout: 'full' }] },
    { fields: [{ slug: 'long-description', layout: 'full' }] },

    { fields: [{ slug: 'image', layout: 'full' }] },

    { fields: [
      { slug: 'mews-product-id', layout: 'half' },
      { slug: 'sort', layout: 'half' }
    ]},
  ],

  'menu-items': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
  ],

  'photo-hotspots': [
    { fields: [{ slug: 'name', layout: 'full' }] },
    { fields: [{ slug: 'slug', layout: 'full' }] },
    { fields: [{ slug: 'amenity', layout: 'full' }] },

    { fields: [{ slug: 'photo-url', layout: 'full' }] },
    { fields: [{ slug: 'photo-file-id', layout: 'full' }] },

    { fields: [
      { slug: 'x-percent', layout: 'half' },
      { slug: 'y-percent', layout: 'half' }
    ]},

    { fields: [
      { slug: 'display-order', layout: 'half' },
      { slug: 'active', layout: 'half' }
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

// Get all rows for a collection with their fields.
//
// This is intentionally defensive: if COLLECTION_LAYOUTS references a slug
// that doesn't exist on the live collection (a typo, or the schema changed
// in Webflow), that config entry is simply skipped — it does NOT cause real
// fields to be dropped. Any field present in `fields` that isn't explicitly
// placed by COLLECTION_LAYOUTS is still appended as its own row, so every
// field is guaranteed to render somewhere in the form.
export function getFieldRows(collectionSlug: string, fields: any[]): FieldRow[] {
  const collectionLayout = COLLECTION_LAYOUTS[collectionSlug];
  const fieldSlugs = new Set(fields.map(f => f.slug));

  const rows: FieldRow[] = [];
  const placedSlugs = new Set<string>();

  if (collectionLayout) {
    for (const row of collectionLayout) {
      const rowFields = row.fields.filter(f => fieldSlugs.has(f.slug));
      if (rowFields.length > 0) {
        rows.push({ fields: rowFields });
        rowFields.forEach(f => placedSlugs.add(f.slug));
      }
    }
  }

  // Append any fields not covered by the explicit layout (new/unmapped
  // fields) as their own full-width (or type-based) rows, in schema order.
  for (const field of fields) {
    if (!placedSlugs.has(field.slug)) {
      rows.push({
        fields: [{
          slug: field.slug,
          layout: FIELD_TYPE_LAYOUTS[field.type] || 'full'
        }]
      });
    }
  }

  return rows;
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


