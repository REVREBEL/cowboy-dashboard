import type { APIRoute } from 'astro';
import { createCmsClient } from '../../../../lib/webflow-client';

interface BulkItemPayload {
  fieldData: Record<string, unknown>;
}

export const POST: APIRoute = async ({ params, request, locals }) => {
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

  const { collectionId } = params;

  try {
    const body = (await request.json()) as any;
    const items: BulkItemPayload[] = body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing or empty items array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    for (const item of items) {
      if (!item?.fieldData) {
        return new Response(
          JSON.stringify({ error: 'Each item must include fieldData' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // The webflow-api SDK's bulk create endpoint expects a single top-level
    // `fieldData` key whose value is an *array* of plain fieldData objects —
    // NOT an `items` array of `{ fieldData: {...} }` wrappers. Passing
    // `{ items }` straight through results in Webflow's API rejecting the
    // request with "Missing required key 'fieldData'" since it never finds
    // a top-level `fieldData` key in the payload.
    const fieldData = items.map((item) => item.fieldData);

    // Create all items in a single bulk request (draft state).
    const createResult = await client.collections.items.createItems(collectionId!, {
      fieldData,
    } as any);

    // Normalize the response shape — the SDK may return either
    // `{ items: [...] }` or a bare array of created items.
    const createdItems: Array<{ id?: string }> = Array.isArray(createResult)
      ? (createResult as any)
      : ((createResult as any)?.items ?? []);

    const newItemIds = createdItems
      .map((item) => item?.id)
      .filter((id): id is string => Boolean(id));

    // Publish all newly created items in one call so they show up live
    // immediately, matching the single-item create+publish behavior.
    if (newItemIds.length > 0) {
      try {
        await client.collections.items.publishItem(collectionId!, {
          itemIds: newItemIds,
        });
      } catch (publishError) {
        console.error('Failed to publish newly created bulk items:', publishError);
      }
    }

    return new Response(JSON.stringify(createResult), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Bulk create items error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to bulk create items' }),
      {
        status: error.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};




