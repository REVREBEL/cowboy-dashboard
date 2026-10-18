import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { toast } from 'sonner';
import { Info, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { organizeFieldsByGroup } from '../lib/field-groups';
import { getFieldRows, getLayoutClasses } from '../lib/field-layouts';
import { COLLECTIONS } from '../lib/collections-config';
import ImageUpload from './ImageUpload';
import MultiImageField from './MultiImageField';
import HotspotPicker from './HotspotPicker';
import MultiHotspotTagger, { type HotspotMarker, type AmenityOption } from './MultiHotspotTagger';
import RoomPhotoPicker from './RoomPhotoPicker';
import type { ImageData } from '../lib/image-upload-client';
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
}

interface ItemEditorProps {
  collectionId: string;
  collectionSlug: string;
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

// The "Features & Amenities" and "Policies" fields on Room Types both
// reference the same shared Amenities collection, which has a `type`
// option field (Feature / Amenity / Policy / Accessibility / ...). We only
// want Policies to show Policy-typed items, and Features & Amenities to
// show everything *except* Policy-typed items.
const AMENITIES_COLLECTION_ID = '6abc8175a7bbdc92fa9e6599';
const AMENITY_POLICY_TYPE_ID = '7c93dc1078791efcf798aff5800d16a3';

function filterReferenceOptionsForField(field: Field, options: ReferenceOption[]): ReferenceOption[] {
  if (field.validations?.collectionId !== AMENITIES_COLLECTION_ID) return options;
  if (field.slug === 'policies') {
    return options.filter(o => o.type === AMENITY_POLICY_TYPE_ID);
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
                items?: Array<{ id: string; fieldData?: { name?: string; type?: string | null } }>;
                pagination?: { total?: number };
              };
              const pageItems = data.items || [];
              pageItems.forEach(it => {
                items.push({ id: it.id, name: it.fieldData?.name || it.id, type: it.fieldData?.type ?? null });
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
      const res = await fetch(`${baseUrl}/api/cms/${PHOTO_HOTSPOTS_COLLECTION.id}/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string };
        throw new Error(err.error || `Failed to save hotspots: ${res.statusText}`);
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

    switch (field.type) {
      case 'PlainText':
      case 'Email':
      case 'Phone':
        const isSingleLine = field.validations?.singleLine !== false;
        const isCallToAction = field.slug === 'call-to-action';
        const inputSizeClass = isCallToAction ? 'input-sm' : 'input-xs';
        
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
                className={`font-body resize-y ${inputSizeClass}`}
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
              className={`font-body ${inputSizeClass}`}
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
            onTagHotspot={canTagHotspot ? handleTagHotspot : undefined}
          />
        );

      case 'Option':
        const options: Array<{ id: string; name: string }> = field.validations?.options || [];
        const isColorField = field.slug === 'button-color' || field.slug === 'text-color';
        
        return (
          <div key={field.slug} className="space-y-2">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <div className={isColorField ? "grid grid-cols-2 sm:grid-cols-3 gap-2" : "flex flex-wrap gap-2"}>
              {options.map((option: { id: string; name: string }) => {
                const normalizedName = option.name.toLowerCase().replace(/\s+/g, '-');
                const colorHex = isColorField ? COLOR_MAP[normalizedName] : null;
                
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleChange(field.slug, option.id)}
                    className={`px-3 py-2 border font-body text-sm transition-colors flex items-center gap-2 ${
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

        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <div className="flex flex-wrap gap-2 border border-border p-3 bg-background min-h-[3rem]">
              {isLoadingOptions && refOptions.length === 0 && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-body">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading options...
                </span>
              )}
              {!isLoadingOptions && refOptions.length === 0 && (
                <span className="text-sm text-muted-foreground font-body">No options available</span>
              )}
              {refOptions.map(option => {
                const isSelected = selectedIds.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleId(option.id)}
                    className={`px-3 py-1.5 border font-body text-sm transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>
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
  const organizedFields = organizeFieldsByGroup(collectionSlug, fields);

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
  const fieldRows = getFieldRows(collectionSlug, fields);
  
  // Create a map of field slug to field object for quick lookup
  const fieldMap = new Map(fields.map(f => [f.slug, f]));

  return (
    <>
    <form onSubmit={handleSubmit} className="w-full">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive text-destructive font-body text-sm">
            {error}
          </div>
        )}

        <div className="space-y-10">
          {organizedFields.map((group) => {
            // Get the field slugs in this group
            const groupFieldSlugs = new Set(group.fields.map(f => f.slug));
            
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

            return (
              <section key={group.name} className="space-y-6">
                <div className="pb-3 border-b border-border">
                  <h2 className="font-heading text-base font-semibold text-foreground">{group.name}</h2>
                  {group.description && (
                    <p className="text-sm text-muted-foreground font-body mt-1">{group.description}</p>
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
                  // Special layout for Visibility: Active first, then Member Only
                  <div className="space-y-6">
                    {/* Render Active first */}
                    {(() => {
                      const activeField = group.fields.find(f => f.slug === 'active');
                      return activeField ? renderField(activeField) : null;
                    })()}
                    
                    {/* Render Member Only second */}
                    {(() => {
                      const memberOnlyField = group.fields.find(f => f.slug === 'member-only');
                      return memberOnlyField ? renderField(memberOnlyField) : null;
                    })()}
                  </div>
                ) : (
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
                )}
              </section>
            );
          })}
        </div>

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
  );
}

























































