





// Field group mappings for organizing CMS fields into sections
// Based on Webflow Designer field groups

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
      fields: ['full-card', 'compact-card']
    },
    {
      name: 'Styling',
      description: 'Visual customization options for how this offer appears.',
      fields: ['button-color', 'text-color', 'card-fill', 'rate-font']
    },
    {
      name: 'Pricing',
      description: 'Rate information for this offer.',
      fields: ['rate-starting-from']
    },
    {
      name: 'Cancellation Policy',
      description: 'Rules for when guests can cancel without penalty.',
      fields: [
        'cancellation-penalty-window',
        'cancellation-penalty-window-period'
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
      fields: ['name', 'slug', 'property-name', 'property-code']
    },
    {
      name: 'Address',
      description: 'Physical address information for this location.',
      fields: [
        'address-line-1',
        'address-line-2',
        'city',
        'state',
        'zip-code',
        'country'
      ]
    },
    {
      name: 'Contact',
      description: 'How guests can reach this location.',
      fields: ['phone', 'email', 'website']
    },
    {
      name: 'Media',
      description: 'Visual assets for this location.',
      fields: ['logo', 'hero-image', 'gallery']
    },
    {
      name: 'Settings',
      description: 'Configuration and display options.',
      fields: ['timezone', 'active', 'featured', 'display-order']
    }
  ],
  'room-types': [
    {
      name: 'Basic Information',
      description: 'Core details about this room type.',
      fields: ['name', 'slug', 'property-location']
    },
    {
      name: 'Description',
      description: 'Marketing copy for this room type.',
      fields: ['short-description', 'long-description']
    },
    {
      name: 'Details',
      description: 'Specifications and features of this room.',
      fields: [
        'max-occupancy',
        'bed-type',
        'room-size',
        'view-type'
      ]
    },
    {
      name: 'Images',
      description: 'Photos showcasing this room type.',
      fields: ['primary-image', 'gallery']
    },
    {
      name: 'Amenities',
      description: 'Features and services included with this room.',
      fields: ['amenities']
    },
    {
      name: 'Settings',
      description: 'Visibility and display configuration.',
      fields: ['active', 'featured', 'display-order']
    }
  ],
  'outlets': [
    {
      name: 'Basic Information',
      description: 'Core details about this outlet or venue.',
      fields: ['name', 'slug', 'property-location', 'outlet-type']
    },
    {
      name: 'Description',
      description: 'Marketing copy for this outlet.',
      fields: ['short-description', 'long-description']
    },
    {
      name: 'Hours',
      description: 'Operating hours for each day of the week.',
      fields: [
        'hours-monday',
        'hours-tuesday',
        'hours-wednesday',
        'hours-thursday',
        'hours-friday',
        'hours-saturday',
        'hours-sunday'
      ]
    },
    {
      name: 'Contact & Links',
      description: 'How guests can contact or book this outlet.',
      fields: ['phone', 'email', 'website', 'reservation-link', 'menu-link']
    },
    {
      name: 'Media',
      description: 'Visual assets for this outlet.',
      fields: ['logo', 'hero-image', 'gallery']
    },
    {
      name: 'Settings',
      description: 'Visibility and display configuration.',
      fields: ['active', 'featured', 'display-order']
    }
  ],
  'amenities': [
    {
      name: 'Basic Information',
      description: 'Core details about this amenity.',
      fields: ['name', 'slug', 'description']
    },
    {
      name: 'Media',
      description: 'Visual representation of this amenity.',
      fields: ['icon', 'image']
    },
    {
      name: 'Settings',
      description: 'Organization and display options.',
      fields: ['category', 'display-order', 'active']
    }
  ],
  'buildings': [
    {
      name: 'Basic Information',
      description: 'Core details about this building.',
      fields: ['name', 'slug', 'property-location']
    },
    {
      name: 'Details',
      description: 'Additional information about this building.',
      fields: ['building-number', 'description']
    },
    {
      name: 'Settings',
      description: 'Visibility and display configuration.',
      fields: ['active', 'display-order']
    }
  ],
  'menu-items': [
    {
      name: 'Basic Information',
      description: 'Navigation menu item details.',
      fields: ['name', 'slug']
    }
  ],
  'instagrams': [
    {
      name: 'Basic Information',
      description: 'Core details about this Instagram post.',
      fields: ['name', 'slug', 'property-location']
    },
    {
      name: 'Instagram Details',
      description: 'Content from the Instagram post.',
      fields: ['instagram-url', 'instagram-image', 'caption']
    },
    {
      name: 'Settings',
      description: 'Display and curation options.',
      fields: ['active', 'featured', 'display-order', 'post-date']
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

  // Add any remaining ungrouped fields
  const remaining = Array.from(fieldMap.values());
  if (remaining.length > 0) {
    organized.push({
      name: 'Other Fields',
      fields: remaining
    });
  }

  return organized;
}






