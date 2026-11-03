import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Upload, X, AlertCircle, MapPin, Tags, Pencil, RefreshCw, GripVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { uploadImageFile, type ImageData } from '../lib/image-upload-client';
import { extractAssetIds, hotspotsForPhoto, type PhotoHotspotItem } from '../lib/photo-hotspots-utils';
import { cn } from '../lib/utils';

/**
 * Resolves the best available asset id for a photo: the explicit `fileId`
 * from the upload response, falling back to a legacy `id` field (some older
 * records store the asset id there instead), and finally falling back to any
 * 24-hex-char asset id embedded directly in the photo's CDN `url` — so
 * matching/re-keying still works even if `fileId` wasn't persisted.
 */
function resolveFileId(photo: { fileId?: string | null; id?: string | null; url?: string | null }): string | undefined {
  return photo.fileId || photo.id || extractAssetIds(photo.url)[0] || undefined;
}

interface FieldLabelProps {
  displayName: string;
  isRequired?: boolean;
  helpText?: string;
}

function Header({ displayName, isRequired, helpText }: FieldLabelProps) {
  return (
    <div className="space-y-0.5">
      <Label className="font-body text-sm font-medium text-foreground">
        {displayName}
        {isRequired && <span className="text-destructive ml-1">*</span>}
      </Label>
      {helpText && <p className="text-xs text-muted-foreground font-body">{helpText}</p>}
    </div>
  );
}

interface MultiImageFieldProps {
  value: (ImageData | null)[] | null | undefined;
  onChange: (value: ImageData[]) => void;
  label: string;
  required?: boolean;
  helpText?: string;
  baseUrl: string;
  /** When provided, shows a "Tag hotspot" action on each photo that hands the image off to the Photo Hotspots flow. */
  onTagHotspot?: (image: ImageData) => void;
  /** When provided, shows a "Review" action on each photo that opens the read-only hotspot review view for it. */
  onReviewHotspots?: (image: ImageData) => void;
  /**
   * All published Photo Hotspots (from across every Room Type), used to show — right on
   * each photo's thumbnail and modal — every amenity already tagged on it, all at once,
   * instead of requiring a click-through per hotspot.
   */
  photoHotspots?: PhotoHotspotItem[];
  /**
   * The Room Type item this gallery belongs to (only when it's a saved item, i.e. not
   * `'new'`). When provided, replacing a photo also re-points any Photo Hotspots pinned
   * to the old file at the new one via `/api/cms/rekey-photo`, so existing amenity tags
   * aren't orphaned.
   */
  roomTypeId?: string | null;
  /**
   * Called after a successful photo replace + hotspot re-key, so the caller can update
   * its own `photoHotspots` state in place (re-pointing matched hotspots at the new
   * photo) without requiring a page refresh.
   */
  onPhotoRekeyed?: (
    oldPhoto: { fileId?: string | null; url?: string | null },
    newPhoto: { fileId: string; url: string },
    updatedCount: number
  ) => void;
}

