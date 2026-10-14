


// Static collections configuration
// This avoids needing sites:read scope

export interface CollectionConfig {
  id: string;
  name: string;
  slug: string;
  singularName: string;
  complexity: 'simple' | 'core' | 'complex';
  // The slug of a Number field used to manually order items in this collection.
  // When set, the portal exposes a drag-and-drop reorder UI for the collection.
  sortField?: string;
}

export const COLLECTIONS: CollectionConfig[] = [
  {
    id: '6abc810f36cbcba74b8af4a3',
    name: 'Events',
    slug: 'events',
    singularName: 'Event',
    complexity: 'complex'
  },
  {
    id: '6abc8145eb90b8f4d6d650f4',
    name: 'Menu Items',
    slug: 'menu-items',
    singularName: 'Menu Item',
    complexity: 'simple'
  },
  {
    id: '6abc812fd98b325b281d6301',
    name: 'Locations',
    slug: 'locations',
    singularName: 'Location',
    complexity: 'core'
  },
  {
    id: '6abc811cb92ea32dd64d79e0',
    name: 'Offers',
    slug: 'offers',
    singularName: 'Offer',
    complexity: 'complex'
  },
  {
    id: '6abc815b36cbcba74b8b01c4',
    name: 'Room Types',
    slug: 'room-types',
    singularName: 'Room Type',
    complexity: 'complex',
    sortField: 'sort'
  },
  {
    id: '6abc8175a7bbdc92fa9e6599',
    name: 'Amenities',
    slug: 'amenities',
    singularName: 'Amenity',
    complexity: 'simple'
  },
  {
    id: '6abc8192a900d21d00b7c588',
    name: 'Buildings',
    slug: 'buildings',
    singularName: 'Building',
    complexity: 'core'
  },
  {
    id: '6abc819c43b4b395a2b80752',
    name: 'Outlets',
    slug: 'outlets',
    singularName: 'Outlet',
    complexity: 'core'
  },
  {
    id: '6abe1d64ff9619885c7e5cf7',
    name: 'Instagrams',
    slug: 'instagram',
    singularName: 'Instagram',
    complexity: 'core',
    sortField: 'sort'
  },
  {
    id: '6ac364287c8782e8e653075e',
    name: 'Add Ons',
    slug: 'add-ons',
    singularName: 'Add On',
    complexity: 'simple',
    sortField: 'sort'
  }
];

export function getCollectionBySlug(slug: string): CollectionConfig | undefined {
  return COLLECTIONS.find(c => c.slug === slug);
}

export function getCollectionById(id: string): CollectionConfig | undefined {
  return COLLECTIONS.find(c => c.id === id);
}

// Group collections by complexity for the portal home page
export function getCollectionsByComplexity() {
  return {
    simple: COLLECTIONS.filter(c => 
      ['menu-items', 'amenities', 'add-ons'].includes(c.slug) && c.complexity === 'simple'
    ),
    medium: COLLECTIONS.filter(c => 
      ['locations', 'buildings', 'instagram', 'outlets'].includes(c.slug) && c.complexity === 'core'
    ),
    complex: COLLECTIONS.filter(c => 
      ['room-types', 'offers', 'events'].includes(c.slug) && c.complexity === 'complex'
    )
  };
}



