// Static configuration describing which CMS collection fields hold images
// (and therefore alt text). This avoids needing to introspect collection
// schemas at runtime — keep in sync with cms-collections-documentation.json
// if image fields are added/renamed in Webflow.
//
// `type: 'image'`      -> fieldData[slug] is a single { url, alt, fileId? } object (or null)
// `type: 'multiImage'` -> fieldData[slug] is an array of { url, alt, fileId? } objects

import { COLLECTIONS, getCollectionById } from './collections-config';

export interface PhotoFieldConfig {
  slug: string;
  label: string;
  type: 'image' | 'multiImage';
}

export interface PhotoCollectionConfig {
  collectionId: string;
  collectionSlug: string;
  collectionName: string;
  fields: PhotoFieldConfig[];
}

function idFor(slug: string): string {
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) {
    throw new Error(`Unknown collection slug in photo-fields-config: ${slug}`);
  }
  return collection.id;
}

export const PHOTO_COLLECTIONS: PhotoCollectionConfig[] = [
  {
    collectionId: idFor('events'),
    collectionSlug: 'events',
    collectionName: 'Events',
    fields: [
      { slug: 'image-long', label: 'Image (long)', type: 'image' },
      { slug: 'image', label: 'Image', type: 'image' }
    ]
  },
  {
    collectionId: idFor('offers'),
    collectionSlug: 'offers',
    collectionName: 'Offers',
    fields: [
      { slug: 'full-card', label: 'Full card', type: 'image' },
      { slug: 'compact-card', label: 'Compact card', type: 'image' },
      { slug: 'horizontal-card', label: 'Horizontal card', type: 'image' }
    ]
  },
  {
    collectionId: idFor('locations'),
    collectionSlug: 'locations',
    collectionName: 'Locations',
    fields: [{ slug: 'hero-image', label: 'Hero image', type: 'image' }]
  },
  {
    collectionId: idFor('room-types'),
    collectionSlug: 'room-types',
    collectionName: 'Room Types',
    fields: [
      { slug: 'images', label: 'Gallery images', type: 'multiImage' },
      { slug: 'hero-image', label: 'Hero image', type: 'image' },
      { slug: 'feature-image-1', label: 'Feature image 1', type: 'image' },
      { slug: 'feature-image-2', label: 'Feature image 2', type: 'image' }
    ]
  },
  {
    collectionId: idFor('amenities'),
    collectionSlug: 'amenities',
    collectionName: 'Amenities',
    fields: [{ slug: 'image', label: 'Image', type: 'image' }]
  },
  {
    collectionId: idFor('buildings'),
    collectionSlug: 'buildings',
    collectionName: 'Buildings',
    fields: [
      { slug: 'exterior-building-image', label: 'Exterior building image', type: 'image' },
      { slug: 'multi-image', label: 'Gallery images', type: 'multiImage' }
    ]
  },
  {
    collectionId: idFor('outlets'),
    collectionSlug: 'outlets',
    collectionName: 'Outlets',
    fields: [
      { slug: 'hero-image', label: 'Hero image', type: 'image' },
      { slug: 'logo', label: 'Logo', type: 'image' },
      { slug: 'multi-images', label: 'Gallery images', type: 'multiImage' }
    ]
  },
  {
    collectionId: idFor('instagram'),
    collectionSlug: 'instagram',
    collectionName: 'Instagrams',
    fields: [{ slug: 'image', label: 'Image', type: 'image' }]
  },
  {
    collectionId: idFor('add-ons'),
    collectionSlug: 'add-ons',
    collectionName: 'Add Ons',
    fields: [{ slug: 'image', label: 'Image', type: 'image' }]
  }
];

export function getPhotoCollectionConfig(collectionId: string): PhotoCollectionConfig | undefined {
  return PHOTO_COLLECTIONS.find((c) => c.collectionId === collectionId);
}

// Re-exported for convenience so callers don't need to import from two places.
export { getCollectionById };