export default function MultiImageField({
  value,
  onChange,
  label,
  required,
  helpText,
  baseUrl,
  onTagHotspot,
  onReviewHotspots,
  photoHotspots,
  roomTypeId,
  onPhotoRekeyed,
}: MultiImageFieldProps) {
  const images = (value || []).filter((img): img is ImageData => !!img?.url);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeAlt, setActiveAlt] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Thumbnail reordering via native HTML5 drag-and-drop. `draggedIndex` tracks
  // the image currently being dragged (via its grip handle); `dragOverIndex`
  // tracks whichever thumbnail the pointer is currently hovering over, so we
  // can show a drop-target highlight.
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // "Replace Photo" — swaps the file backing an existing gallery slot in place,
  // preserving its position (and alt text) in the images array.
  const [replaceTargetIndex, setReplaceTargetIndex] = useState<number | null>(null);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
  const [replaceError, setReplaceError] = useState<string | null>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  const getMatches = (img: ImageData) =>
    photoHotspots ? hotspotsForPhoto(photoHotspots, img.fileId || null, img.url || null) : [];

  const activeMatches = activeImage ? getMatches(activeImage).filter((h) => h.active) : [];
  const inactiveMatches = activeImage ? getMatches(activeImage).filter((h) => !h.active) : [];
  const allMatches = activeImage ? getMatches(activeImage) : [];

  const openModal = (index: number) => {
    setActiveIndex(index);
    setActiveAlt(images[index]?.alt || '');
    setHighlightedId(null);
  };

  const closeModal = () => {
    setActiveIndex(null);
    setActiveAlt('');
  };

  const handleAltSave = (newAlt: string) => {
    setActiveAlt(newAlt);
    if (activeIndex === null) return;
    const updated = [...images];
    updated[activeIndex] = { ...updated[activeIndex], alt: newAlt };
    onChange(updated);
  };

  const handleRemoveActive = () => {
    if (activeIndex === null) return;
    const updated = [...images];
    updated.splice(activeIndex, 1);
    onChange(updated);
    closeModal();
  };

  const uploadFiles = async (files: FileList | File[]) => {
    setUploading(true);
    setUploadError(null);

    const fileArray = Array.from(files);
    const uploaded: ImageData[] = [];

    try {
      for (const file of fileArray) {
        const img = await uploadImageFile(file, baseUrl);
        uploaded.push({ ...img, alt: file.name.replace(/\.[^/.]+$/, '') });
      }
      onChange([...images, ...uploaded]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setUploadError(message);
      toast.error('Upload failed', {
        description: message,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFiles(files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerReplacePhoto = (index: number) => {
    setReplaceError(null);
    setReplaceTargetIndex(index);
    replaceFileInputRef.current?.click();
  };

  const handleReplaceFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const targetIndex = replaceTargetIndex;

    // Reset the input right away so selecting the same file again still fires onChange.
    if (replaceFileInputRef.current) {
      replaceFileInputRef.current.value = '';
    }

    if (!file || targetIndex === null || !images[targetIndex]) {
      setReplaceTargetIndex(null);
      return;
    }

    const oldImage = images[targetIndex];
    const oldPhoto = { fileId: resolveFileId(oldImage) || null, url: oldImage.url || null };

    setReplacingIndex(targetIndex);
    setReplaceError(null);

    try {
      const uploaded = await uploadImageFile(file, baseUrl);
      const uploadedFileId = resolveFileId(uploaded);
      const previousAlt = oldImage.alt;
      const updated = [...images];
      updated[targetIndex] = {
        fileId: uploadedFileId,
        url: uploaded.url,
        alt: previousAlt || file.name.replace(/\.[^/.]+$/, ''),
      };
      onChange(updated);
      if (activeIndex === targetIndex) {
        setActiveAlt(updated[targetIndex].alt || '');
      }

      // Keep any existing Photo Hotspots pinned to the old file re-pointed at
      // the new one, so tagged amenity markers stay attached without
      // requiring a page refresh.
      // eslint-disable-next-line no-console
      console.log('[rekey-debug] replace condition check:', {
        roomTypeId,
        oldPhoto,
        uploadedFileId,
        uploadedUrl: uploaded.url,
        willFireRekey: !!(roomTypeId && (oldPhoto.fileId || oldPhoto.url) && uploadedFileId && uploaded.url),
      });
      if (roomTypeId && (oldPhoto.fileId || oldPhoto.url) && uploadedFileId && uploaded.url) {
        const newPhoto = { fileId: uploadedFileId, url: uploaded.url };
        try {
          console.log('[rekey-debug] calling /api/cms/rekey-photo with:', { roomTypeId, oldPhoto, newPhoto });
          const res = await fetch(`${baseUrl}/api/cms/rekey-photo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomTypeId, oldPhoto, newPhoto }),
          });
          const data = (await res.json().catch(() => ({}))) as {
            success?: boolean;
            updatedCount?: number;
            error?: string;
            warning?: string;
          };
          console.log('[rekey-debug] /api/cms/rekey-photo response:', { status: res.status, ok: res.ok, data });
          if (!res.ok || !data.success) {
            throw new Error(data.error || 'Failed to re-link tagged amenities to the new photo.');
          }
          const updatedCount = data.updatedCount ?? 0;
          onPhotoRekeyed?.(oldPhoto, newPhoto, updatedCount);
          if (data.warning) {
            // No hotspots matched the old photo — not an error, but worth a
            // clear heads-up so the user isn't surprised if markers don't show up.
            toast.warning('Photo replaced', {
              description: data.warning,
            });
          } else {
            toast.success('Photo replaced', {
              description: `${updatedCount} tagged amenity hotspot${updatedCount === 1 ? '' : 's'} re-linked to the new photo.`,
            });
          }
        } catch (rekeyErr) {
          console.error('Failed to rekey photo hotspots after replace:', rekeyErr);
          toast.error('Photo replaced, but hotspots may need manual review', {
            description: rekeyErr instanceof Error ? rekeyErr.message : 'Failed to re-link tagged amenities.',
          });
        }
      } else {
        toast.success('Photo replaced');
      }
    } catch (err) {
      // Upload (or re-key) failed before the new image was committed via
      // onChange above, so the old photo/thumbnail is left exactly as it
      // was — no broken/temporary thumbnail is ever shown. Surface a clear
      // toast in addition to the inline banner so the failure isn't missed.
      const message = err instanceof Error ? err.message : 'Failed to replace photo';
      setReplaceError(message);
      toast.error('Photo replace failed', {
        description: message,
      });
    } finally {
      setReplacingIndex(null);
      setReplaceTargetIndex(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // --- Thumbnail reorder drag-and-drop (native HTML5 DnD, zero dependencies) -

  const handleDragStart = (index: number, e: React.DragEvent) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires data to be set for the drag to initiate.
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (index: number, e: React.DragEvent) => {
    // Required so this element is a valid drop target.
    e.preventDefault();
    if (index !== draggedIndex) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (targetIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...images];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, movedItem);
    onChange(updated);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadFiles(files);
    }
  };

  return (
    <div className="space-y-3">
      <Header displayName={label} isRequired={required} helpText={helpText} />

      {onTagHotspot && (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border">
          <MapPin className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" strokeWidth={2.5} />
          <p className="text-sm text-muted-foreground leading-normal">
            Click a photo to see every amenity already tagged on it, all at once. Use the
            <span className="inline-flex items-center align-middle px-1.5 py-0.5 mx-1 text-xs font-semibold rounded bg-secondary text-secondary-foreground">Tag</span>
            badge (or "Tag amenity hotspot" inside the photo) to mark a new spot.
          </p>
        </div>
      )}

      {/* Thumbnail grid: 5 per row, wraps */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {images.map((img, index) => {
            const matches = photoHotspots ? getMatches(img) : [];
            const activeCount = matches.filter((h) => h.active).length;
            const canDrag = images.length > 1 && !uploading;
            return (
              <div
                key={img.fileId || img.url || index}
                role="button"
                tabIndex={0}
                onClick={() => openModal(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(index);
                  }
                }}
                draggable={canDrag}
                onDragStart={(e) => handleDragStart(index, e)}
                onDragOver={(e) => handleDragOver(index, e)}
                onDrop={(e) => handleDrop(index, e)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'group relative aspect-square rounded-lg border border-border bg-muted overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-150',
                  canDrag && 'cursor-grab active:cursor-grabbing',
                  draggedIndex === index && 'opacity-40 scale-95 border-dashed border-primary',
                  dragOverIndex === index &&
                    draggedIndex !== index &&
                    'ring-2 ring-primary ring-offset-2 border-primary scale-[1.02]'
                )}
                title={img.alt || `Image ${index + 1}`}
              >
                <img
                  src={img.url}
                  alt={img.alt || ''}
                  draggable={false}
                  className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
                />
                {canDrag && (
                  <span
                    aria-hidden="true"
                    title="Drag to reorder"
                    className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center justify-center h-5 w-7 rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  >
                    <GripVertical className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                )}
                {!img.alt && (
                  <span
                    className="absolute top-1 right-1 flex items-center justify-center h-5 w-5 rounded-full shadow-sm ring-1 ring-black/10"
                    style={{ backgroundColor: '#fff6f6' }}
                    title="Missing alt text"
                    aria-label="Missing alt text"
                  >
                    <AlertCircle className="h-3.5 w-3.5" style={{ color: '#d65241' }} strokeWidth={2.25} />
                  </span>
                )}
                {onTagHotspot && (
                  <span
                    role="button"
                    tabIndex={0}
                    draggable={false}
                    onDragStart={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagHotspot(img);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        e.preventDefault();
                        onTagHotspot(img);
                      }
                    }}
                    title="Tag amenity hotspot on this photo"
                    aria-label="Tag amenity hotspot on this photo"
                    className="absolute top-1 left-1 flex items-center gap-1 h-6 px-1.5 rounded-full bg-accent text-accent-foreground shadow-sm ring-1 ring-black/10 opacity-90 group-hover:opacity-100 transition-opacity focus:opacity-100"
                  >
                    <MapPin className="h-3 w-3" strokeWidth={2.5} />
                    <span className="text-[10px] font-medium leading-none hidden sm:inline">Tag</span>
                  </span>
                )}
                {activeCount > 0 && (
                  <span
                    title={`${activeCount} tagged amenit${activeCount === 1 ? 'y' : 'ies'} on this photo`}
                    aria-label={`${activeCount} tagged amenities on this photo`}
                    className="absolute bottom-1 left-1 flex items-center gap-1 h-6 px-1.5 rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-black/10"
                  >
                    <Tags className="h-3 w-3 text-accent" strokeWidth={2.5} />
                    <span className="text-[10px] font-medium leading-none">{activeCount}</span>
                  </span>
                )}
                <span
                  role="button"
                  tabIndex={0}
                  draggable={false}
                  onDragStart={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (replacingIndex === null) {
                      triggerReplacePhoto(index);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                      e.preventDefault();
                      if (replacingIndex === null) {
                        triggerReplacePhoto(index);
                      }
                    }
                  }}
                  title="Replace photo"
                  aria-label="Replace photo"
                  aria-disabled={replacingIndex === index}
                  className="absolute bottom-1 right-1 flex items-center gap-1 h-6 px-1.5 rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-black/10 opacity-90 group-hover:opacity-100 transition-opacity focus:opacity-100"
                >
                  {replacingIndex === index ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3 w-3" strokeWidth={2.5} />
                  )}
                  <span className="text-[10px] font-medium leading-none hidden sm:inline">Replace</span>
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Hidden input used by each thumbnail's "Replace" action above */}
      <input
        ref={replaceFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleReplaceFileSelect}
        className="hidden"
      />

      {/* Add new photos */}
      <div
        className={`border-2 border-dashed transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
        } p-6 text-center cursor-pointer`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
            <p className="text-sm font-body text-muted-foreground">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <Upload className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm font-body text-foreground">Click to add photos or drag and drop</p>
            <p className="text-xs font-body text-muted-foreground">
              JPG, PNG, GIF, SVG, or WebP (max 4MB each) &middot; multiple files supported
            </p>
          </div>
        )}
      </div>

      {uploadError && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-body">
          {uploadError}
        </div>
      )}

      {replaceError && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-body">
          {replaceError}
        </div>
      )}

      {/* Edit modal */}
      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
          <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-border">
            <DialogTitle className="font-heading">Edit image</DialogTitle>
          </DialogHeader>

          {activeImage && (
            <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
              <div className="relative w-full max-h-[50vh] flex items-center justify-center rounded-lg overflow-hidden bg-muted select-none">
                <img
                  src={activeImage.url}
                  alt={activeAlt || ''}
                  draggable={false}
                  className="max-h-[50vh] w-auto max-w-full object-contain mx-auto"
                />
                {allMatches.map((hotspot, index) => {
                  if (hotspot.xPercent === null || hotspot.yPercent === null) return null;
                  const isHighlighted = highlightedId === hotspot.id;
                  const isInactive = !hotspot.active;
                  return (
                    <div
                      key={hotspot.id}
                      className="absolute pointer-events-none"
                      style={{
                        left: `${hotspot.xPercent}%`,
                        top: `${hotspot.yPercent}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: isHighlighted ? 20 : 10,
                        opacity: isInactive ? 0.45 : 1,
                      }}
                      title={`${hotspot.name}${isInactive ? ' (inactive)' : ''}`}
                    >
                      <span
                        className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-accent text-white text-[11px] font-bold leading-none shadow-md font-body"
                        style={
                          isHighlighted
                            ? { boxShadow: '0 0 0 4px rgba(214, 82, 65, 0.4)' }
                            : undefined
                        }
                      >
                        {index + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {photoHotspots && (activeMatches.length > 0 || inactiveMatches.length > 0) ? (
                <ul className="divide-y divide-border border border-border max-h-40 overflow-y-auto">
                  {allMatches.map((hotspot, index) => {
                    const isInactive = !hotspot.active;
                    return (
                      <li
                        key={hotspot.id}
                        className={
                          isInactive
                            ? 'flex items-center justify-between gap-3 px-3 py-1.5 bg-muted/30 opacity-70'
                            : 'flex items-center justify-between gap-3 px-3 py-1.5 bg-background hover:bg-muted/40 transition-colors'
                        }
                        onMouseEnter={() => setHighlightedId(hotspot.id)}
                        onMouseLeave={() => setHighlightedId(null)}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span
                            className={
                              isInactive
                                ? 'flex items-center justify-center w-5 h-5 rounded-full border border-dashed border-muted-foreground text-muted-foreground text-[10px] font-bold leading-none flex-shrink-0 font-body'
                                : 'flex items-center justify-center w-5 h-5 rounded-full border border-white bg-accent text-white text-[10px] font-bold leading-none shadow-sm flex-shrink-0 font-body'
                            }
                          >
                            {index + 1}
                          </span>
                          <span
                            className={
                              isInactive
                                ? 'font-body text-xs text-muted-foreground truncate'
                                : 'font-body text-xs text-foreground truncate'
                            }
                          >
                            {hotspot.name}
                            {isInactive && <span className="italic"> (inactive)</span>}
                          </span>
                        </span>
                        <a
                          href={`${baseUrl}/portal/photo-hotspots/${hotspot.id}`}
                          className="flex items-center gap-1 text-[11px] font-body text-accent hover:underline flex-shrink-0"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : photoHotspots && onTagHotspot ? (
                <p className="flex items-center gap-2 border border-dashed border-border bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground font-body">
                  <Tags className="h-3.5 w-3.5 flex-shrink-0" />
                  No amenities are tagged on this photo yet.
                </p>
              ) : null}

              <div className="space-y-1.5">
                <Label htmlFor="active-image-alt" className="font-body text-xs text-muted-foreground">
                  Alt text (for accessibility)
                </Label>
                <Input
                  id="active-image-alt"
                  type="text"
                  value={activeAlt}
                  onChange={(e) => handleAltSave(e.target.value)}
                  placeholder="Describe the image..."
                  className="font-body text-sm"
                />
              </div>
            </div>
          )}

          <DialogFooter className="flex-shrink-0 flex flex-row items-center justify-between gap-1.5 px-4 py-2.5 border-t border-border bg-muted/20">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={handleRemoveActive}
              className="text-destructive hover:text-destructive font-button shrink-0 h-8 px-3 text-xs"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Remove image
            </Button>
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              {onTagHotspot && activeImage && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    onTagHotspot(activeImage);
                    closeModal();
                  }}
                  className="font-button bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 h-8 px-3 text-xs"
                >
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  Tag amenity hotspot
                </Button>
              )}
              {onReviewHotspots && activeImage && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onReviewHotspots(activeImage);
                    closeModal();
                  }}
                  className="font-button shrink-0 h-8 px-3 text-xs"
                >
                  <Tags className="w-3.5 h-3.5 mr-1" />
                  Review tags
                </Button>
              )}
              <Button
                type="button"
                size="sm"
                variant={onTagHotspot ? 'outline' : 'default'}
                onClick={closeModal}
                className="font-button shrink-0 h-8 px-3 text-xs"
              >
                Done
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}














