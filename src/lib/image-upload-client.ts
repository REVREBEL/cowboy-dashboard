
// Client-side helper for uploading images to the CMS asset library.
// Shared by ImageUpload and MultiImageField so both single- and multi-image
// fields upload files the same way.

export interface ImageData {
  fileId?: string;
  url?: string;
  alt?: string;
}

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
// Webflow's asset pipeline rejects images above 4MB (e.g. "Max size for JPG files
// is 4 MB"). The upload still "succeeds" at the raw S3 POST step even above this
// limit, which is why oversized images used to appear to save fine in the portal
// and then vanish once Webflow's own processing/validation caught up on refresh.
// Validating against the real limit up front avoids that false-success state.
export const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export function validateImageFile(file: File): string | null {
  if (!VALID_IMAGE_TYPES.includes(file.type)) {
    return 'Invalid file type. Please upload JPG, PNG, GIF, SVG, or WebP.';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File too large. Webflow allows a maximum of 4MB per image.';
  }
  return null;
}

export async function uploadImageFile(file: File, baseUrl: string): Promise<ImageData> {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${baseUrl}/api/cms/upload-image`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData: any = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
  }

  const data: any = await response.json();

  return {
    fileId: data.fileId,
    url: data.url,
  };
}

