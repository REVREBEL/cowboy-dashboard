
# Image Upload & Edit Feature

## Overview
The CMS portal now supports full image upload and editing capabilities for all image fields across collections.

## Supported Collections
- **Events** - main-image
- **Offers** - image
- **Locations** - hero-image, logo
- **Room Types** - image
- **Outlets** - image, logo
- **Instagrams** - image

## Features

### Upload Methods
1. **Click to Upload** - Click the upload area to browse files
2. **Drag & Drop** - Drag image files directly onto the upload area

### File Requirements
- **Supported formats**: JPG, PNG, GIF, SVG, WebP
- **Maximum size**: 10MB
- **Validation**: Automatic file type and size validation

### Image Management
- **Preview**: See uploaded images with full preview
- **Alt Text**: Add/edit accessibility alt text for each image
- **Replace**: Easy one-click replace for existing images
- **Remove**: Delete images with confirmation

### Upload Process
1. Select or drag an image file
2. File is validated (type and size)
3. Image uploads to Webflow Assets
4. Preview appears with alt text editor
5. Save the form to publish changes

### Technical Details

#### API Endpoints
- `POST /api/cms/upload-image` - Handles file upload to Webflow Assets
- `PATCH /api/cms/[collectionId]/[itemId]` - Saves image data to CMS item

#### Authentication
`POST /api/cms/upload-image` authenticates the same way as every other CMS
route: it calls `createCmsClient(locals)` from `src/lib/webflow-client.ts`,
which resolves the `WEBFLOW_CMS_API_TOKEN` environment variable (checking
`locals.runtime.env` first, then falling back to `import.meta.env` for local
dev) and constructs an authenticated `WebflowClient` instance. If the token
is missing, the route returns a `500` with `{ error: 'Missing API token' }`
before attempting any upload. No other token name or ad hoc env lookup is
used for image uploads — see "Core utilities" in `README.md` for the shared
helper's full behavior.

#### Image Data Format
Images are stored in Webflow's standard format:
```json
{
  "fileId": "abc123...",
  "url": "https://...",
  "alt": "Description of image"
}
```

#### Components
- **ImageUpload.tsx** - Main upload component with drag-drop, preview, and alt text
- **ItemEditor.tsx** - Integrates image upload into the form

### User Experience
- **Visual feedback**: Upload progress indicator
- **Error handling**: Clear error messages for invalid files
- **Accessibility**: Alt text editor for screen readers
- **Responsive**: Works on mobile and desktop

### Best Practices
1. Always add descriptive alt text for accessibility
2. Optimize images before upload (under 10MB)
3. Use appropriate formats (JPG for photos, PNG for graphics)
4. Preview images before saving to ensure correct upload

## Future Enhancements
- Image cropping/editing
- Multiple image upload
- Image optimization on upload
- CDN integration for faster loading

