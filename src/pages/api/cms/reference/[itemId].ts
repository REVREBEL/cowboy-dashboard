import type { APIRoute } from 'astro';
import { createCmsClient } from '../../../../lib/webflow-client';

export const GET: APIRoute = async ({ params, request, locals }) => {
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

  const { itemId } = params;
  const url = new URL(request.url);
  const collectionId = url.searchParams.get('collectionId');

  if (!collectionId || !itemId) {
    return new Response('Missing collectionId or itemId', { status: 400 });
  }

  try {
    const item = await client.collections.items.getItemLive(collectionId, itemId);
    return new Response(JSON.stringify(item), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching reference item:', error);
    return new Response('Not found', { status: 404 });
  }
};

