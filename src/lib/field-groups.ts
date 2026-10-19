



// Field group mappings for organizing CMS fields into sections
// Field slugs below are sourced directly from the live Webflow collection
// schemas (see cms-collections-documentation.json) — keep these in sync if
// fields are added/renamed in Webflow, otherwise fields will silently fall
// into the "Other Fields" catch-all group.

export interface FieldGroup {
  name: string;
  description?: string;
  fields: string[];
}

export const FIELD_GROUPS: Record<string, FieldGroup[]> = {
  'offers': [
    {
      name: 'Basic Information',
      description: 'Core details that identify this offer in the system.',
      fields: ['name', 'slug', 'mews-rate-id']
    },
    {
      name: 'Descriptions',
      description: 'Marketing copy and messaging for this offer.',
      fields: ['headline', 'eyebrow', 'description', 'long-description', 'call-to-action']
    },
    {
      name: 'Card Images',
      description: 'Visual assets for displaying this offer in different layouts.',
      fields: ['full-card', 'compact-card', 'horizontal-card']
    },
    {
      name: 'Styling',
      description: 'Visual customization options for how this offer appears.',
      fields: [
        'button-color',
        'text-color',
        'card-fill',
        'rate-font',
        'border-options',
        'accent-color-2',
        'desktop-overlay-position',
        'mobile-overlay-position',
        'default-card'
      ]
    },
    {
      name: 'Pricing',
      description: 'Rate information and ordering for this offer.',
      fields: ['rate-starting-from', 'sort-order']
    },
    {
      name: 'Cancellation Policy',
      description: 'Rules for when guests can cancel without penalty.',
      fields: [
        'cancellation-penalty-window',
        'cancellation-penalty-window-period',
        'cancellation-full-forfeit-window',
        'cancellation-full-forfeit-window-period'
      ]
    },
    {
      name: 'Visibility',
      description: 'Control who can see this offer and when it appears.',
      fields: ['active', 'member-only']
    },
    {
      name: 'Domestic Geo-Fencing',
      description: 'Restrict this offer to guests within specific US locations.',
      fields: [
        'geo-fencing-active',
        'miles-from-center',
        'postal-code',
        'exclude-from-us',
        'exclude-from-north-america'
      ]
    },
    {
      name: 'International Geo-Fencing',
      description: 'Control which international regions can see this offer.',
      fields: [
        'international-fencing-active',
        'europe',
        'asia',
        'mexico',
        'canada'
      ]
    }
  ],
  'events': [
    {
      name: 'Basic Information',
      description: 'Essential details about this event.',
      fields: ['name', 'slug', 'short-description', 'long-description']
    },
    {
      name: 'Date & Time',
      description: 'When this event takes place.',
      fields: ['datetime', 'datetime-end']
    },
    {
      name: 'Recurrence',
      description: 'Settings for events that repeat on a schedule.',
      fields: [
        'recurrence-type',
        'repeat-every',
        'repeat-on',
        'recurring-start',
        'recurring-end'
      ]
    },
    {
      name: 'Location',
      description: 'Where this event takes place.',
      fields: [
        'property-location',
        'onsite',
        'onsite-event-location',
        'onsite-custom-location',
        'offsite-event',
        'offsite-event-location'
      ]
    },
    {
      name: 'Images',
      description: 'Visual assets for promoting this event.',
      fields: ['image', 'image-long']
    },
    {
      name: 'Additional Details',
      description: 'Extra information and restrictions for this event.',
      fields: ['adults-only-21', 'read-more']
    }
  ],
  'locations': [
    {
      name: 'Basic Information',
      description: 'Core details that identify this property location.',
      fields: ['name', 'slug', 'full-location-name', 'short-location-name']
    },
    {
      name: 'Address',
      description: 'Physical address information for this location.',
      fields: [
        'street-address-line-1',
        'street-address-line-2',
        'city',
        'state',
        'postal-code'
      ]
    },
    {
      name: 'Contact',
      description: 'How guests can reach this location.',
      fields: [
        'primary-phone',
        'website',
        'google-maps-link',
        'general-email',
        'reservations-email',
        'front-desk-operations-emails',
        'sales-email'
      ]
    },
    {
      name: 'Social & Links',
      description: 'Social profiles and external links for this location.',
      fields: [
        'instagram',
        'instagram-handle',
        'facebook',
        'trip-advisor',
        'privacy-policy',
        'terms-conditions',
        'accessibility'
      ]
    },
    {
      name: 'Description',
      description: 'Marketing copy for this location.',
      fields: ['short-description', 'long-description', 'location-details']
    },
    {
      name: 'Media',
      description: 'Visual assets for this location.',
      fields: ['hero-image']
    },
    {
      name: 'Booking Engine',
      description: 'Settings for the booking widget layout on this location.',
      fields: ['enable-demo-engine', 'production-layout', 'demo-layout']
    }
  ],
  'room-types': [
    {
      name: 'Basic Information',
      description: 'Core details about this room type.',
      fields: ['name', 'slug', 'full-name', 'short-name', 'name-split-2', 'property-location', 'building']
    },
    {
      name: 'Description',
      description: 'Marketing copy for this room type.',
      fields: ['short-description', 'long-description', 'benefits-statment']
    },
    {
      name: 'Details',
      description: 'Specifications and features of this room.',
      fields: [
        'square-feet',
        'number-of-bedrooms',
        'number-of-beds',
        'bed-type',
        'suite',
        'room',
        'number-of-units',
        'component-room',
        'sort'
      ]
    },
    {
      name: 'Amenities & Policies',
      description: 'Features and policies associated with this room type.',
      fields: ['features-amenities', 'policies', 'amenity-display-order']
    },
    {
      name: 'Images',
      description: 'Photos showcasing this room type.',
      fields: ['hero-image', 'feature-image-1', 'feature-image-2', 'images']
    },
    {
      name: 'Reviews',
      description: 'Guest review highlighted for this room type.',
      fields: ['review', 'review-source', 'review-url', 'review-date', 'reviewer-name-or-handle']
    },
    {
      name: 'Integration',
      description: 'Identifiers used to sync with Mews.',
      fields: ['mews-room-type-id', 'mews-image-ids']
    },
    {
      name: 'Settings',
      description: 'Visibility and display configuration.',
      fields: ['active']
    }
  ],
  'outlets': [
    {
      name: 'Basic Information',
      description: 'Core details about this outlet or venue.',
      fields: ['name', 'slug', 'outlet-name', 'outlet-short-name', 'outlet-type', 'location']
    },
    {
      name: 'Address',
      description: 'Physical address information for this outlet.',
      fields: ['street-address-line-1', 'street-address-line-2', 'city', 'state', 'postal-code']
    },
    {
      name: 'Description',
      description: 'Marketing copy for this outlet.',
      fields: ['short-description', 'long-description']
    },
    {
      name: 'Hours',
      description: 'Operating hours for this outlet.',
      fields: ['hours-of-operation']
    },
    {
      name: 'Contact & Links',
      description: 'How guests can contact or book this outlet.',
      fields: [
        'main-phone',
        'email-address',
        'website',
        'instrgram',
        'facebook',
        'yelp',
        'reservations-url',
        'google-maps-link'
      ]
    },
    {
      name: 'Media',
      description: 'Visual assets for this outlet.',
      fields: ['hero-image', 'logo', 'multi-images']
    }
  ],
  'amenities': [
    {
      name: 'Basic Information',
      description: 'Core details about this amenity.',
      fields: ['name', 'slug', 'full-name', 'short-name']
    },
    {
      name: 'Marketing',
      description: 'Marketing copy for this amenity.',
      fields: [
        'marketing-headline',
        'marketing-subheadline',
        'short-description',
        'long-description',
        'key-benefit-or-selling-point-headline',
        'key-benefit-or-selling-point-description'
      ]
    },
    {
      name: 'Media',
      description: 'Visual representation of this amenity.',
      fields: ['image', 'icon-svg']
    },
    {
      name: 'Settings',
      description: 'Organization and display options.',
      fields: ['type', 'category', 'location', 'active']
    }
  ],
  'buildings': [
    {
      name: 'Basic Information',
      description: 'Core details about this building.',
      fields: ['name', 'slug', 'location']
    },
    {
      name: 'Description',
      description: 'Additional information about this building.',
      fields: ['subheadline', 'short-description', 'long-description', 'feature-benefits']
    },
    {
      name: 'Media',
      description: 'Visual assets for this building.',
      fields: ['exterior-building-image', 'multi-image', 'svg-icon']
    },
    {
      name: 'Settings',
      description: 'Visibility and display configuration.',
      fields: ['sort', 'policy-2']
    }
  ],
  'menu-items': [
    {
      name: 'Basic Information',
      description: 'Navigation menu item details.',
      fields: ['name', 'slug']
    }
  ],
  'instagram': [
    {
      name: 'Basic Information',
      description: 'Core details about this Instagram post.',
      fields: ['name', 'slug', 'instagram-username']
    },
    {
      name: 'Instagram Details',
      description: 'Content from the Instagram post.',
      fields: [
        'media-type',
        'caption',
        'caption-rich-text',
        'instagram-url',
        'image',
        'image-url',
        'shortcode'
      ]
    },
    {
      name: 'Settings',
      description: 'Display and curation options.',
      fields: ['sort']
    }
  ],
  'add-ons': [
    {
      name: 'Basic Information',
      description: 'Core details about this add-on.',
      fields: ['name', 'slug', 'item-name']
    },
    {
      name: 'Description',
      description: 'Marketing copy for this add-on.',
      fields: ['short-description', 'long-description']
    },
    {
      name: 'Media',
      description: 'Visual asset for this add-on.',
      fields: ['image']
    },
    {
      name: 'Integration',
      description: 'Identifiers used to sync with Mews.',
      fields: ['mews-product-id']
    },
    {
      name: 'Settings',
      description: 'Display order.',
      fields: ['sort']
    }
  ],
  'photo-hotspots': [
    {
      name: 'Basic Information',
      description: 'Core details that identify this marker.',
      fields: ['name', 'slug', 'amenity']
    },
    {
      name: 'Photo',
      description: 'The published room photo this hotspot is placed on. Coordinates below are tied to this exact image.',
      fields: ['photo-url', 'photo-file-id']
    },
    {
      name: 'Position',
      description: 'Click directly on the photo to drop the marker, or fine-tune the percentages manually.',
      fields: ['x-percent', 'y-percent']
    },
    {
      name: 'Display',
      description: 'Ordering and visibility of this marker.',
      fields: ['display-order', 'active']
    }
  ]
};

