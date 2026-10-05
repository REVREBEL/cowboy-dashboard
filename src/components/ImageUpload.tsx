import React, { useState, useRef } from 'react';
import { Upload, X, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { baseUrl } from '../lib/base-url';

interface ImageData {
  fileId?: string;
  url?: string;
  alt?: string;
}

interface ImageUploadProps {
  value: ImageData | null;
  onChange: (value: ImageData | null) => void;
  label: string;
  required?: boolean;
  helpText?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label,
  required,
  helpText,
}: ImageUploadProps) {
  const [altText, setAltText] = useState(value?.alt || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAltTextChange = (newAlt: string) => {
    setAltText(newAlt);
    if (value?.url) {
      onChange({
        ...value,
        alt: newAlt,
      });
    }
  };

  const handleRemove = () => {
    setAltText('');
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload JPG, PNG, GIF, SVG, or WebP.');
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File too large. Maximum size is 10MB.');
      }

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload to our API endpoint
      const response = await fetch(`${baseUrl}/api/cms/upload-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
      }

      const data = await response.json();

      // Update the value with the uploaded image data
      onChange({
        fileId: data.fileId,
        url: data.url,
        alt: altText || label,
      });

    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
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

    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        <Label className="font-body text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      </div>
      
      {helpText && (
        <p className="text-xs text-muted-foreground font-body">{helpText}</p>
      )}

      {/* Upload Area */}
      {!value?.url && (
        <div
          className={`border-2 border-dashed transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          } p-8 text-center cursor-pointer`}
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
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm font-body text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-body text-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs font-body text-muted-foreground">
                JPG, PNG, GIF, SVG, or WebP (max 10MB)
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-body">
          {error}
        </div>
      )}

      {/* Image Preview */}
      {value?.url && !uploading && (
        <div className="space-y-3">
          <div className="relative inline-block max-w-md">
            <div className="border border-border overflow-hidden bg-muted">
              <img 
                src={value.url} 
                alt={value.alt || label}
                className="w-full h-auto object-contain max-h-96"
                onError={() => setError('Failed to load image')}
              />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 hover:bg-destructive/90 transition-colors"
              title="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Alt Text Input */}
          <div className="space-y-1.5 max-w-md">
            <Label htmlFor={`${label}-alt`} className="font-body text-xs text-muted-foreground">
              Alt Text (for accessibility)
            </Label>
            <Input
              id={`${label}-alt`}
              type="text"
              value={altText}
              onChange={(e) => handleAltTextChange(e.target.value)}
              placeholder="Describe the image..."
              className="font-body text-sm"
            />
          </div>

          {/* Replace Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="font-button"
          >
            Replace Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
