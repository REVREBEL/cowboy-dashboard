import type { APIRoute } from 'astro';
import { createCmsClient } from '../../../../../lib/webflow-client';

export const POST: APIRoute = async ({ params, locals }) => {
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

  const { collectionId, itemId } = params;

  try {
    await client.collections.items.publishItem(collectionId!, {
      itemIds: [itemId!],
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Publish error:', error);
    return new Response('Failed to publish', { status: 502 });
  }
};
