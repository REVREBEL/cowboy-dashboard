import { useMemo } from 'react';
import { Info, Lock, LockOpen, Sparkles } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface RestrictedAmenityTileOption {
  id: string;
  name: string;
  image?: { url: string } | null;
}

interface RestrictedAmenitiesPickerProps {
  /** Ids currently selected via the "Features & Amenities" field. */
  selectedIds: string[];
  /** Raw comma-separated id order currently stored in `amenity-display-order`,
   *  used purely to keep the tile order consistent with the sorting grid
   *  above (not read/written by this component). */
  orderValue: string;
  /** Raw comma-separated id list currently stored in `restricted-amenity-ids`. */
  restrictedValue: string;
  /** Loaded amenity reference options, used to resolve name/image per id. */
  amenityOptions: RestrictedAmenityTileOption[];
  /** Called with the new restricted id list whenever a toggle changes. */
  onChange: (restrictedIds: string[]) => void;
}

/**
 * Lets an editor flag specific amenities (from the ones already selected in
 * "Features & Amenities") as "restricted" — meaning they should NOT appear
 * in the general amenities list on the live site unless that same amenity
 * is also tagged directly on one of this Room Type's photos via a Photo
 * Hotspot. Drives the `restricted-amenity-ids` PlainText field (a
 * comma-separated list of Amenity item ids), mirroring the pattern used by
 * `amenity-display-order` / AmenitySortingGrid.
 */
export default function RestrictedAmenitiesPicker({
  selectedIds,
  orderValue,
  restrictedValue,
  amenityOptions,
  onChange,
}: RestrictedAmenitiesPickerProps) {
  const parsedOrder = useMemo(
    () => orderValue.split(',').map((s) => s.trim()).filter(Boolean),
    [orderValue]
  );

  const restrictedSet = useMemo(
    () => new Set(restrictedValue.split(',').map((s) => s.trim()).filter(Boolean)),
    [restrictedValue]
  );

  // Display in the same order as the sorting grid when available, falling
  // back to selection order for any ids not yet present in the saved order.
  const orderedIds = useMemo(() => {
    const selectedSet = new Set(selectedIds);
    const fromSavedOrder = parsedOrder.filter((id) => selectedSet.has(id));
    const remaining = selectedIds.filter((id) => !fromSavedOrder.includes(id));
    return [...fromSavedOrder, ...remaining];
  }, [selectedIds, parsedOrder]);

  if (selectedIds.length === 0) return null;

  const amenityMap = new Map(amenityOptions.map((a) => [a.id, a]));

  const toggleRestricted = (id: string) => {
    const next = new Set(restrictedSet);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    // Keep output ordered consistently with the tile order for readability.
    onChange(orderedIds.filter((oid) => next.has(oid)));
  };

  return (
    <div className="space-y-3 p-4 border rounded-xl bg-background/50">
      <div>
        <h4 className="text-sm font-bold tracking-wide text-foreground flex items-center gap-2">
          <Lock className="w-3.5 h-3.5" />
          Restrict amenities to photo tags
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="What does restricting an amenity do?"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              Toggle an amenity "on" here to hide it from the general amenities list on the live
              site unless it's also tagged directly on one of this Room Type's photos (via a
              Photo Hotspot). Leave untouched to keep an amenity always visible.
            </TooltipContent>
          </Tooltip>
        </h4>
      </div>

      <div className="flex flex-wrap gap-3">
        {orderedIds.map((id) => {
          const amenity = amenityMap.get(id);
          const name = amenity?.name || id;
          const imageUrl = amenity?.image?.url;
          const isRestricted = restrictedSet.has(id);

          return (
            <button
              key={id}
              type="button"
              onClick={() => toggleRestricted(id)}
              aria-pressed={isRestricted}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-colors ${
                isRestricted
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:bg-muted/30'
              }`}
            >
              <div className="relative">
                {imageUrl ? (
                  <div className="w-[60px] h-[60px] flex items-center justify-center rounded-lg border bg-background overflow-hidden p-1">
                    <img
                      src={imageUrl}
                      alt={name}
                      className={`w-full h-full object-contain select-none pointer-events-none ${
                        isRestricted ? 'opacity-60' : ''
                      }`}
                    />
                  </div>
                ) : (
                  <div className="w-[60px] h-[60px] flex flex-col items-center justify-center p-1 bg-background border rounded-md text-center">
                    <Sparkles className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
                <div
                  className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center border ${
                    isRestricted
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-background border-border text-muted-foreground'
                  }`}
                >
                  {isRestricted ? <Lock className="w-3 h-3" /> : <LockOpen className="w-3 h-3" />}
                </div>
              </div>
              <span className="text-[10px] font-medium leading-tight line-clamp-2 font-body text-foreground max-w-[70px]">
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
