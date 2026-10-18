import type { APIRoute } from 'astro';
import { createCmsClient } from '../../../lib/webflow-client';

export const GET: APIRoute = async ({ params, request, locals }) => {
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

  const { collectionId } = params;
  const url = new URL(request.url);
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 20), 100);
  const offset = Number(url.searchParams.get('offset') ?? 0);

  try {
    const res = await client.collections.items.listItems(collectionId!, {
      limit,
      offset,
    });
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('CMS API Error:', error);
    return new Response('Upstream error', { status: 502 });
  }
};

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
    const body = await request.json() as { fieldData?: { name: string; slug: string; [key: string]: unknown } };
    const { fieldData } = body;

    if (!fieldData) {
      return new Response(JSON.stringify({ error: 'Missing fieldData' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create the item
    const result = await client.collections.items.createItem(collectionId!, {
      fieldData
    });

    // Publish immediately so the item shows up via listItemsLive /
    // getItemLive right away, instead of staying staged until it's edited
    // again (PATCH publishes) or manually published in the Designer.
    const newItemId = (result as { id?: string })?.id;
    if (newItemId) {
      try {
        await client.collections.items.publishItem(collectionId!, {
          itemIds: [newItemId]
        });
      } catch (publishError) {
        console.error('Failed to publish newly created item:', publishError);
      }
    }

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Create item error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Failed to create item'
    }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
