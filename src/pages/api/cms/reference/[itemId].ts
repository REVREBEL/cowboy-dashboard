import type { APIRoute } from 'astro';
import { WebflowClient } from 'webflow-api';

export const GET: APIRoute = async ({ params, request, locals }) => {
  const token = locals?.runtime?.env?.WEBFLOW_CMS_SITE_API_TOKEN || import.meta.env.WEBFLOW_CMS_SITE_API_TOKEN;
  if (!token) return new Response('Missing token', { status: 500 });

  const baseUrl = locals?.runtime?.env?.WEBFLOW_API_HOST || import.meta.env.WEBFLOW_API_HOST;
  const client = new WebflowClient({
    accessToken: token,
    ...(baseUrl && { baseUrl })
  });

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
