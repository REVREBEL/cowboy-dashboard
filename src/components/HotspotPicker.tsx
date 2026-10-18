import React, { useCallback, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageOff, MousePointerClick } from 'lucide-react';

interface HotspotPickerProps {
  photoUrl: string | null;
  xPercent: number | null;
  yPercent: number | null;
  onChange: (xPercent: number, yPercent: number) => void;
  required?: boolean;
}

function clampAndRound(value: number): number {
  const clamped = Math.min(100, Math.max(0, value));
  // 1 decimal place matches the field's configured precision in Webflow.
  return Math.round(clamped * 10) / 10;
}

export default function HotspotPicker({
  photoUrl,
  xPercent,
  yPercent,
  onChange,
  required,
}: HotspotPickerProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasPosition = typeof xPercent === 'number' && typeof yPercent === 'number';

  const positionFromPointer = useCallback((clientX: number, clientY: number) => {
    const el = imageRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const x = clampAndRound(((clientX - rect.left) / rect.width) * 100);
    const y = clampAndRound(((clientY - rect.top) / rect.height) * 100);
    return { x, y };
  }, []);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const pos = positionFromPointer(e.clientX, e.clientY);
    if (pos) onChange(pos.x, pos.y);
  };

  const handleMarkerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleMarkerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const pos = positionFromPointer(e.clientX, e.clientY);
    if (pos) onChange(pos.x, pos.y);
  };

  const handleMarkerPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // no-op — capture may already be released
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        <Label className="font-body text-sm font-medium text-foreground">
          Marker position
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      </div>

      {photoUrl && !imageError ? (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-body flex items-center gap-1.5">
            <MousePointerClick className="h-3.5 w-3.5 flex-shrink-0" />
            Click anywhere on the photo to drop the marker, or drag it to reposition.
          </p>
          <div
            className="relative inline-block max-w-full border border-border bg-muted select-none"
            style={{ touchAction: 'none' }}
          >
            <img
              ref={imageRef}
              src={photoUrl}
              alt="Room photo for hotspot placement"
              draggable={false}
              onClick={handleImageClick}
              onError={() => setImageError(true)}
              className="block max-w-full h-auto max-h-[480px] cursor-crosshair"
            />
            {hasPosition && (
              <div
                role="button"
                aria-label="Drag to reposition marker"
                onPointerDown={handleMarkerPointerDown}
                onPointerMove={handleMarkerPointerMove}
                onPointerUp={handleMarkerPointerUp}
                className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-accent border-2 border-white shadow-md cursor-grab active:cursor-grabbing"
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                }}
              >
                <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-50" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 border border-dashed border-border bg-muted/50 px-4 py-6 text-sm text-muted-foreground font-body">
          <ImageOff className="h-4 w-4 flex-shrink-0" />
          {photoUrl
            ? "Couldn't load that photo URL — double-check it's a published Webflow image URL."
            : 'Add a Photo URL above to enable click-to-place positioning.'}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="x-percent" className="font-body text-xs text-muted-foreground">
            X percent (left edge = 0, right edge = 100)
          </Label>
          <Input
            id="x-percent"
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={xPercent ?? ''}
            onChange={(e) => {
              const val = e.target.value ? clampAndRound(parseFloat(e.target.value)) : 0;
              onChange(val, yPercent ?? 0);
            }}
            className="font-body"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="y-percent" className="font-body text-xs text-muted-foreground">
            Y percent (top edge = 0, bottom edge = 100)
          </Label>
          <Input
            id="y-percent"
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={yPercent ?? ''}
            onChange={(e) => {
              const val = e.target.value ? clampAndRound(parseFloat(e.target.value)) : 0;
              onChange(xPercent ?? 0, val);
            }}
            className="font-body"
          />
        </div>
      </div>
    </div>
  );
}