// Helper function to get field groups for a collection
export function getFieldGroups(collectionSlug: string): FieldGroup[] {
  return FIELD_GROUPS[collectionSlug] || [];
}

// Helper function to organize fields into groups
export function organizeFieldsByGroup(collectionSlug: string, fields: any[]): Array<{ name: string; description?: string; fields: any[] }> {
  const groups = getFieldGroups(collectionSlug);
  const organized: Array<{ name: string; description?: string; fields: any[] }> = [];

  // Create a map of field slug to field object
  const fieldMap = new Map(fields.map(f => [f.slug, f]));

  // Organize fields into their groups
  for (const group of groups) {
    const groupFields: any[] = [];
    for (const fieldSlug of group.fields) {
      const field = fieldMap.get(fieldSlug);
      if (field) {
        groupFields.push(field);
        fieldMap.delete(fieldSlug); // Remove from map so we don't duplicate
      }
    }
    if (groupFields.length > 0) {
      organized.push({
        name: group.name,
        description: group.description,
        fields: groupFields
      });
    }
  }

  // Add any remaining ungrouped fields (e.g. new fields added in Webflow
  // that haven't been mapped into FIELD_GROUPS yet). These still render,
  // just under a catch-all section instead of being lost.
  const remaining = Array.from(fieldMap.values());
  if (remaining.length > 0) {
    organized.push({
      name: 'Other Fields',
      fields: remaining
    });
  }

  return organized;
}




