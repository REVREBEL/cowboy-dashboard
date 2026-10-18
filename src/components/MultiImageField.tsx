import React, { useRef, useState } from 'react';
import { Loader2, Upload, X, AlertCircle, MapPin, Tags, Pencil } from 'lucide-react';
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
import { hotspotsForPhoto, type PhotoHotspotItem } from '../lib/photo-hotspots';

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
}: MultiImageFieldProps) {
  const images = (value || []).filter((img): img is ImageData => !!img?.url);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeAlt, setActiveAlt] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
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
            return (
              <button
                key={img.fileId || img.url || index}
                type="button"
                onClick={() => openModal(index)}
                className="group relative aspect-square border border-border bg-muted overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring"
                title={img.alt || `Image ${index + 1}`}
              >
                <img
                  src={img.url}
                  alt={img.alt || ''}
                  className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
                />
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
              </button>
            );
          })}
        </div>
      )}

      {/* Add new photos */}
      <div
        className={`border-2 border-dashed transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
        } p-6 text-center cursor-pointer`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
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
              JPG, PNG, GIF, SVG, or WebP (max 10MB each) &middot; multiple files supported
            </p>
          </div>
        )}
      </div>

      {uploadError && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-body">
          {uploadError}
        </div>
      )}

      {/* Edit modal */}
      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Edit image</DialogTitle>
          </DialogHeader>

          {activeImage && (
            <div className="space-y-4">
              <div className="relative inline-block max-w-full border border-border overflow-hidden bg-muted select-none">
                <img
                  src={activeImage.url}
                  alt={activeAlt || ''}
                  draggable={false}
                  className="block w-full h-auto object-contain max-h-80"
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

          <DialogFooter className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleRemoveActive}
              className="text-destructive hover:text-destructive font-button shrink-0 w-full sm:w-auto sm:mr-auto"
            >
              <X className="h-4 w-4 mr-1.5" />
              Remove image
            </Button>
            {onTagHotspot && activeImage && (
              <Button
                type="button"
                onClick={() => {
                  onTagHotspot(activeImage);
                  closeModal();
                }}
                className="font-button bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 w-full sm:w-auto"
              >
                <MapPin className="h-4 w-4 mr-1.5" />
                Tag amenity hotspot
              </Button>
            )}
            {onReviewHotspots && activeImage && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onReviewHotspots(activeImage);
                  closeModal();
                }}
                className="font-button shrink-0 w-full sm:w-auto"
              >
                <Tags className="h-4 w-4 mr-1.5" />
                Review tags
              </Button>
            )}
            <Button
              type="button"
              variant={onTagHotspot ? 'outline' : 'default'}
              onClick={closeModal}
              className="font-button shrink-0 w-full sm:w-auto"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}














