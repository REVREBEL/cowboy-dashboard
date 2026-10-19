import type { APIRoute } from 'astro';
import { createCmsClient } from '../../../../lib/webflow-client';
import type { AltTextImportRequest, AltTextImportResult, AltTextUpdate } from '../../../../lib/alt-text-types';

interface ImageValue {
  url?: string;
  alt?: string | null;
  fileId?: string;
}

const BATCH_SIZE = 100;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('Alt text import: CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

  let body: AltTextImportRequest;
  try {
    body = (await request.json()) as AltTextImportRequest;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const updates = (body.updates || []).filter((u) => u && u.collectionId && u.itemId && u.fieldSlug);

  const result: AltTextImportResult = {
    updatedItems: 0,
    updatedImages: 0,
    skipped: [],
    errors: []
  };

  if (updates.length === 0) {
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Group updates by collectionId -> itemId -> updates[]
  const byCollection = new Map<string, Map<string, AltTextUpdate[]>>();
  for (const update of updates) {
    if (!byCollection.has(update.collectionId)) {
      byCollection.set(update.collectionId, new Map());
    }
    const byItem = byCollection.get(update.collectionId)!;
    if (!byItem.has(update.itemId)) {
      byItem.set(update.itemId, []);
    }
    byItem.get(update.itemId)!.push(update);
  }

  for (const [collectionId, byItem] of byCollection) {
    const itemPayloads: Array<{ id: string; fieldData: Record<string, unknown> }> = [];

    for (const [itemId, itemUpdates] of byItem) {
      try {
        const current = await client.collections.items.getItemLive(collectionId, itemId);
        const currentFieldData = (current as any).fieldData || {};
        const fieldData: Record<string, unknown> = {};

        // Group this item's updates by field so multiImage arrays are only built once per field.
        const byField = new Map<string, AltTextUpdate[]>();
        for (const u of itemUpdates) {
          if (!byField.has(u.fieldSlug)) byField.set(u.fieldSlug, []);
          byField.get(u.fieldSlug)!.push(u);
        }

        for (const [fieldSlug, fieldUpdates] of byField) {
          const fieldType = fieldUpdates[0].fieldType;

          if (fieldType === 'image') {
            const existing = currentFieldData[fieldSlug] as ImageValue | null | undefined;
            if (!existing || !existing.url) {
              result.skipped.push({ collectionId, itemId, fieldSlug, reason: 'Image no longer exists on item' });
              continue;
            }
            fieldData[fieldSlug] = { ...existing, alt: fieldUpdates[fieldUpdates.length - 1].alt };
            result.updatedImages += 1;
          } else {
            const existingArr = ((currentFieldData[fieldSlug] as ImageValue[] | null | undefined) || []).slice();
            for (const u of fieldUpdates) {
              let targetIndex = -1;
              // Prefer matching by URL (more stable across re-ordering) then fall back to index.
              if (u.imageUrl) {
                targetIndex = existingArr.findIndex((img) => img?.url === u.imageUrl);
              }
              if (targetIndex === -1 && u.imageIndex !== null && existingArr[u.imageIndex]) {
                targetIndex = u.imageIndex;
              }
              if (targetIndex === -1) {
                result.skipped.push({ collectionId, itemId, fieldSlug, reason: 'Image no longer exists on item' });
                continue;
              }
              existingArr[targetIndex] = { ...existingArr[targetIndex], alt: u.alt };
              result.updatedImages += 1;
            }
            fieldData[fieldSlug] = existingArr;
          }
        }

        if (Object.keys(fieldData).length > 0) {
          itemPayloads.push({ id: itemId, fieldData });
        }
      } catch (error) {
        console.error('Alt text import: Error fetching item', { collectionId, itemId, error });
        result.errors.push({
          collectionId,
          itemId,
          reason: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    for (const batch of chunk(itemPayloads, BATCH_SIZE)) {
      if (batch.length === 0) continue;
      try {
        await client.collections.items.updateItemsLive(collectionId, { items: batch });
        result.updatedItems += batch.length;
      } catch (error) {
        console.error('Alt text import: Error updating items', { collectionId, error });
        const reason = error instanceof Error ? error.message : 'Unknown error';
        for (const item of batch) {
          result.errors.push({ collectionId, itemId: item.id, reason });
        }
      }
    }
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
