import React, { useCallback, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ImageOff, MousePointerClick, X } from 'lucide-react';

export interface HotspotMarker {
  id: string;
  x: number;
  y: number;
  amenityId: string;
}

export interface AmenityOption {
  id: string;
  name: string;
}

interface MultiHotspotTaggerProps {
  photoUrl: string;
  photoFileId: string;
  roomTypeId: string | null;
  amenityOptions: AmenityOption[];
  startDisplayOrder?: number;
  onSubmit: (markers: HotspotMarker[]) => Promise<void> | void;
  onCancel: () => void;
}

function clampAndRound(value: number): number {
  const clamped = Math.min(100, Math.max(0, value));
  // 1 decimal place matches the field's configured precision in Webflow.
  return Math.round(clamped * 10) / 10;
}

function makeId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `marker-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function MultiHotspotTagger({
  photoUrl,
  photoFileId,
  roomTypeId,
  amenityOptions,
  onSubmit,
  onCancel,
}: MultiHotspotTaggerProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [markers, setMarkers] = useState<HotspotMarker[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!pos) return;
    setError(null);
    setMarkers((prev) => [...prev, { id: makeId(), x: pos.x, y: pos.y, amenityId: '' }]);
  };

  const handleMarkerPointerDown = (id: string) => (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingId(id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleMarkerPointerMove = (id: string) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingId !== id) return;
    const pos = positionFromPointer(e.clientX, e.clientY);
    if (!pos) return;
    setMarkers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, x: pos.x, y: pos.y } : m))
    );
  };

  const handleMarkerPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDraggingId(null);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // no-op — capture may already be released
    }
  };

  const updateMarkerAmenity = (id: string, amenityId: string) => {
    setMarkers((prev) => prev.map((m) => (m.id === id ? { ...m, amenityId } : m)));
  };

  const removeMarker = (id: string) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  const unassignedCount = markers.filter((m) => !m.amenityId).length;

  const handleSave = async () => {
    if (markers.length === 0) {
      setError('Place at least one marker on the photo before saving.');
      return;
    }
    if (unassignedCount > 0) {
      setError(
        `${unassignedCount} marker${unassignedCount === 1 ? '' : 's'} still need an amenity assigned.`
      );
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit(markers);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="font-body text-sm font-medium text-foreground">
          Tag amenity hotspots
        </Label>
        <span className="text-xs text-muted-foreground font-body">
          {markers.length} marker{markers.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        {photoUrl && !imageError ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-body flex items-center gap-1.5">
              <MousePointerClick className="h-3.5 w-3.5 flex-shrink-0" />
              Click anywhere on the photo to drop a new marker, or drag an existing one to reposition.
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
              {markers.map((marker, index) => (
                <div
                  key={marker.id}
                  role="button"
                  aria-label={`Marker ${index + 1} — drag to reposition`}
                  onPointerDown={handleMarkerPointerDown(marker.id)}
                  onPointerMove={handleMarkerPointerMove(marker.id)}
                  onPointerUp={handleMarkerPointerUp}
                  className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-accent border-2 border-white shadow-md cursor-grab active:cursor-grabbing flex items-center justify-center text-[11px] font-semibold text-white"
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 border border-dashed border-border bg-muted/50 px-4 py-6 text-sm text-muted-foreground font-body">
            <ImageOff className="h-4 w-4 flex-shrink-0" />
            {photoUrl
              ? "Couldn't load that photo URL — double-check it's a published Webflow image URL."
              : 'Select a photo to enable click-to-place positioning.'}
          </div>
        )}

        <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
          {markers.length === 0 && (
            <p className="text-xs text-muted-foreground font-body border border-dashed border-border px-3 py-4 text-center">
              No markers yet. Click the photo to add one.
            </p>
          )}
          {markers.map((marker, index) => (
            <div
              key={marker.id}
              className="flex items-center gap-2 border border-border bg-card px-2 py-2"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent text-white text-[11px] font-semibold flex items-center justify-center">
                {index + 1}
              </span>
              <Select
                value={marker.amenityId}
                onValueChange={(val) => updateMarkerAmenity(marker.id, val)}
              >
                <SelectTrigger className="font-body flex-1">
                  <SelectValue placeholder="Choose amenity…" />
                </SelectTrigger>
                <SelectContent>
                  {amenityOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      {opt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                type="button"
                aria-label={`Remove marker ${index + 1}`}
                onClick={() => removeMarker(marker.id)}
                className="flex-shrink-0 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-destructive font-body">{error}</p>}

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSave} disabled={submitting}>
          {submitting ? 'Saving…' : `Save ${markers.length || ''} hotspot${markers.length === 1 ? '' : 's'}`}
        </Button>
      </div>
    </div>
  );
}
