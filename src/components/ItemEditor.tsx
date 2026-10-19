import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { toast } from 'sonner';
import { Info, Loader2, ChevronDown, ChevronUp, ExternalLink, Upload, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { organizeFieldsByGroup } from '../lib/field-groups';
import { getFieldRows, getLayoutClasses } from '../lib/field-layouts';
import { COLLECTIONS } from '../lib/collections-config';
import ImageUpload from './ImageUpload';
import MultiImageField from './MultiImageField';
import HotspotPicker from './HotspotPicker';
import MultiHotspotTagger, { type HotspotMarker, type AmenityOption } from './MultiHotspotTagger';
import RoomPhotoPicker from './RoomPhotoPicker';
import AmenitySortingGrid from './AmenitySortingGrid';
import ErrorBoundary from './ErrorBoundary';
import { uploadImageFile, type ImageData } from '../lib/image-upload-client';
import {
  ROOM_TYPES_COLLECTION_ID,
  extractAmenityIds,
  findRoomTypeIdForPhoto,
} from '../lib/room-type-photos';
import { fetchAllPhotoHotspots, type PhotoHotspotItem } from '../lib/photo-hotspots';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Field {
  id: string;
  slug: string;
  displayName: string;
  type: string;
  required: boolean;
  isRequired?: boolean;
  helpText?: string;
  validations?: {
    singleLine?: boolean;
    maxLength?: number;
    format?: string;
    min?: number;
    max?: number;
    precision?: number;
    options?: Array<{ id: string; name: string }>;
    collectionId?: string;
  };
}

interface ReferenceOption {
  id: string;
  name: string;
  // Raw option id of the referenced item's `type` field (only populated for
  // collections that have one, e.g. the shared Amenities collection).
  type?: string | null;
  // Raw value of the referenced item's `category` field (only populated for
  // collections that have one, e.g. the shared Amenities collection) — used
  // to group amenity items first by Category, then by Type.
  category?: string | null;
  // Thumbnail image (only populated for collections that have one, e.g. the
  // shared Amenities collection) — used by the Amenity display-order
  // sorting grid on Room Types.
  image?: { url: string } | null;
}

interface ItemEditorProps {
  collectionId: string;
  collectionSlug: string;
  /** Human-readable collection name, used in the header banner's back link. */
  collectionName: string;
  itemId: string;
  fields: Field[];
  initialData: Record<string, any>;
  baseUrl: string;
  /** Pre-selects a Room Type in the Photo Hotspots "choose an existing photo" picker. */
  initialRoomTypeId?: string;
}

// Color mapping from Webflow CSS variables
const COLOR_MAP: Record<string, string> = {
  'cowboy-umber': '#4e332d',
  'paper': '#faf9f9',
  'mist': '#f2f2f2',
  'alpine-linen': '#ebe8e0',
  'copper': '#9a5636',
  'lake-forest': '#0e301a',
  'bandana-red': '#d65241',
  'lodge-yellow': '#fddc4e',
  'smoke': '#343833',
  'ash': '#ccc7bb',
  'whiskey-sour': '#ddc5a4',
  'nude-ember': '#f2aaa9',
  'oxblood': '#69253a',
  'oxidized-teal': '#236b7d',
};

// Standard 2-letter US State codes (+ DC) used to render the `state` field
// as a dropdown instead of a free-text input.
const US_STATES: string[] = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
];

// The "Features & Amenities" and "Policies" fields on Room Types both
// reference the same shared Amenities collection, which has a `type`
// option field (Feature / Amenity / Policy / Accessibility / ...). We only
// want Policies to show Policy-typed items, and Features & Amenities to
// show everything *except* Policy-typed items.
const AMENITIES_COLLECTION_ID = '6abc8175a7bbdc92fa9e6599';
const AMENITY_POLICY_TYPE_ID = '7c93dc1078791efcf798aff5800d16a3';

function filterReferenceOptionsForField(field: Field, options: ReferenceOption[]): ReferenceOption[] {
  if (field.validations?.collectionId !== AMENITIES_COLLECTION_ID) return options;
  const normalizedSlug = field.slug.toLowerCase();
  // Covers the Room Type collection's "policies" field as well as the
  // Building collection's "Policy" field (and any other slug variant that
  // contains "polic"), so both forms filter the shared Amenities
  // collection down to Policy-typed items using the same logic.
  const isPolicyField = normalizedSlug.includes('polic');
  if (isPolicyField) {
    return options.filter(o => {
      const typeStr = o.type != null ? String(o.type).trim().toLowerCase() : '';
      const categoryStr = o.category != null ? String(o.category).trim().toLowerCase() : '';
      return o.type === AMENITY_POLICY_TYPE_ID || typeStr === 'policy' || categoryStr === 'policy';
    });
  }
  if (field.slug === 'features-amenities') {
    return options.filter(o => o.type !== AMENITY_POLICY_TYPE_ID);
  }
  return options;
}

