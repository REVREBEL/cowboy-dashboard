import type { APIRoute } from 'astro';
import { WebflowClient } from 'webflow-api';

export const POST: APIRoute = async ({ params, locals }) => {
  const token =
    locals?.runtime?.env?.WEBFLOW_CMS_API_TOKEN ||
    import.meta.env.WEBFLOW_CMS_API_TOKEN;
  if (!token) return new Response('Missing token', { status: 500 });

  const baseUrl =
    locals?.runtime?.env?.WEBFLOW_API_HOST || import.meta.env.WEBFLOW_API_HOST;
  const client = new WebflowClient({
    accessToken: token,
    ...(baseUrl && { baseUrl }),
  });

  const { collectionId, itemId } = params;

  try {
    await client.collections.items.publishItem(collectionId!, itemId!);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Publish error:', error);
    return new Response('Failed to publish', { status: 502 });
  }
};
