import { useEffect, useState } from 'react';
import { ChevronsUpDown, ImageOff, Loader2, Search } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  ROOM_TYPES_COLLECTION_ID,
  extractPhotosFromFieldData,
  type RoomTypePhoto,
  type RoomTypeSummary,
} from '../lib/room-type-photos';

interface RoomPhotoPickerProps {
  baseUrl: string;
  selectedUrl: string | null;
  selectedFileId: string | null;
  onSelect: (photo: { url: string; fileId: string }) => void;
  /** Pre-selects this Room Type in the dropdown on first render. */
  initialRoomTypeId?: string;
  /** Fired whenever the selected Room Type changes (including on mount, if `initialRoomTypeId` is set). */
  onRoomTypeChange?: (roomTypeId: string) => void;
}

export default function RoomPhotoPicker({
  baseUrl,
  selectedUrl,
  selectedFileId,
  onSelect,
  initialRoomTypeId,
  onRoomTypeChange,
}: RoomPhotoPickerProps) {
  const [roomTypes, setRoomTypes] = useState<RoomTypeSummary[]>([]);
  const [loadingRoomTypes, setLoadingRoomTypes] = useState(false);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<string>(initialRoomTypeId || '');
  const [photos, setPhotos] = useState<RoomTypePhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Load the list of Room Types once, up front, so the dropdown is ready.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoadingRoomTypes(true);
      setLoadError(null);
      try {
        const items: RoomTypeSummary[] = [];
        const limit = 100;
        let offset = 0;
        let total = Infinity;

        while (offset < total) {
          const res = await fetch(
            `${baseUrl}/api/cms/${ROOM_TYPES_COLLECTION_ID}?limit=${limit}&offset=${offset}`
          );
          if (!res.ok) break;
          const data = (await res.json()) as {
            items?: Array<{ id: string; fieldData?: { name?: string } }>;
            pagination?: { total?: number };
          };
          const pageItems = data.items || [];
          pageItems.forEach((it) => {
            items.push({ id: it.id, name: it.fieldData?.name || it.id });
          });
          total = data.pagination?.total ?? pageItems.length;
          offset += limit;
          if (pageItems.length === 0) break;
        }

        items.sort((a, b) => a.name.localeCompare(b.name));
        if (!cancelled) setRoomTypes(items);
      } catch (err) {
        console.error('Failed to load room types', err);
        if (!cancelled) setLoadError("Couldn't load room types.");
      } finally {
        if (!cancelled) setLoadingRoomTypes(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [baseUrl]);

  // Load the photos for the selected Room Type.
  useEffect(() => {
    if (!selectedRoomTypeId) {
      setPhotos([]);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoadingPhotos(true);
      setLoadError(null);
      try {
        const res = await fetch(`${baseUrl}/api/cms/${ROOM_TYPES_COLLECTION_ID}/${selectedRoomTypeId}`);
        if (!res.ok) throw new Error('Request failed');
        const item = (await res.json()) as { fieldData?: Record<string, any> };
        const extracted = extractPhotosFromFieldData(item.fieldData || {});
        if (!cancelled) setPhotos(extracted);
      } catch (err) {
        console.error('Failed to load photos for room type', selectedRoomTypeId, err);
        if (!cancelled) {
          setLoadError("Couldn't load that room type's photos.");
          setPhotos([]);
        }
      } finally {
        if (!cancelled) setLoadingPhotos(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [baseUrl, selectedRoomTypeId]);

  // Let the parent know which Room Type is selected (e.g. so it can filter
  // the Amenity dropdown to only this room's attached amenities).
  useEffect(() => {
    if (selectedRoomTypeId) {
      onRoomTypeChange?.(selectedRoomTypeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomTypeId]);

  const handleRoomTypeChange = (value: string) => {
    setSelectedRoomTypeId(value);
  };

  const filteredPhotos = search.trim()
    ? photos.filter((p) => p.source.toLowerCase().includes(search.trim().toLowerCase()))
    : photos;

  const isPhotoSelected = (photo: RoomTypePhoto) =>
    (photo.fileId && photo.fileId === selectedFileId) ||
    (!photo.fileId && photo.url === selectedUrl);

  return (
    <div className="space-y-3 border border-border bg-muted/30 p-4">
      <div className="flex items-center gap-1.5">
        <ChevronsUpDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <Label className="font-body text-sm font-medium text-foreground">
          Choose an existing room photo
        </Label>
      </div>
      <p className="text-xs text-muted-foreground font-body">
        Pick the Room Type this photo lives on, then click a thumbnail to tag it here. This fills in the
        Photo URL and Photo File ID fields below automatically — or paste a URL manually if the photo isn't
        in a Room Type gallery yet.
      </p>

      <Select value={selectedRoomTypeId} onValueChange={handleRoomTypeChange}>
        <SelectTrigger className="font-body w-full bg-background">
          <SelectValue placeholder={loadingRoomTypes ? 'Loading room types...' : 'Select a room type'} />
        </SelectTrigger>
        <SelectContent>
          {roomTypes.map((rt) => (
            <SelectItem key={rt.id} value={rt.id}>
              {rt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedRoomTypeId && (
        <>
          {photos.length > 3 && (
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter photos (e.g. hero, gallery)"
                className="font-body text-sm pl-8 bg-background"
              />
            </div>
          )}

          {loadingPhotos ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-body py-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading photos...
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-body py-4">
              <ImageOff className="h-4 w-4 flex-shrink-0" />
              No photos found on this room type yet.
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {filteredPhotos.map((photo, i) => {
                const selected = isPhotoSelected(photo);
                return (
                  <button
                    key={photo.fileId || photo.url || i}
                    type="button"
                    onClick={() => onSelect({ url: photo.url, fileId: photo.fileId || '' })}
                    title={photo.source}
                    className={`group relative aspect-square border-2 bg-muted overflow-hidden focus:outline-none transition-colors ${
                      selected ? 'border-accent ring-2 ring-accent/50' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.alt || photo.source}
                      className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[10px] font-body px-1 py-0.5 truncate">
                      {photo.source}
                    </span>
                    {selected && (
                      <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-accent border border-white shadow-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {loadError && <p className="text-xs text-destructive font-body">{loadError}</p>}
    </div>
  );
}




