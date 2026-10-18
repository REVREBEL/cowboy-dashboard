





import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ImageOff, Loader2, Pencil, Tag } from 'lucide-react';
import RoomPhotoPicker from './RoomPhotoPicker';
import { fetchAllPhotoHotspots, hotspotsForPhoto, type PhotoHotspotItem } from '../lib/photo-hotspots';

interface HotspotReviewProps {
  baseUrl: string;
  initialRoomTypeId?: string;
  initialPhotoUrl?: string;
  initialPhotoFileId?: string;
}

export default function HotspotReview({
  baseUrl,
  initialRoomTypeId,
  initialPhotoUrl,
  initialPhotoFileId,
}: HotspotReviewProps) {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(initialPhotoUrl || null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(initialPhotoFileId || null);
  const [roomTypeId, setRoomTypeId] = useState<string | undefined>(initialRoomTypeId);

  const [allHotspots, setAllHotspots] = useState<PhotoHotspotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const items = await fetchAllPhotoHotspots(baseUrl);
        if (!cancelled) setAllHotspots(items);
      } catch (err) {
        console.error('Failed to load photo hotspots', err);
        if (!cancelled) setLoadError("Couldn't load Photo Hotspots.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [baseUrl]);

  useEffect(() => {
    setImageError(false);
  }, [selectedUrl, selectedFileId]);

  const matches = useMemo(
    () => hotspotsForPhoto(allHotspots, selectedFileId, selectedUrl),
    [allHotspots, selectedFileId, selectedUrl]
  );

  const hasSelectedPhoto = Boolean(selectedUrl || selectedFileId);

  return (
    <div className="space-y-6">
      <RoomPhotoPicker
        baseUrl={baseUrl}
        selectedUrl={selectedUrl}
        selectedFileId={selectedFileId}
        onSelect={(photo) => {
          setSelectedUrl(photo.url);
          setSelectedFileId(photo.fileId || null);
        }}
        initialRoomTypeId={roomTypeId}
        onRoomTypeChange={setRoomTypeId}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg text-foreground">Tagged amenities on this photo</h2>
          {loading && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading tags&hellip;
            </span>
          )}
        </div>

        {loadError && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-body">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {loadError}
          </div>
        )}

        {!hasSelectedPhoto ? (
          <div className="flex items-center gap-2 border border-dashed border-border bg-muted/50 px-4 py-6 text-sm text-muted-foreground font-body">
            <Tag className="h-4 w-4 flex-shrink-0" />
            Pick a Room Type and photo above to review its tagged hotspots.
          </div>
        ) : selectedUrl && !imageError ? (
          <div className="space-y-3">
            <div className="relative inline-block max-w-full border border-border bg-muted select-none">
              <img
                src={selectedUrl}
                alt="Photo being reviewed for tagged hotspots"
                draggable={false}
                onError={() => setImageError(true)}
                className="block max-w-full h-auto max-h-[560px]"
              />
              {matches.map((hotspot, index) => {
                if (hotspot.xPercent === null || hotspot.yPercent === null) return null;
                const isHighlighted = highlightedId === hotspot.id;
                const isInactive = !hotspot.active;
                return (
                  <div
                    key={hotspot.id}
                    className="absolute"
                    style={{
                      left: `${hotspot.xPercent}%`,
                      top: `${hotspot.yPercent}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isHighlighted ? 20 : 10,
                    }}
                    title={`${hotspot.name}${isInactive ? ' (inactive)' : ''}`}
                  >
                    <span
                      className={
                        isInactive
                          ? 'flex items-center justify-center w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground bg-background text-muted-foreground text-sm font-bold leading-none font-body'
                          : 'flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-accent text-white text-sm font-bold leading-none shadow-lg font-body'
                      }
                      style={
                        !isInactive && isHighlighted
                          ? { boxShadow: '0 0 0 5px rgba(214, 82, 65, 0.4), 0 2px 6px rgba(0,0,0,0.3)' }
                          : undefined
                      }
                    >
                      {index + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            {matches.length === 0 && !loading && (
              <div className="flex items-center gap-2 border border-dashed border-border bg-muted/50 px-4 py-6 text-sm text-muted-foreground font-body">
                <Tag className="h-4 w-4 flex-shrink-0" />
                No hotspots are tagged on this photo yet.
              </div>
            )}

            {matches.length > 0 && (
              <ul className="divide-y divide-border border border-border">
                {matches.map((hotspot, index) => {
                  const isInactive = !hotspot.active;
                  return (
                    <li
                      key={hotspot.id}
                      className={
                        isInactive
                          ? 'flex items-center justify-between gap-3 px-3 py-2 bg-muted/30 opacity-70'
                          : 'flex items-center justify-between gap-3 px-3 py-2 bg-background hover:bg-muted/40 transition-colors'
                      }
                      onMouseEnter={() => setHighlightedId(hotspot.id)}
                      onMouseLeave={() => setHighlightedId(null)}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span
                          className={
                            isInactive
                              ? 'flex items-center justify-center w-6 h-6 rounded-full border-2 border-dashed border-muted-foreground text-muted-foreground text-xs font-bold leading-none flex-shrink-0 font-body'
                              : 'flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-accent text-white text-xs font-bold leading-none shadow-md flex-shrink-0 font-body'
                          }
                        >
                          {index + 1}
                        </span>
                        <span
                          className={
                            isInactive
                              ? 'font-body text-sm text-muted-foreground truncate'
                              : 'font-body text-sm text-foreground truncate'
                          }
                        >
                          {hotspot.name}
                          {isInactive && <span className="italic"> (inactive)</span>}
                        </span>
                      </span>
                      <a
                        href={`${baseUrl}/portal/photo-hotspots/${hotspot.id}`}
                        className="flex items-center gap-1 text-xs font-body text-accent hover:underline flex-shrink-0"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 border border-dashed border-border bg-muted/50 px-4 py-6 text-sm text-muted-foreground font-body">
            <ImageOff className="h-4 w-4 flex-shrink-0" />
            Couldn't load that photo.
          </div>
        )}
      </div>
    </div>
  );
}






