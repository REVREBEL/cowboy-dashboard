// Shared types for the Alt Text Manager tool (export + import + UI).

export interface AltTextRow {
  /** Stable unique key for this row: `${collectionId}:${itemId}:${fieldSlug}:${imageIndex ?? 'single'}` */
  key: string;
  collectionId: string;
  collectionSlug: string;
  collectionName: string;
  itemId: string;
  itemName: string;
  itemSlug: string;
  fieldSlug: string;
  fieldLabel: string;
  fieldType: 'image' | 'multiImage';
  /** Index within a multiImage array field, or null for a single image field */
  imageIndex: number | null;
  imageUrl: string;
  fileId?: string;
  alt: string;
}

export interface AltTextExportResponse {
  rows: AltTextRow[];
  generatedAt: string;
}

export interface AltTextUpdate {
  collectionId: string;
  itemId: string;
  fieldSlug: string;
  fieldType: 'image' | 'multiImage';
  imageIndex: number | null;
  imageUrl: string;
  alt: string;
}

export interface AltTextImportRequest {
  updates: AltTextUpdate[];
}

export interface AltTextImportResult {
  updatedItems: number;
  updatedImages: number;
  skipped: Array<{ collectionId: string; itemId: string; fieldSlug: string; reason: string }>;
  errors: Array<{ collectionId: string; itemId: string; reason: string }>;
}

export const ALT_TEXT_CSV_COLUMNS = [
  'collection',
  'item_name',
  'item_slug',
  'item_id',
  'field_label',
  'field_slug',
  'image_index',
  'image_url',
  'alt_text'
] as const;
