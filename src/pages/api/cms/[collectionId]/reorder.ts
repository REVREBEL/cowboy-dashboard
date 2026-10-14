import type { APIRoute } from 'astro';
import { WebflowClient } from 'webflow-api';

// Bulk-update a numeric "sort" style field across many items, then publish them.
// Body: { sortField: string, items: { id: string; sort: number }[] }
export const POST: APIRoute = async ({ params, request, locals }) => {
  const token = locals?.runtime?.env?.WEBFLOW_CMS_API_TOKEN ||
                import.meta.env.WEBFLOW_CMS_API_TOKEN;

  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const apiHost = locals?.runtime?.env?.WEBFLOW_API_HOST || import.meta.env.WEBFLOW_API_HOST;
  const client = new WebflowClient({
    accessToken: token,
    ...(apiHost && { baseUrl: apiHost })
  });

  const { collectionId } = params;

  try {
    const body = await request.json();
    const { sortField, items } = body as {
      sortField: string;
      items: { id: string; sort: number }[];
    };

    if (!sortField || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing sortField or items' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Webflow's bulk update endpoint allows up to 100 items per request
    const chunks: { id: string; sort: number }[][] = [];
    for (let i = 0; i < items.length; i += 100) {
      chunks.push(items.slice(i, i + 100));
    }

    for (const chunk of chunks) {
      await client.collections.items.updateItems(collectionId!, {
        items: chunk.map((item) => ({
          id: item.id,
          fieldData: {
            [sortField]: item.sort
          }
        }))
      } as any);
    }

    // Publish all updated items so the new order is live
    const itemIds = items.map((item) => item.id);
    const publishChunks: string[][] = [];
    for (let i = 0; i < itemIds.length; i += 100) {
      publishChunks.push(itemIds.slice(i, i + 100));
    }

    for (const chunk of publishChunks) {
      await client.collections.items.publishItem(collectionId!, {
        itemIds: chunk
      });
    }

    return new Response(JSON.stringify({ success: true, updated: items.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Reorder error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Failed to reorder items'
    }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
