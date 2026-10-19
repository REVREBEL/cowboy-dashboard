import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export interface AmenityTileOption {
  id: string;
  name: string;
  image?: { url: string } | null;
}

interface AmenitySortingGridProps {
  /** Ids currently selected via the "Features & Amenities" field. */
  selectedIds: string[];
  /** Raw comma-separated id order currently stored in `amenity-display-order`. */
  orderValue: string;
  /** Loaded amenity reference options, used to resolve name/image per id. */
  amenityOptions: AmenityTileOption[];
  /** Called with the new ordered id list whenever the order changes. */
  onChange: (orderedIds: string[]) => void;
}

/**
 * Visual, sortable grid of the amenities currently selected on a Room Type,
 * used to drive the `amenity-display-order` PlainText field (a
 * comma-separated list of Amenity item ids) instead of leaving editors to
 * hand-type ids into a raw text field.
 */
export default function AmenitySortingGrid({
  selectedIds,
  orderValue,
  amenityOptions,
  onChange,
}: AmenitySortingGridProps) {
  const parsedOrder = useMemo(
    () => orderValue.split(',').map(s => s.trim()).filter(Boolean),
    [orderValue]
  );

  // Merge: keep the existing order for ids that are still selected, append
  // any newly-selected ids that aren't in the saved order yet, and drop ids
  // that were unselected.
  const orderedIds = useMemo(() => {
    const selectedSet = new Set(selectedIds);
    const fromSavedOrder = parsedOrder.filter(id => selectedSet.has(id));
    const newlySelected = selectedIds.filter(id => !fromSavedOrder.includes(id));
    return [...fromSavedOrder, ...newlySelected];
  }, [selectedIds, parsedOrder]);

  const orderedKey = orderedIds.join(',');

  // Keep the backing form field in sync whenever the derived order differs
  // from what's currently stored (e.g. right after an amenity is
  // checked/unchecked in the Features & Amenities field above).
  useEffect(() => {
    if (parsedOrder.join(',') !== orderedKey) {
      onChange(orderedIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderedKey]);

  if (selectedIds.length === 0) return null;

  const amenityMap = new Map(amenityOptions.map(a => [a.id, a]));

  const moveTile = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= orderedIds.length) return;
    const next = [...orderedIds];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        {orderedIds.map((id, index) => {
          const amenity = amenityMap.get(id);
          const name = amenity?.name || id;
          const imageUrl = amenity?.image?.url;

          return (
            <div key={id} className="flex flex-col items-center gap-1">
              {imageUrl ? (
                <div className="w-[75px] h-[75px] flex items-center justify-center rounded-xl border bg-background overflow-hidden p-1.5 shadow-sm">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              ) : (
                <div className="w-[75px] h-[75px] flex flex-col items-center justify-center p-1 bg-background border rounded-md shadow-sm text-center">
                  <Sparkles className="w-4.5 h-4.5 text-muted-foreground" style={{ fontSize: '18px' }} />
                  <span className="text-[10px] font-medium leading-tight line-clamp-2 mt-1 font-body text-foreground">
                    {name}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveTile(index, -1)}
                  disabled={index === 0}
                  className="p-1 rounded border border-border bg-background hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label={`Move ${name} earlier`}
                >
                  <ArrowLeft className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => moveTile(index, 1)}
                  disabled={index === orderedIds.length - 1}
                  className="p-1 rounded border border-border bg-background hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label={`Move ${name} later`}
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}




