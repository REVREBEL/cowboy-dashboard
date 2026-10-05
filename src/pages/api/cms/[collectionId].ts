import type { APIRoute } from 'astro';
import { WebflowClient } from 'webflow-api';

export const GET: APIRoute = async ({ params, request, locals }) => {
  const token = locals?.runtime?.env?.WEBFLOW_CMS_API_TOKEN || 
                import.meta.env.WEBFLOW_CMS_API_TOKEN;
  
  if (!token) {
    return new Response('Missing token', { status: 500 });
  }

  const baseUrl = locals?.runtime?.env?.WEBFLOW_API_HOST || import.meta.env.WEBFLOW_API_HOST;
  const client = new WebflowClient({
    accessToken: token,
    ...(baseUrl && { baseUrl })
  });
  
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
  const token = locals?.runtime?.env?.WEBFLOW_CMS_API_TOKEN || import.meta.env.WEBFLOW_CMS_API_TOKEN;
  if (!token) return new Response('Missing token', { status: 500 });

  const baseUrl = locals?.runtime?.env?.WEBFLOW_API_HOST || import.meta.env.WEBFLOW_API_HOST;
  const client = new WebflowClient({
    accessToken: token,
    ...(baseUrl && { baseUrl })
  });
  
  const { collectionId } = params;
  
  try {
    const body = await request.json();
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






