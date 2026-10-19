import type { APIRoute } from 'astro';
import { createCmsClient } from '../../../../lib/webflow-client';
import { PHOTO_COLLECTIONS } from '../../../../lib/photo-fields-config';
import type { AltTextExportResponse, AltTextRow } from '../../../../lib/alt-text-types';

interface ImageValue {
  url?: string;
  alt?: string | null;
  fileId?: string;
}

const PAGE_LIMIT = 100;

export const GET: APIRoute = async ({ locals }) => {
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('Alt text export: CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

  const rows: AltTextRow[] = [];

  try {
    for (const collection of PHOTO_COLLECTIONS) {
      let offset = 0;
      let total = Infinity;

      while (offset < total) {
        const res = await client.collections.items.listItemsLive(collection.collectionId, {
          limit: PAGE_LIMIT,
          offset
        });

        const items = res.items || [];
        total = res.pagination?.total ?? items.length;

        for (const item of items) {
          const fieldData = (item as any).fieldData || {};
          const itemName: string = fieldData.name || '(untitled)';
          const itemSlug: string = fieldData.slug || '';
          const itemId = item.id;
          if (!itemId) continue;

          for (const field of collection.fields) {
            const value = fieldData[field.slug];

            if (field.type === 'image') {
              const img = value as ImageValue | null | undefined;
              if (img && img.url) {
                rows.push({
                  key: `${collection.collectionId}:${itemId}:${field.slug}:single`,
                  collectionId: collection.collectionId,
                  collectionSlug: collection.collectionSlug,
                  collectionName: collection.collectionName,
                  itemId,
                  itemName,
                  itemSlug,
                  fieldSlug: field.slug,
                  fieldLabel: field.label,
                  fieldType: 'image',
                  imageIndex: null,
                  imageUrl: img.url,
                  fileId: img.fileId,
                  alt: img.alt || ''
                });
              }
            } else {
              const imgs = (value as ImageValue[] | null | undefined) || [];
              imgs.forEach((img, index) => {
                if (img && img.url) {
                  rows.push({
                    key: `${collection.collectionId}:${itemId}:${field.slug}:${index}`,
                    collectionId: collection.collectionId,
                    collectionSlug: collection.collectionSlug,
                    collectionName: collection.collectionName,
                    itemId,
                    itemName,
                    itemSlug,
                    fieldSlug: field.slug,
                    fieldLabel: field.label,
                    fieldType: 'multiImage',
                    imageIndex: index,
                    imageUrl: img.url,
                    fileId: img.fileId,
                    alt: img.alt || ''
                  });
                }
              });
            }
          }
        }

        offset += PAGE_LIMIT;
        if (items.length === 0) break;
      }
    }

    const body: AltTextExportResponse = {
      rows,
      generatedAt: new Date().toISOString()
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Alt text export: Error scanning CMS:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: 'Failed to scan CMS', details }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

