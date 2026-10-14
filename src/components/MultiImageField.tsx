import React, { useRef, useState } from 'react';
import { Loader2, Upload, X, AlertCircle } from 'lucide-react';
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
}

export default function MultiImageField({
  value,
  onChange,
  label,
  required,
  helpText,
  baseUrl,
}: MultiImageFieldProps) {
  const images = (value || []).filter((img): img is ImageData => !!img?.url);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeAlt, setActiveAlt] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  const openModal = (index: number) => {
    setActiveIndex(index);
    setActiveAlt(images[index]?.alt || '');
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

      {/* Thumbnail grid: 5 per row, wraps */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {images.map((img, index) => (
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
            </button>
          ))}
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Edit image</DialogTitle>
          </DialogHeader>

          {activeImage && (
            <div className="space-y-4">
              <div className="border border-border overflow-hidden bg-muted">
                <img
                  src={activeImage.url}
                  alt={activeAlt || ''}
                  className="w-full h-auto object-contain max-h-80"
                />
              </div>

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

          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleRemoveActive}
              className="text-destructive hover:text-destructive font-button"
            >
              <X className="h-4 w-4 mr-1.5" />
              Remove image
            </Button>
            <Button type="button" onClick={closeModal} className="font-button">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