// Helper component for field labels with optional tooltip
function FieldLabel({ 
  htmlFor, 
  displayName, 
  isRequired, 
  helpText 
}: { 
  htmlFor: string; 
  displayName: string; 
  isRequired?: boolean; 
  helpText?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Label htmlFor={htmlFor} className="font-body text-sm font-medium text-foreground">
        {displayName}
        {isRequired && <span className="text-destructive ml-1">*</span>}
      </Label>
      {helpText && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-3.5 w-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-xs font-body">{helpText}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export default function ItemEditor({ 
  collectionId,
  collectionSlug,
  collectionName,
  itemId, 
  fields: rawFields, 
  initialData,
  baseUrl,
  initialRoomTypeId,
}: ItemEditorProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceOptions, setReferenceOptions] = useState<Record<string, ReferenceOption[]>>({});
  const [referenceLoading, setReferenceLoading] = useState<Record<string, boolean>>({});

  // Photo Hotspots: the Amenity dropdown should only list amenities that
  // are actually attached (via `features-amenities`) to the Room Type this
  // hotspot's photo belongs to. `null` = not scoped (show everything,
  // either because this isn't a Photo Hotspot or we couldn't resolve a
  // Room Type yet); an array (possibly empty) = scoped to those ids.
  const isPhotoHotspots = collectionSlug === 'photo-hotspots';
  const [allowedAmenityIds, setAllowedAmenityIds] = useState<string[] | null>(null);
  const [amenityScopeRoomTypeName, setAmenityScopeRoomTypeName] = useState<string | null>(null);

  // Room Types: load every published Photo Hotspot once so each photo's
  // thumbnail/modal can show all of its tagged amenities inline (a single
  // image view with every dot at once), instead of sending the editor off
  // to a separate page per photo.
  const isRoomTypes = collectionSlug === 'room-types';
  const [roomTypePhotoHotspots, setRoomTypePhotoHotspots] = useState<PhotoHotspotItem[]>([]);

  // Multi-marker amenity tagging: lets Room Types editors drop several
  // amenity hotspots on a single photo in one sitting (via
  // MultiHotspotTagger + the bulk-create API) instead of the old
  // one-hotspot-per-page-navigation flow.
  const [taggerImage, setTaggerImage] = useState<ImageData | null>(null);
  const [isAmenitiesCollapsed, setIsAmenitiesCollapsed] = useState(true);

  // Feature Section: each of the 3 feature icon blocks manages its own
  // custom upload/replace/remove controls (instead of delegating to the
  // full <ImageUpload> component), since the icon preview container is a
  // fixed-size aspect-square box and <ImageUpload>'s own internal layout
  // (dropzone + max-h-96 preview + alt input + replace button all bundled
  // together) doesn't fit cleanly inside it.
  const [featureIconUploading, setFeatureIconUploading] = useState<Record<string, boolean>>({});
  const [featureIconError, setFeatureIconError] = useState<Record<string, string | null>>({});
  const featureIconFileInputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});

  const uploadFeatureIcon = async (slug: string, file: File) => {
    setFeatureIconUploading(prev => ({ ...prev, [slug]: true }));
    setFeatureIconError(prev => ({ ...prev, [slug]: null }));
    try {
      const img = await uploadImageFile(file, baseUrl);
      setFormData(prev => ({
        ...prev,
        [slug]: { ...img, alt: prev[slug]?.alt || img.alt || '' },
      }));
    } catch (err) {
      console.error('Feature icon upload error:', err);
      setFeatureIconError(prev => ({
        ...prev,
        [slug]: err instanceof Error ? err.message : 'Upload failed',
      }));
    } finally {
      setFeatureIconUploading(prev => ({ ...prev, [slug]: false }));
    }
  };

  const removeFeatureIcon = (slug: string) => {
    if (typeof window !== 'undefined' && !window.confirm('Are you sure you want to remove this photo?')) {
      return;
    }
    handleChange(slug, null);
  };

  const PHOTO_HOTSPOTS_COLLECTION = React.useMemo(
    () => COLLECTIONS.find(c => c.slug === 'photo-hotspots'),
    []
  );

  useEffect(() => {
    if (!isRoomTypes) return;
    let cancelled = false;
    (async () => {
      try {
        const items = await fetchAllPhotoHotspots(baseUrl);
        if (!cancelled) setRoomTypePhotoHotspots(items);
      } catch (err) {
        console.error('Failed to load photo hotspots for room type gallery', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isRoomTypes, baseUrl]);

  // Amenities editor: lets editors manage which Room Types this
  // amenity/feature is attached to directly from the Amenity's own editor,
  // instead of having to open each Room Type individually and find it in
  // their (often long) "Features & Amenities" MultiReference list.
  const isAmenitiesCollectionEditor = collectionSlug === 'amenities';
  interface AmenityRoomTypeOption {
    id: string;
    name: string;
    featureAmenities: string[];
  }
  const [amenityRoomTypes, setAmenityRoomTypes] = useState<AmenityRoomTypeOption[]>([]);
  const [amenityRoomTypesLoading, setAmenityRoomTypesLoading] = useState(false);
  // The "pending" selection state the user toggles in the UI.
  const [connectedRoomTypeIds, setConnectedRoomTypeIds] = useState<Set<string>>(new Set());
  // Snapshot of which Room Types were connected when the editor loaded, so
  // on save we only PATCH the Room Types whose connection state actually
  // changed.
  const [initialConnectedRoomTypeIds, setInitialConnectedRoomTypeIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAmenitiesCollectionEditor) return;
    let cancelled = false;
    setAmenityRoomTypesLoading(true);
    (async () => {
      try {
        const items: AmenityRoomTypeOption[] = [];
        const limit = 100;
        let offset = 0;
        let total = Infinity;

        while (offset < total) {
          const res = await fetch(`${baseUrl}/api/cms/${ROOM_TYPES_COLLECTION_ID}?limit=${limit}&offset=${offset}`);
          if (!res.ok) break;
          const data = await res.json() as {
            items?: Array<{ id: string; fieldData?: { name?: string; 'features-amenities'?: string[] } }>;
            pagination?: { total?: number };
          };
          const pageItems = data.items || [];
          pageItems.forEach(it => {
            items.push({
              id: it.id,
              name: it.fieldData?.name || it.id,
              featureAmenities: Array.isArray(it.fieldData?.['features-amenities'])
                ? (it.fieldData!['features-amenities'] as string[])
                : [],
            });
          });
          total = data.pagination?.total ?? pageItems.length;
          offset += limit;
          if (pageItems.length === 0) break;
        }

        items.sort((a, b) => a.name.localeCompare(b.name));
        if (cancelled) return;
        setAmenityRoomTypes(items);

        if (itemId && itemId !== 'new') {
          const connected = new Set(items.filter(rt => rt.featureAmenities.includes(itemId)).map(rt => rt.id));
          setConnectedRoomTypeIds(connected);
          setInitialConnectedRoomTypeIds(connected);
        }
      } catch (err) {
        console.error('Failed to load room types for amenity connections', err);
      } finally {
        if (!cancelled) setAmenityRoomTypesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAmenitiesCollectionEditor, itemId, baseUrl]);

  const toggleRoomTypeConnection = (roomTypeId: string) => {
    setConnectedRoomTypeIds(prev => {
      const next = new Set(prev);
      if (next.has(roomTypeId)) {
        next.delete(roomTypeId);
      } else {
        next.add(roomTypeId);
      }
      return next;
    });
  };

  // Pushes the user's Connected Room Types toggles to the CMS: PATCHes
  // only the Room Types whose connection state actually changed, adding or
  // removing `amenityId` from each one's `features-amenities` array.
  const syncConnectedRoomTypes = async (amenityId: string) => {
    const changed = amenityRoomTypes.filter(rt => {
      const wasConnected = initialConnectedRoomTypeIds.has(rt.id);
      const isConnected = connectedRoomTypeIds.has(rt.id);
      return wasConnected !== isConnected;
    });

    if (changed.length === 0) return;

    const results = await Promise.allSettled(changed.map(async (rt) => {
      const isConnected = connectedRoomTypeIds.has(rt.id);
      const updatedIds = isConnected
        ? Array.from(new Set([...rt.featureAmenities, amenityId]))
        : rt.featureAmenities.filter(id => id !== amenityId);

      const res = await fetch(`${baseUrl}/api/cms/${ROOM_TYPES_COLLECTION_ID}/${rt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fieldData: { 'features-amenities': updatedIds } }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update room type "${rt.name}"`);
      }
    }));

    const failures = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected');
    if (failures.length > 0) {
      console.error('Failed to sync some room type connections', failures);
      throw new Error(`Failed to update ${failures.length} room type${failures.length === 1 ? '' : 's'}`);
    }
  };

  // Webflow's API returns `isRequired`, but older/local types used
  // `required`. Normalize here so the rest of the component (and the
  // required-field validation below) works no matter which shape comes in.
  const fields = React.useMemo(
    () => rawFields.map(f => ({ ...f, required: Boolean(f.required ?? f.isRequired) })),
    [rawFields]
  );

  // Initialize form data with initial values
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      const next = { ...initialData };
      // Backfill the slug when the form is seeded with a name but no slug
      // yet (e.g. a Photo Hotspot pre-filled from a Room Type's photo via
      // the "Tag amenity hotspot" hand-off). The slug auto-generation in
      // handleChange only fires when the user types into Name themselves,
      // not when initialData seeds the form like this.
      if (next.name && !next.slug) {
        next.slug = generateSlug(next.name);
      }
      setFormData(next);
    }
  }, [initialData]);

  // Resolve which Room Type this Photo Hotspot's photo belongs to, then
  // load that Room Type's `features-amenities` so the Amenity dropdown can
  // be scoped to only the amenities/features actually attached to it.
  useEffect(() => {
    if (!isPhotoHotspots) return;

    let cancelled = false;
    const photoFileId = formData['photo-file-id'] || null;
    const photoUrl = formData['photo-url'] || null;

    (async () => {
      // Prefer the Room Type passed in explicitly via the "Tag amenity
      // hotspot" hand-off; otherwise detect it by matching the hotspot's
      // photo against every Room Type's photo gallery (covers existing
      // hotspots opened directly for editing).
      let roomTypeId = initialRoomTypeId || null;
      if (!roomTypeId && (photoFileId || photoUrl)) {
        roomTypeId = await findRoomTypeIdForPhoto(baseUrl, photoFileId, photoUrl);
      }

      if (cancelled) return;

      if (!roomTypeId) {
        setAllowedAmenityIds(null);
        setAmenityScopeRoomTypeName(null);
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/api/cms/${ROOM_TYPES_COLLECTION_ID}/${roomTypeId}`);
        if (!res.ok) throw new Error(`Failed to load room type (${res.status})`);
        const data = await res.json() as { fieldData?: Record<string, any> };
        if (cancelled) return;
        setAllowedAmenityIds(extractAmenityIds(data.fieldData || {}));
        setAmenityScopeRoomTypeName(data.fieldData?.name || null);
      } catch (err) {
        console.error('Failed to resolve amenities for room type', roomTypeId, err);
        if (!cancelled) {
          setAllowedAmenityIds(null);
          setAmenityScopeRoomTypeName(null);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPhotoHotspots, initialRoomTypeId, formData['photo-file-id'], formData['photo-url'], baseUrl]);

  // Photo Hotspots: auto-build the Name/Slug from the resolved Room Type,
  // the selected Amenity, and the photo's file id — e.g.
  // Name: "The Cabin Rooms - Cabin Beds"
  // Slug: "the-cabin-rooms-cabin-beds_6acfd7ba434add8425f18456"
  // Re-runs (and overwrites Name/Slug) whenever any of those three inputs
  // change, so picking/changing the Amenity always keeps them in sync.
  useEffect(() => {
    if (!isPhotoHotspots) return;

    const amenityId = formData['amenity'];
    const photoFileId = formData['photo-file-id'];
    if (!amenityId || !amenityScopeRoomTypeName || !photoFileId) return;

    const amenityOptions = referenceOptions[AMENITIES_COLLECTION_ID] || [];
    const amenityName = amenityOptions.find(o => o.id === amenityId)?.name;
    // Options may not have loaded yet — bail and let this effect re-run
    // once `referenceOptions` updates.
    if (!amenityName) return;

    const generatedName = `${amenityScopeRoomTypeName} - ${amenityName}`;
    const generatedSlug = `${generateSlug(amenityScopeRoomTypeName)}-${generateSlug(amenityName)}_${photoFileId}`;

    setFormData(prev => {
      if (prev.name === generatedName && prev.slug === generatedSlug) return prev;
      return { ...prev, name: generatedName, slug: generatedSlug };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPhotoHotspots, formData['amenity'], formData['photo-file-id'], amenityScopeRoomTypeName, referenceOptions]);

  // Fetch display names for Reference / MultiReference fields so we can
  // show readable item names instead of raw Webflow item IDs.
  useEffect(() => {
    const refCollectionIds = Array.from(
      new Set(
        fields
          .filter(f => (f.type === 'Reference' || f.type === 'MultiReference') && f.validations?.collectionId)
          .map(f => f.validations!.collectionId as string)
      )
    );

    refCollectionIds.forEach(async (refCollectionId) => {
      setReferenceOptions(prev => {
        if (prev[refCollectionId]) return prev;
        return prev;
      });

      setReferenceLoading(prevLoading => {
        if (prevLoading[refCollectionId]) return prevLoading;
        // Kick off the fetch (fire and forget) the first time we see this collection id
        (async () => {
          try {
            const items: ReferenceOption[] = [];
            const limit = 100;
            let offset = 0;
            let total = Infinity;

            while (offset < total) {
              const res = await fetch(`${baseUrl}/api/cms/${refCollectionId}?limit=${limit}&offset=${offset}`);
              if (!res.ok) break;
              const data = await res.json() as {
                items?: Array<{ id: string; fieldData?: { name?: string; type?: string | null; category?: string | null; image?: { url: string } | null } }>;
                pagination?: { total?: number };
              };
              const pageItems = data.items || [];
              pageItems.forEach(it => {
                items.push({
                  id: it.id,
                  name: it.fieldData?.name || it.id,
                  type: it.fieldData?.type ?? null,
                  category: it.fieldData?.category ?? null,
                  image: it.fieldData?.image ?? null,
                });
              });
              total = data.pagination?.total ?? pageItems.length;
              offset += limit;
              if (pageItems.length === 0) break;
            }

            items.sort((a, b) => a.name.localeCompare(b.name));
            setReferenceOptions(prev => ({ ...prev, [refCollectionId]: items }));
          } catch (err) {
            console.error('Failed to load reference options for collection', refCollectionId, err);
            setReferenceOptions(prev => ({ ...prev, [refCollectionId]: [] }));
          } finally {
            setReferenceLoading(prev => ({ ...prev, [refCollectionId]: false }));
          }
        })();

        return { ...prevLoading, [refCollectionId]: true };
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, baseUrl]);

  // Generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  };

  const handleChange = (slug: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [slug]: value };
      
      // Auto-generate slug when name changes
      if (slug === 'name' && typeof value === 'string') {
        updated.slug = generateSlug(value);
      }
      
      return updated;
    });
  };

  // Lets editors jump from a Room Type's photo straight into creating a
  // Photo Hotspot pre-filled with that photo (and the Room Type it came
  // from), instead of hand-copying URLs/file ids from the Designer.
  const canTagHotspot = collectionSlug === 'room-types';
  const handleTagHotspot = (image: ImageData) => {
    setTaggerImage(image);
  };

  // Amenities actually attached to this Room Type (via `features-amenities`),
  // excluding Policy-typed items — scopes the tagger's amenity dropdown the
  // same way the single-item Photo Hotspot editor's Amenity field is scoped.
  const taggerAmenityOptions: AmenityOption[] = React.useMemo(() => {
    const ids = extractAmenityIds(formData);
    const all = referenceOptions[AMENITIES_COLLECTION_ID] || [];
    return all
      .filter(o => ids.includes(o.id) && o.type !== AMENITY_POLICY_TYPE_ID)
      .map(o => ({ id: o.id, name: o.name }));
  }, [formData, referenceOptions]);

  const handleTaggerSubmit = async (markers: HotspotMarker[]) => {
    if (!taggerImage || !PHOTO_HOTSPOTS_COLLECTION) return;
    const roomTypeName = formData.name || initialData?.name || '';

    const items = markers.map((m) => {
      const amenityName = taggerAmenityOptions.find(a => a.id === m.amenityId)?.name || '';
      return {
        fieldData: {
          name: `${roomTypeName} - ${amenityName}`,
          slug: `${generateSlug(roomTypeName)}-${generateSlug(amenityName)}_${taggerImage.fileId}-${generateSlug(m.id)}`,
          'photo-url': taggerImage.url,
          'photo-file-id': taggerImage.fileId,
          'x-percent': m.x,
          'y-percent': m.y,
          amenity: m.amenityId,
          active: true,
        },
      };
    });

    try {
      // The single-item CMS endpoint expects fieldData at the request root.
      // The bulk endpoint's { items } wrapper produced "Missing required key 'fieldData'".
      // Save each marker through the same contract used by handleSubmit.
      for (const item of items) {
        const res = await fetch(`${baseUrl}/api/cms/${PHOTO_HOTSPOTS_COLLECTION.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fieldData: item.fieldData }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string };
          throw new Error(err.error || `Failed to save hotspots: ${res.statusText}`);
        }
      }

      toast.success(`${markers.length} hotspot${markers.length === 1 ? '' : 's'} tagged`, {
        description: 'Published to the CMS.',
      });
      setTaggerImage(null);

      try {
        const refreshed = await fetchAllPhotoHotspots(baseUrl);
        setRoomTypePhotoHotspots(refreshed);
      } catch (err) {
        console.error('Failed to refresh photo hotspots after bulk save', err);
      }
    } catch (err) {
      console.error('Failed to bulk save hotspots', err);
      toast.error('Failed to save hotspots', {
        description: err instanceof Error ? err.message : 'An error occurred',
      });
      throw err;
    }
  };

  // Lets editors open the read-only "Review tagged photos" view straight
  // from a Room Type's photo gallery, pre-filled with that photo (and the
  // Room Type it came from), instead of hunting for it from scratch.
  const canReviewHotspots = isRoomTypes;
  const handleReviewHotspots = (image: ImageData) => {
    const params = new URLSearchParams();
    if (image.url) params.set('photoUrl', image.url);
    if (image.fileId) params.set('photoFileId', image.fileId);
    if (itemId && itemId !== 'new') params.set('roomTypeId', itemId);
    window.location.href = `${baseUrl}/portal/photo-hotspots/review?${params.toString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    // Validate required fields
    const requiredFields = fields.filter(f => f.required);
    const missingFields = requiredFields.filter(f => {
      const value = formData[f.slug];
      return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(f => f.displayName).join(', ');
      setError(`Please fill in required fields: ${fieldNames}`);
      toast.error('Missing required fields', {
        description: `Please fill in: ${fieldNames}`,
      });
      setIsSaving(false);
      return;
    }

    try {
      const isNewItem = itemId === 'new';
      const url = isNewItem 
        ? `${baseUrl}/api/cms/${collectionId}`
        : `${baseUrl}/api/cms/${collectionId}/${itemId}`;
      
      const method = isNewItem ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fieldData: formData }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' })) as { error?: string };
        throw new Error(errorData.error || `Failed to save: ${response.statusText}`);
      }

      const result = await response.json() as { id?: string };
      console.log('Save successful:', result);

      // Sync "Connected Room Types" toggles for the Amenities collection:
      // add/remove this amenity's id from each affected Room Type's
      // features-amenities array. Works for both new amenities (using the
      // freshly-created id) and existing ones.
      if (isAmenitiesCollectionEditor) {
        const savedAmenityId = isNewItem ? result.id : itemId;
        if (savedAmenityId) {
          try {
            await syncConnectedRoomTypes(savedAmenityId);
          } catch (syncErr) {
            console.error('Failed to sync connected room types', syncErr);
            toast.error('Amenity saved, but failed to update some room type connections', {
              description: syncErr instanceof Error ? syncErr.message : 'An error occurred',
            });
          }
        }
      }

      if (isNewItem) {
        // Redirect to the newly created item's edit page
        const newItemId = result.id;

        // If this Photo Hotspot was created via the "Tag amenity hotspot"
        // hand-off from a Room Type's photo gallery, send the editor back
        // to that Room Type instead of into the brand-new hotspot's own
        // (comparatively empty) edit page — that's where the user's
        // actual workflow continues (tagging the next photo, etc).
        if (isPhotoHotspots && initialRoomTypeId) {
          toast.success('Hotspot created successfully!', {
            description: 'Returning to the room type...',
          });
          setTimeout(() => {
            window.location.href = `${baseUrl}/portal/room-types/${initialRoomTypeId}`;
          }, 500);
          return;
        }

        toast.success('Item created successfully!', {
          description: 'Redirecting to edit page...',
        });
        
        // Get collection slug from COLLECTIONS
        const collection = COLLECTIONS.find(c => c.id === collectionId);
        if (collection && newItemId) {
          setTimeout(() => {
            window.location.href = `${baseUrl}/portal/${collection.slug}/${newItemId}`;
          }, 500);
        }
      } else {
        toast.success('Changes saved successfully!', {
          description: 'Your updates have been published to the CMS.',
        });
      }
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error(itemId === 'new' ? 'Failed to create item' : 'Failed to save changes', {
        description: err instanceof Error ? err.message : 'An error occurred',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (field: any) => {
    const value = formData[field.slug];

    // The `state` field is rendered as a US State dropdown regardless of
    // its underlying Webflow field type (typically PlainText), since it
    // should always hold a standard 2-letter state code.
    if (field.slug === 'state') {
      return (
        <div key={field.slug} className="space-y-1.5">
          <FieldLabel
            htmlFor={field.slug}
            displayName={field.displayName}
            isRequired={field.required}
            helpText={field.helpText}
          />
          <Select
            value={value || ''}
            onValueChange={(val) => handleChange(field.slug, val || '')}
          >
            <SelectTrigger id={field.slug} className="font-body w-full">
              <SelectValue placeholder="Select State..." />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((code) => (
                <SelectItem key={code} value={code}>
                  {code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    switch (field.type) {
      case 'PlainText':
      case 'Email':
      case 'Phone':
        const isSingleLine = field.validations?.singleLine !== false;
        const isCallToAction = field.slug === 'call-to-action';
        const inputSizeClass = isCallToAction ? 'input-sm' : 'input-xs';
        const isReadOnlyField = field.slug === 'slug' || field.slug === 'mews-image-ids';
        const readOnlyClass = isReadOnlyField
          ? 'bg-muted/50 cursor-not-allowed text-muted-foreground'
          : '';
        
        if (!isSingleLine) {
          // Multi-line plain text
          return (
            <div key={field.slug} className="space-y-1.5">
              <FieldLabel 
                htmlFor={field.slug}
                displayName={field.displayName}
                isRequired={field.required}
                helpText={field.helpText}
              />
              <Textarea
                id={field.slug}
                value={value || ''}
                onChange={(e) => handleChange(field.slug, e.target.value)}
                required={field.required}
                rows={4}
                readOnly={isReadOnlyField}
                disabled={isReadOnlyField}
                className={`font-body resize-y ${inputSizeClass} ${readOnlyClass}`}
              />
            </div>
          );
        }
        
        // Single-line text
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Input
              id={field.slug}
              type="text"
              value={value || ''}
              onChange={(e) => handleChange(field.slug, e.target.value)}
              required={field.required}
              readOnly={isReadOnlyField}
              disabled={isReadOnlyField}
              className={`font-body ${inputSizeClass} ${readOnlyClass}`}
            />
          </div>
        );

      case 'RichText':
        return (
          <div key={field.slug} className="space-y-1.5 max-w-2xl">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Textarea
              id={field.slug}
              value={value || ''}
              onChange={(e) => handleChange(field.slug, e.target.value)}
              required={field.required}
              rows={6}
              className="font-body resize-y"
            />
          </div>
        );

      case 'Number':
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Input
              id={field.slug}
              type="number"
              value={value ?? ''}
              onChange={(e) => handleChange(field.slug, e.target.value ? parseFloat(e.target.value) : null)}
              required={field.required}
              className="font-body input-xs"
            />
          </div>
        );

      case 'Bool':
      case 'Switch':
        return (
          <div key={field.slug} className="flex items-start justify-between gap-4 py-3">
            <div className="space-y-0.5 flex-1">
              <FieldLabel 
                htmlFor={field.slug}
                displayName={field.displayName}
                helpText={field.helpText}
              />
            </div>
            <Switch
              id={field.slug}
              checked={value === true}
              onCheckedChange={(checked) => handleChange(field.slug, checked)}
              className="mt-0.5"
            />
          </div>
        );

      case 'DateTime':
        const dateValue = value ? new Date(value).toISOString().slice(0, 16) : '';
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Input
              id={field.slug}
              type="datetime-local"
              value={dateValue}
              onChange={(e) => handleChange(field.slug, e.target.value ? new Date(e.target.value).toISOString() : null)}
              required={field.required}
              className="font-body input-xs"
            />
          </div>
        );

      case 'Link':
        const linkUrl = typeof value === 'object' ? value?.url : value;
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Input
              id={field.slug}
              type="url"
              value={linkUrl || ''}
              onChange={(e) => handleChange(field.slug, { url: e.target.value })}
              required={field.required}
              placeholder="https://example.com"
              className="font-body input-xs"
            />
          </div>
        );

      case 'Color':
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <div className="flex gap-2 input-xs">
              <Input
                id={field.slug}
                type="color"
                value={value || '#000000'}
                onChange={(e) => handleChange(field.slug, e.target.value)}
                required={field.required}
                className="w-20 h-10 cursor-pointer flex-shrink-0"
              />
              <Input
                type="text"
                value={value || ''}
                onChange={(e) => handleChange(field.slug, e.target.value)}
                placeholder="#000000"
                className="font-mono flex-1 min-w-0"
              />
            </div>
          </div>
        );

      case 'MultiImage':
        // Multi-image field (array of images) - thumbnail grid with edit modal
        const multiImageValue = Array.isArray(value) ? value : [];
        return (
          <MultiImageField
            key={field.slug}
            value={multiImageValue}
            onChange={(newValue) => handleChange(field.slug, newValue)}
            label={field.displayName}
            required={field.required}
            helpText={field.helpText}
            baseUrl={baseUrl}
            onTagHotspot={canTagHotspot ? handleTagHotspot : undefined}
            onReviewHotspots={canReviewHotspots ? handleReviewHotspots : undefined}
            photoHotspots={isRoomTypes ? roomTypePhotoHotspots : undefined}
          />
        );

      case 'Image':
        // Check if this is a multi-image field (array of images)
        if (Array.isArray(value)) {
          return (
            <MultiImageField
              key={field.slug}
              value={value}
              onChange={(newValue) => handleChange(field.slug, newValue)}
              label={field.displayName}
              required={field.required}
              helpText={field.helpText}
              baseUrl={baseUrl}
              onTagHotspot={canTagHotspot ? handleTagHotspot : undefined}
              onReviewHotspots={canReviewHotspots ? handleReviewHotspots : undefined}
              photoHotspots={isRoomTypes ? roomTypePhotoHotspots : undefined}
            />
          );
        }
        
        // Single image field
        return (
          <ImageUpload
            key={field.slug}
            value={value || null}
            onChange={(newValue) => handleChange(field.slug, newValue)}
            label={field.displayName}
            required={field.required}
            helpText={field.helpText}
          />
        );

      case 'Option':
        const options: Array<{ id: string; name: string }> = field.validations?.options || [];
        const isColorField = field.slug === 'button-color' || field.slug === 'text-color';
        const isReviewSourceField = field.slug === 'review-source';

        return (
          <div key={field.slug} className="space-y-2">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <div className={
              isColorField
                ? "grid grid-cols-2 sm:grid-cols-3 gap-2"
                : isReviewSourceField
                  ? "flex flex-col gap-2 w-full"
                  : "flex flex-wrap gap-2"
            }>
              {options.map((option: { id: string; name: string }) => {
                const normalizedName = option.name.toLowerCase().replace(/\s+/g, '-');
                const colorHex = isColorField ? COLOR_MAP[normalizedName] : null;
                
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleChange(field.slug, option.id)}
                    className={`px-3 py-2 border font-body text-sm transition-colors flex items-center gap-2 ${
                      isReviewSourceField ? 'w-full text-left justify-start' : ''
                    } ${
                      value === option.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    {colorHex && (
                      <span 
                        className="w-5 h-5 border border-border inline-block flex-shrink-0"
                        style={{ backgroundColor: colorHex }}
                      />
                    )}
                    <span className="truncate">{option.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'Reference': {
        const refCollectionId = field.validations?.collectionId;
        const rawRefOptions = refCollectionId ? referenceOptions[refCollectionId] || [] : [];
        const typeFilteredOptions = filterReferenceOptionsForField(field, rawRefOptions);

        // Photo Hotspots: narrow the Amenity dropdown to only the
        // amenities/features actually attached to this hotspot's Room Type.
        const isScopedAmenityField = isPhotoHotspots && field.slug === 'amenity' && allowedAmenityIds !== null;
        const scopedOptions = isScopedAmenityField
          ? typeFilteredOptions.filter(o => allowedAmenityIds!.includes(o.id))
          : typeFilteredOptions;

        const isLoadingOptions = refCollectionId ? !!referenceLoading[refCollectionId] : false;
        const currentId: string = formData[field.slug] || '';
        const NONE_VALUE = '__none__';

        // Ensure the currently selected id always has a matching option,
        // even before the async reference-options fetch resolves. Without
        // this, Radix's controlled Select can fail to reflect a valid
        // value if no <SelectItem> matches it yet.
        const currentIdKnown = currentId && scopedOptions.some(o => o.id === currentId);
        const currentIdFromRaw = currentId ? rawRefOptions.find(o => o.id === currentId) : undefined;
        const refOptions = currentId && !currentIdKnown
          ? [{ id: currentId, name: currentIdFromRaw?.name || (isLoadingOptions ? 'Loading…' : currentId) }, ...scopedOptions]
          : scopedOptions;

        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Select
              value={currentId || NONE_VALUE}
              onValueChange={(val) => {
                // Radix's hidden native <select> (used for HTML form
                // compatibility) remounts whenever the set of registered
                // <SelectItem>s changes (e.g. when async reference options
                // finish loading). On remount it force-syncs its value and
                // dispatches a synthetic "change" event before the DOM has
                // the matching <option>, which can report an empty string.
                // Radix disallows real <Select.Item value=""> (it throws),
                // so a genuine user selection can never produce val === "".
                // Any empty-string call is therefore this internal sync
                // glitch, not a real selection — ignore it.
                if (val === '') return;
                handleChange(field.slug, val === NONE_VALUE ? null : val);
              }}
            >
              <SelectTrigger id={field.slug} className="font-body w-full">
                <SelectValue placeholder={isLoadingOptions ? 'Loading...' : 'Select an option'}>
                  {refOptions.find(o => o.id === currentId)?.name || (currentId ? currentId : 'Not set')}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE_VALUE}>Not set</SelectItem>
                {refOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isScopedAmenityField && (
              <p className="text-xs text-muted-foreground font-body">
                {amenityScopeRoomTypeName
                  ? `Showing only amenities & features attached to ${amenityScopeRoomTypeName}.`
                  : 'Showing only amenities & features attached to this hotspot\u2019s room type.'}
                {allowedAmenityIds && allowedAmenityIds.length === 0 && (
                  <> This room type has none yet — attach some via its Features & Amenities field first.</>
                )}
              </p>
            )}
          </div>
        );
      }

      case 'MultiReference': {
        const refCollectionId = field.validations?.collectionId;
        const rawRefOptions = refCollectionId ? referenceOptions[refCollectionId] || [] : [];
        const typeFilteredOptions = filterReferenceOptionsForField(field, rawRefOptions);
        const isLoadingOptions = refCollectionId ? !!referenceLoading[refCollectionId] : false;
        const selectedIds: string[] = Array.isArray(formData[field.slug]) ? formData[field.slug] : [];

        // Make sure every currently-selected id renders as a chip, even if
        // it hasn't shown up in the async-loaded options list yet.
        const missingSelected = selectedIds
          .filter(id => !rawRefOptions.some(o => o.id === id))
          .map(id => ({ id, name: isLoadingOptions ? 'Loading…' : id }));

        // Keep any already-selected items visible even if they fall outside
        // the current type filter (e.g. legacy data), so users can still
        // see and un-select them.
        const selectedOutsideFilter = rawRefOptions.filter(
          o => selectedIds.includes(o.id) && !typeFilteredOptions.some(t => t.id === o.id)
        );

        const refOptions = [...missingSelected, ...selectedOutsideFilter, ...typeFilteredOptions];

        const toggleId = (id: string) => {
          const updated = selectedIds.includes(id)
            ? selectedIds.filter(i => i !== id)
            : [...selectedIds, id];
          handleChange(field.slug, updated);
        };

        // Items from the shared Amenities collection carry a `category` and
        // a `type` field — group them Category -> Type -> Items so long
        // lists (Features & Amenities, Policies) are easier to scan, with
        // clean fallbacks for items missing either value.
        const isAmenitiesCollectionField = refCollectionId === AMENITIES_COLLECTION_ID;

        type GroupedItem = { id: string; name: string };
        const groupedByCategory = isAmenitiesCollectionField
          ? (() => {
              const categories = new Map<string, Map<string, GroupedItem[]>>();
              refOptions.forEach((opt) => {
                const categoryKey = (opt as ReferenceOption).category?.toString().trim() || 'General';
                const typeKey = (opt as ReferenceOption).type?.toString().trim() || 'Standard';
                if (!categories.has(categoryKey)) categories.set(categoryKey, new Map());
                const typesMap = categories.get(categoryKey)!;
                if (!typesMap.has(typeKey)) typesMap.set(typeKey, []);
                typesMap.get(typeKey)!.push({ id: opt.id, name: opt.name });
              });
              return Array.from(categories.entries())
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([category, typesMap]) => ({
                  category,
                  types: Array.from(typesMap.entries())
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([type, items]) => ({ type, items })),
                }));
            })()
          : [];

        const renderToggleButton = (option: GroupedItem) => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleId(option.id)}
              className={`px-3 py-1.5 border font-body text-sm transition-colors text-left ${
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
            >
              {option.name}
            </button>
          );
        };

        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            {isLoadingOptions && refOptions.length === 0 && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-body">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading options...
              </span>
            )}
            {!isLoadingOptions && refOptions.length === 0 && (
              <span className="text-sm text-muted-foreground font-body">No options available</span>
            )}
            {isAmenitiesCollectionField ? (
              <div>
                {groupedByCategory.map(({ category, types }) => (
                  <div key={category} className="p-5 border rounded-xl bg-background/50 mb-6 space-y-4">
                    <h3 className="text-base font-bold tracking-wide border-b pb-2 mb-4">{category}</h3>
                    {types.map(({ type, items }) => (
                      <div key={type}>
                        <h4 className="text-sm font-semibold text-muted-foreground mt-3 mb-2">{type}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {items.map(item => renderToggleButton(item))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 border border-border p-3 bg-background min-h-[3rem]">
                {refOptions.map(option => renderToggleButton(option))}
              </div>
            )}
          </div>
        );
      }

      default:
        return (
          <div key={field.slug} className="space-y-1.5">
            <Label className="font-body text-sm font-medium text-foreground">
              {field.displayName}
              <span className="text-xs text-muted-foreground ml-2 font-normal">({field.type})</span>
            </Label>
            <pre className="text-xs text-muted-foreground font-mono p-3 bg-muted border border-border overflow-x-auto">
              {JSON.stringify(value, null, 2)}
            </pre>
          </div>
        );
    }
  };

  // Organize fields by group
  // Exclude the top-level `active` field from grouped/row layout — it now
  // renders in its own status banner at the top of the editor instead of
  // inline within a group (e.g. "Settings" / "Visibility" / "Display").
  const groupableFields = fields.filter(f => f.slug !== 'active');
  const organizedFields = organizeFieldsByGroup(collectionSlug, groupableFields);

  console.log('Organized fields:', organizedFields.map(g => g.name));
  console.log('Field groups:', organizedFields.map(g => `${g.name}: ${g.fields.length}`));

  // Early return if no fields
  if (!fields || fields.length === 0) {
    return (
      <div className="border border-border bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground font-body">
          No fields available for this collection.
        </p>
      </div>
    );
  }
  
  // Get field rows for layout
  const fieldRows = getFieldRows(collectionSlug, groupableFields);
  
  // Create a map of field slug to field object for quick lookup
  const fieldMap = new Map(fields.map(f => [f.slug, f]));

  // Find a field by its display name, independent of which group Webflow
  // (or our group config) would normally place it in. This lets fields
  // like "Google Maps Link" be relocated into the Contact section's 2-column
  // layout even if they technically belong to a different group (e.g.
  // Social & Links).
  const findFieldByName = (name: string) =>
    fields.find(f => f.displayName.trim().toLowerCase() === name.trim().toLowerCase());

  const googleMapsLinkField = findFieldByName('Google Maps Link');

  // Does this collection have a top-level `active` field? If so, surface it
  // as a status toggle in the banner at the top of the editor instead of
  // buried inside a group.
  const activeStatusField = fieldMap.get('active');
  const isNewItemPage = itemId === 'new';

  const activeToggleControl = activeStatusField ? (
    <div className="flex items-center gap-2 sm:flex-shrink-0">
      <Label htmlFor="active" className="font-body text-sm font-medium text-foreground">
        Active
      </Label>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          {formData.active === true
            ? 'This item is active and visible.'
            : 'Inactive items are hidden from public views.'}
        </TooltipContent>
      </Tooltip>
      <Switch
        id="active"
        checked={formData.active === true}
        onCheckedChange={(checked) => handleChange('active', checked)}
      />
    </div>
  ) : null;

  return (
    <ErrorBoundary label="Item editor">
    <>
    <form onSubmit={handleSubmit} className="w-full">
        {isNewItemPage ? (
          activeToggleControl && (
            <div className="flex items-center justify-end mb-6">
              {activeToggleControl}
            </div>
          )
        ) : (
          <div className="bg-[#f4f0ea] p-6 border-b mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <a
                href={`${baseUrl}/portal/${collectionSlug}`}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
              >
                <span className="mr-1">‹</span>
                {collectionName}
              </a>
              <h1 className="font-heading text-2xl sm:text-3xl text-foreground mb-1.5 break-words">
                {formData.name || initialData?.name}
              </h1>
              <p className="text-sm text-muted-foreground font-mono break-all">
                {formData.slug || initialData?.slug}
              </p>
            </div>

            {activeToggleControl}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive text-destructive font-body text-sm">
            {error}
          </div>
        )}

        <div className="space-y-10">
          {organizedFields.map((group) => {
            // Get the field slugs in this group
            const groupFieldSlugs = new Set(group.fields.map(f => f.slug));

            // "Google Maps Link" is relocated into the Contact section's
            // layout (see isContactSection below), so suppress it from
            // whichever group it would normally render in (e.g. Social &
            // Links) to avoid rendering it twice.
            if (googleMapsLinkField && group.name !== 'Contact') {
              groupFieldSlugs.delete(googleMapsLinkField.slug);
            }

            // Filter rows to only include fields in this group
            const groupRows = fieldRows.filter(row => 
              row.fields.some(f => groupFieldSlugs.has(f.slug))
            ).map(row => ({
              fields: row.fields.filter(f => groupFieldSlugs.has(f.slug))
            }));
            
            // Check if this is a collapsible geo-fencing section
            const isDomesticGeoFencing = group.name === 'Domestic Geo-Fencing';
            const isInternationalGeoFencing = group.name === 'International Geo-Fencing';
            const isCollapsible = isDomesticGeoFencing || isInternationalGeoFencing;
            
            // Get the active toggle field for this section
            const activeField = isDomesticGeoFencing ? 'geo-fencing-active' : 
                               isInternationalGeoFencing ? 'international-fencing-active' : null;
            const isActive = activeField ? formData[activeField] === true : true;
            
            // Special handling for Visibility section
            const isVisibility = group.name === 'Visibility';

            // Special handling for the Photo Hotspots "Photo" section: let
            // editors pick an existing Room Type photo visually instead of
            // hand-copying URLs/file ids from the Designer.
            const isPhotoHotspotPhotoGroup = collectionSlug === 'photo-hotspots' && group.name === 'Photo';

            // Special handling for the Room Types "Details" section: split
            // numeric/text/option specs from boolean switch toggles into a
            // clean 2-column layout instead of the default row-based grid.
            const isRoomDetails = collectionSlug === 'room-types' && group.name === 'Details';
            const roomDetailsSwitchSlugs = new Set(['suite', 'room', 'component-room']);
            const roomDetailsRightColumnSlugs = new Set(['bed-type', ...roomDetailsSwitchSlugs]);
            const roomDetailsSpecFields = isRoomDetails
              ? group.fields
                  .filter(f => !roomDetailsRightColumnSlugs.has(f.slug))
                  .map(f => fieldMap.get(f.slug))
                  .filter((f): f is NonNullable<typeof f> => !!f)
              : [];
            const roomDetailsSwitchFields = isRoomDetails
              ? ['bed-type', ...roomDetailsSwitchSlugs]
                  .map(slug => fieldMap.get(slug))
                  .filter((f): f is NonNullable<typeof f> => !!f && group.fields.some(gf => gf.slug === f.slug))
              : [];

            // Special handling for the Room Types "Reviews" section: text/
            // input fields stack in a left column, while the "Review Source"
            // option field gets its own bordered column with full-width,
            // vertically stacked choice buttons.
            const isReviewsSection = collectionSlug === 'room-types' && group.name === 'Reviews';
            const reviewsLeftSlugs = ['review', 'review-date', 'review-url', 'reviewer-name-or-handle'];
            const reviewsLeftFields = isReviewsSection
              ? reviewsLeftSlugs
                  .map(slug => fieldMap.get(slug))
                  .filter((f): f is NonNullable<typeof f> => !!f && groupFieldSlugs.has(f.slug))
              : [];
            const reviewsRightField = isReviewsSection ? fieldMap.get('review-source') : undefined;

            // Special handling for the Room Types "Amenities & Policies"
            // section: collapsed by default with an expand/collapse control
            // in the header so the editor form feels less overwhelming.
            const isAmenitiesSection = collectionSlug === 'room-types' && group.name === 'Amenities & Policies';

            // Special handling for the "Contact" section: organize fields
            // into a clean 2-column layout — phone/website/maps link on the
            // left, emails on the right. "Google Maps Link" is pulled in by
            // display name from wherever it normally lives (e.g. Social &
            // Links) so it renders here instead.
            const isContactSection = group.name === 'Contact';
            const contactColumn1Fields = isContactSection
              ? ['Primary Phone', 'Website', 'Google Maps Link']
                  .map(name => findFieldByName(name))
                  .filter((f): f is NonNullable<typeof f> => !!f)
              : [];
            const contactColumn2Fields = isContactSection
              ? ['General Email', 'Reservations Email', 'Front Desk | Operations Emails', 'Sales Email']
                  .map(name => findFieldByName(name))
                  .filter((f): f is NonNullable<typeof f> => !!f)
              : [];

            // Special handling for the "Social & Links" section: organize
            // fields into a clean 2-column layout with sub-headings —
            // social profile links on the left ("Socials"), other misc.
            // links on the right ("Other Links"). "Google Maps Link" is
            // excluded here (relocated to the Contact section above via the
            // groupFieldSlugs exclusion earlier in this loop).
            const isSocialLinksSection = group.name === 'Social & Links';
            const socialsColumnFields = isSocialLinksSection
              ? ['Instagram', 'Instagram Handle', 'Facebook', 'YouTube', 'TripAdvisor']
                  .map(name => findFieldByName(name))
                  .filter((f): f is NonNullable<typeof f> => !!f)
              : [];
            const otherLinksColumnFields = isSocialLinksSection
              ? ['Privacy Policy', 'Terms & Conditions', 'Accessibility']
                  .map(name => findFieldByName(name))
                  .filter((f): f is NonNullable<typeof f> => !!f)
              : [];

            // Special handling for the "Address" section: City, State, and
            // Postal Code render together in a 3-column row; any other
            // address fields (e.g. Street Address) render normally, stacked
            // above that row.
            const isAddressSection = group.name === 'Address';
            const findAddressField = (names: string[]) => {
              for (const n of names) {
                const bySlug = fieldMap.get(n.toLowerCase().replace(/\s+/g, '-'));
                if (bySlug) return bySlug;
                const byName = findFieldByName(n);
                if (byName) return byName;
              }
              return undefined;
            };
            const addressCityField = isAddressSection ? findAddressField(['City']) : undefined;
            const addressStateField = isAddressSection ? fieldMap.get('state') : undefined;
            const addressPostalField = isAddressSection
              ? findAddressField(['Postal Code', 'Zip Code', 'Zip'])
              : undefined;
            const addressRowFields = [addressCityField, addressStateField, addressPostalField]
              .filter((f): f is NonNullable<typeof f> => !!f);
            const addressRowSlugs = new Set(addressRowFields.map(f => f.slug));
            const addressOtherFields = isAddressSection
              ? group.fields
                  .map(f => fieldMap.get(f.slug))
                  .filter((f): f is NonNullable<typeof f> => !!f && !addressRowSlugs.has(f.slug))
              : [];

            // Special handling for the "Feature Section" group: group
            // Features 1, 2, and 3 into 3 distinct 2-column block cards —
            // icon preview + alt text on the left, headline + paragraph on
            // the right. The "Enable Feature Section" toggle stays as its
            // own header control above all 3 cards.
            const isFeatureSection = group.name === 'Feature Section';
            const featureEnableField: Field | undefined = isFeatureSection
              ? fieldMap.get('enable-feature-section') || findFieldByName('Enable Feature Section')
              : undefined;
            const featureBlocks = isFeatureSection
              ? [1, 2, 3].map((n) => ({
                  icon: fieldMap.get(`feature-icon-${n}`),
                  iconAltSlug: `feature-icon-${n}-alt`,
                  headline: fieldMap.get(`feature-headline-${n}`),
                  paragraph: fieldMap.get(`feature-paragraph-${n}`),
                }))
              : [];

            return (
              <section key={group.name} className="space-y-6">
                <div className="pb-3 border-b border-border flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-base font-semibold text-foreground">{group.name}</h2>
                    {group.description && (
                      <p className="text-sm text-muted-foreground font-body mt-1">{group.description}</p>
                    )}
                  </div>
                  {isAmenitiesSection && (
                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href={`${baseUrl}/portal/amenities`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>Go to Features &amp; Amenities</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAmenitiesCollapsed(prev => !prev)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground shrink-0"
                      >
                        {isAmenitiesCollapsed ? (
                          <>
                            Expand
                            <ChevronDown className="h-3.5 w-3.5" />
                          </>
                        ) : (
                          <>
                            Collapse
                            <ChevronUp className="h-3.5 w-3.5" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                
                {isPhotoHotspotPhotoGroup ? (
                  <div className="space-y-6">
                    <RoomPhotoPicker
                      baseUrl={baseUrl}
                      selectedUrl={formData['photo-url'] || null}
                      selectedFileId={formData['photo-file-id'] || null}
                      initialRoomTypeId={initialRoomTypeId}
                      onSelect={({ url, fileId }) => {
                        setFormData(prev => ({ ...prev, 'photo-url': url, 'photo-file-id': fileId }));
                      }}
                    />
                    {(() => {
                      const photoUrlField = fieldMap.get('photo-url');
                      return photoUrlField ? renderField(photoUrlField) : null;
                    })()}
                    {(() => {
                      const photoFileIdField = fieldMap.get('photo-file-id');
                      return photoFileIdField ? renderField(photoFileIdField) : null;
                    })()}
                  </div>
                ) : isVisibility ? (
                  // "Active" now lives in the header status banner, so this
                  // section just renders whatever visibility fields remain
                  // (e.g. Member Only).
                  <div className="space-y-6">
                    {(() => {
                      const memberOnlyField = group.fields.find(f => f.slug === 'member-only');
                      return memberOnlyField ? renderField(memberOnlyField) : null;
                    })()}
                  </div>
                ) : isContactSection ? (
                  // 2-column layout: phone/website/maps link on the left,
                  // emails on the right.
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {contactColumn1Fields.map(field => renderField(field))}
                    </div>
                    <div className="space-y-4">
                      {contactColumn2Fields.map(field => renderField(field))}
                    </div>
                  </div>
                ) : isAddressSection ? (
                  // Any other address fields (e.g. Street Address) stack
                  // full-width above a 3-column City / State / Postal Code row.
                  <div className="space-y-6">
                    {addressOtherFields.length > 0 && (
                      <div className="space-y-4">
                        {addressOtherFields.map(field => renderField(field))}
                      </div>
                    )}
                    {addressRowFields.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {addressRowFields.map(field => renderField(field))}
                      </div>
                    )}
                  </div>
                ) : isSocialLinksSection ? (
                  // 2-column layout with sub-headings: social profile links
                  // on the left, other misc. links on the right.
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold mb-3">Socials</h4>
                      {socialsColumnFields.map(field => renderField(field))}
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold mb-3">Other Links</h4>
                      {otherLinksColumnFields.map(field => renderField(field))}
                    </div>
                  </div>
                ) : isFeatureSection ? (
                  // Main "Enable Feature Section" toggle stays at top, above
                  // all 3 feature cards. Each feature block renders as its
                  // own 2-column card: icon preview + upload/replace/remove
                  // controls + alt text on the left, headline + paragraph on
                  // the right.
                  <div className="space-y-6">
                    {featureEnableField && (
                      <div>{renderField(featureEnableField)}</div>
                    )}
                    {featureBlocks.map((block, idx) => {
                      const iconSlug = block.icon?.slug;
                      const imageValue: ImageData | null | undefined = iconSlug ? formData[iconSlug] : undefined;
                      const hasImage = !!imageValue?.url;
                      const isUploading = iconSlug ? !!featureIconUploading[iconSlug] : false;
                      const uploadError = iconSlug ? featureIconError[iconSlug] : null;

                      return (
                        <div
                          key={`feature-block-${idx + 1}`}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start p-5 border rounded-xl bg-background/50 mb-6"
                        >
                          <div className="space-y-4">
                            <div className="max-w-[350px] w-full aspect-square relative rounded-lg overflow-hidden border bg-muted/20 flex items-center justify-center p-2">
                              {hasImage ? (
                                <img
                                  src={imageValue!.url}
                                  alt={imageValue?.alt || block.icon?.displayName || ''}
                                  className="w-full h-full object-contain"
                                />
                              ) : iconSlug ? (
                                <button
                                  type="button"
                                  onClick={() => featureIconFileInputRefs.current[iconSlug]?.click()}
                                  className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-4"
                                >
                                  <Upload className="h-8 w-8" />
                                  <span className="text-xs font-body text-center">Click to upload icon</span>
                                </button>
                              ) : null}
                            </div>

                            {iconSlug && (
                              <>
                                <input
                                  ref={(el) => { featureIconFileInputRefs.current[iconSlug] = el; }}
                                  type="file"
                                  accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) uploadFeatureIcon(iconSlug, file);
                                    e.target.value = '';
                                  }}
                                />

                                {uploadError && (
                                  <p className="text-xs text-destructive font-body">{uploadError}</p>
                                )}

                                <div className="flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => featureIconFileInputRefs.current[iconSlug]?.click()}
                                    disabled={isUploading}
                                    className="font-button"
                                  >
                                    {isUploading ? (
                                      <span className="flex items-center gap-1.5">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...
                                      </span>
                                    ) : hasImage ? 'Replace Image' : 'Upload Image'}
                                  </Button>
                                  {hasImage && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeFeatureIcon(iconSlug)}
                                      className="font-button text-destructive hover:text-destructive"
                                    >
                                      <X className="h-3.5 w-3.5 mr-1" /> Remove
                                    </Button>
                                  )}
                                </div>

                                <div className="space-y-1.5">
                                  <Label htmlFor={block.iconAltSlug} className="font-body text-sm font-medium text-foreground">
                                    Alt Text for accessibility
                                  </Label>
                                  <Input
                                    id={block.iconAltSlug}
                                    type="text"
                                    value={formData[block.iconAltSlug] || ''}
                                    onChange={(e) => {
                                      handleChange(block.iconAltSlug, e.target.value);
                                      if (imageValue?.url) {
                                        handleChange(iconSlug, { ...imageValue, alt: e.target.value });
                                      }
                                    }}
                                    placeholder="Describe this icon..."
                                    className="font-body input-xs"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                          <div className="space-y-4">
                            {block.headline && renderField(block.headline)}
                            {block.paragraph && renderField(block.paragraph)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : isRoomDetails ? (
                  // Clean 2-column layout: specs on the left, bed type +
                  // toggles on the right (bed type sits above the switches)
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <div className="flex flex-col gap-4">
                      {roomDetailsSpecFields.map(field => renderField(field))}
                    </div>
                    <div className="flex flex-col gap-4 pl-6 border-l border-border">
                      {roomDetailsSwitchFields
                        .filter(field => field.slug === 'bed-type')
                        .map(field => renderField(field))}
                      <div className="flex flex-col gap-2 mt-8 pt-2">
                        {roomDetailsSwitchFields
                          .filter(field => roomDetailsSwitchSlugs.has(field.slug))
                          .map(field => renderField(field))}
                      </div>
                    </div>
                  </div>
                ) : isReviewsSection ? (
                  // 12-column layout on desktop: text/input fields take up
                  // 3/4 of the width on the left, "Review Source" option
                  // buttons stack vertically on the right in a narrower,
                  // bordered card with a minimum width so options stay
                  // readable.
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-4">
                      {reviewsLeftFields.map(field => renderField(field))}
                    </div>
                    <div className="md:col-span-4 lg:col-span-3 min-w-[200px] flex flex-col gap-4 p-4 rounded-lg border bg-muted/20">
                      {reviewsRightField && (
                        <div className="flex flex-col gap-2 w-full">
                          {renderField(reviewsRightField)}
                        </div>
                      )}
                    </div>
                  </div>
                ) : isAmenitiesSection ? (() => {
                  const featuresField = fieldMap.get('features-amenities');
                  const policiesField = fieldMap.get('policies');
                  const selectedAmenityIds: string[] = Array.isArray(formData['features-amenities'])
                    ? formData['features-amenities']
                    : [];

                  return (
                    <div className="space-y-6">
                      {!isAmenitiesCollapsed && (
                        <div className="space-y-6">
                          {featuresField && renderField(featuresField)}
                          {selectedAmenityIds.length > 0 && (
                            <AmenitySortingGrid
                              selectedIds={selectedAmenityIds}
                              orderValue={typeof formData['amenity-display-order'] === 'string' ? formData['amenity-display-order'] : ''}
                              amenityOptions={referenceOptions[AMENITIES_COLLECTION_ID] || []}
                              onChange={(orderedIds) => handleChange('amenity-display-order', orderedIds.join(', '))}
                            />
                          )}
                          {policiesField && renderField(policiesField)}
                        </div>
                      )}
                    </div>
                  );
                })() : (
                  (!isAmenitiesSection || !isAmenitiesCollapsed) && (
                  <div className="space-y-6">
                    {/* Show active toggle first if collapsible */}
                    {isCollapsible && activeField && (
                      <div>
                        {renderField(fieldMap.get(activeField)!)}
                      </div>
                    )}
                    
                    {/* Show rest of fields only if active (for collapsible sections) or always (for non-collapsible) */}
                    {(!isCollapsible || isActive) && groupRows.map((row, rowIndex) => {
                      // Skip the active field row if we already rendered it
                      if (isCollapsible && row.fields.some(f => f.slug === activeField)) {
                        return null;
                      }
                      
                      // If single field in row, render normally
                      if (row.fields.length === 1) {
                        const fieldConfig = row.fields[0];
                        const field = fieldMap.get(fieldConfig.slug);
                        if (!field) return null;
                        
                        return (
                          <div key={`${group.name}-${rowIndex}`}>
                            {renderField(field)}
                          </div>
                        );
                      }
                      
                      // Multiple fields in row - use grid
                      const rowSlugs = row.fields.map(f => f.slug);
                      const isHotspotPositionRow =
                        collectionSlug === 'photo-hotspots' &&
                        rowSlugs.includes('x-percent') &&
                        rowSlugs.includes('y-percent');

                      if (isHotspotPositionRow) {
                        const xField = fieldMap.get('x-percent');
                        return (
                          <div key={`${group.name}-${rowIndex}`}>
                            <HotspotPicker
                              photoUrl={formData['photo-url'] || null}
                              xPercent={
                                typeof formData['x-percent'] === 'number' ? formData['x-percent'] : null
                              }
                              yPercent={
                                typeof formData['y-percent'] === 'number' ? formData['y-percent'] : null
                              }
                              required={xField?.required}
                              onChange={(x, y) => {
                                setFormData(prev => ({ ...prev, 'x-percent': x, 'y-percent': y }));
                              }}
                            />
                          </div>
                        );
                      }

                      return (
                        <div key={`${group.name}-${rowIndex}`} className="grid grid-cols-12 gap-4">
                          {row.fields.map(fieldConfig => {
                            const field = fieldMap.get(fieldConfig.slug);
                            if (!field) return null;
                            
                            const layoutClasses = getLayoutClasses(fieldConfig.layout);
                            
                            return (
                              <div key={field.slug} className={layoutClasses}>
                                {renderField(field)}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                  )
                )}
              </section>
            );
          })}
        </div>

        {isAmenitiesCollectionEditor && (
          <section className="space-y-4 pt-8 mt-10 border-t border-border">
            <div>
              <h3 className="text-lg font-heading text-foreground">Connected Room Types</h3>
              <p className="text-sm text-muted-foreground font-body mt-1">
                Choose which Room Types feature this amenity. Toggling a Room Type here updates its
                "Features & Amenities" list for you — no need to edit each Room Type individually.
              </p>
            </div>

            {amenityRoomTypesLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading room types...
              </div>
            ) : amenityRoomTypes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No room types found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {amenityRoomTypes.map(rt => {
                  const isConnected = connectedRoomTypeIds.has(rt.id);
                  return (
                    <label
                      key={rt.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        isConnected ? 'border-primary bg-primary/5' : 'border-border bg-background/50 hover:bg-muted/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isConnected}
                        onChange={() => toggleRoomTypeConnection(rt.id)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm font-body text-foreground truncate">{rt.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </section>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-8 mt-10 border-t border-border sticky bottom-0 bg-background pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Button 
            type="submit" 
            disabled={isSaving}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-button w-full sm:w-auto min-h-[44px]"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => window.history.back()}
            className="font-button w-full sm:w-auto min-h-[44px]"
          >
            Cancel
          </Button>
        </div>
      </form>

      <Dialog
        open={!!taggerImage}
        onOpenChange={(open) => {
          if (!open) setTaggerImage(null);
        }}
      >
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">Tag amenity hotspots</DialogTitle>
          </DialogHeader>
          {taggerImage && (
            <MultiHotspotTagger
              photoUrl={taggerImage.url || ''}
              photoFileId={taggerImage.fileId || ''}
              roomTypeId={itemId && itemId !== 'new' ? itemId : null}
              amenityOptions={taggerAmenityOptions}
              onSubmit={handleTaggerSubmit}
              onCancel={() => setTaggerImage(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
    </ErrorBoundary>
  );
}