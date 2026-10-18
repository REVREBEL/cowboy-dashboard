import type { APIRoute } from 'astro';
import { createCmsClient } from '../../../../lib/webflow-client';

export const GET: APIRoute = async ({ params, locals }) => {
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

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
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('PATCH: CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

  const { collectionId, itemId } = params;
  console.log('PATCH: Updating item', { collectionId, itemId });

  try {
    const body = await request.json() as { fieldData?: Record<string, unknown> };
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

export const DELETE: APIRoute = async ({ params, locals }) => {
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('DELETE: CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

  const { collectionId, itemId } = params;

  try {
    await client.collections.items.deleteItem(collectionId!, itemId!);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('DELETE: Error deleting item:', error);
    return new Response(JSON.stringify({
      error: 'Failed to delete item',
      details: error?.message || 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
