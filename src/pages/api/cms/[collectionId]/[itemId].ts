import type { APIRoute } from 'astro';
import { WebflowClient } from 'webflow-api';

export const GET: APIRoute = async ({ params, locals }) => {
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
  
  const { collectionId, itemId } = params;

  try {
    const item = await client.collections.items.getItemLive(collectionId!, itemId!);
    return new Response(JSON.stringify(item), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching item:', error);
    return new Response('Not found', { status: 404 });
  }
};

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const token = locals?.runtime?.env?.WEBFLOW_CMS_API_TOKEN || 
                import.meta.env.WEBFLOW_CMS_API_TOKEN;
  
  if (!token) {
    console.error('PATCH: Missing API token');
    return new Response('Missing token', { status: 500 });
  }

  console.log('PATCH: Using token starting with:', token.substring(0, 10));
  console.log('PATCH: Token source:', locals?.runtime?.env?.WEBFLOW_CMS_API_TOKEN ? 'runtime env' : 'import.meta.env');

  const baseUrl = locals?.runtime?.env?.WEBFLOW_API_HOST || import.meta.env.WEBFLOW_API_HOST;
  const client = new WebflowClient({
    accessToken: token,
    ...(baseUrl && { baseUrl })
  });
  
  const { collectionId, itemId } = params;
  console.log('PATCH: Updating item', { collectionId, itemId });

  try {
    const body = await request.json();
    console.log('PATCH: Request body received', { fieldDataKeys: Object.keys(body.fieldData || {}) });
    
    // Update the item
    console.log('PATCH: Calling updateItem...');
    const updatedItem = await client.collections.items.updateItem(
      collectionId!,
      itemId!,
      {
        fieldData: body.fieldData
      }
    );
    console.log('PATCH: Item updated successfully');

    // Publish the changes
    console.log('PATCH: Publishing item...');
    await client.collections.items.publishItem(collectionId!, {
      itemIds: [itemId!]
    });
    console.log('PATCH: Item published successfully');

    return new Response(JSON.stringify(updatedItem), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('PATCH: Error updating item:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: 'Failed to update item',
      details: errorMessage 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};





