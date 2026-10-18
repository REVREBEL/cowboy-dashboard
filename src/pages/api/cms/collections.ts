import type { APIRoute } from 'astro';
import { createCmsClient } from '../../../lib/webflow-client';

export const GET: APIRoute = async ({ locals }) => {
  const siteId = locals?.runtime?.env?.WEBFLOW_SITE_ID ||
                 import.meta.env.WEBFLOW_SITE_ID;

  if (!siteId) {
    return new Response(JSON.stringify({ error: 'Missing WEBFLOW_SITE_ID in environment variables' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('CMS token error:', error);
    return new Response(JSON.stringify({ error: 'Missing CMS API token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // List all collections for the site
    const collectionsResponse = await client.collections.list(siteId);
    const collections = collectionsResponse.collections || [];
    
    // Get detailed info for each collection
    const detailedCollections = await Promise.all(
      collections.map(async (col) => {
        try {
          const detailed = await client.collections.get(col.id);
          return {
            id: col.id,
            name: col.displayName,
            slug: col.slug,
            singularName: col.singularName,
            fields: detailed.fields?.map(field => ({
              slug: field.slug,
              name: field.displayName,
              type: field.type,
              required: field.isRequired,
              helpText: field.helpText || null,
              validations: field.validations || null
            })) || []
          };
        } catch (err) {
          console.error(`Error fetching collection ${col.id}:`, err);
          return {
            id: col.id,
            name: col.displayName,
            slug: col.slug,
            singularName: col.singularName,
            fields: [],
            error: 'Failed to fetch fields'
          };
        }
      })
    );

    return new Response(JSON.stringify({ 
      collections: detailedCollections,
      count: detailedCollections.length 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error fetching collections:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.response?.data || null
    }), { 
      status: error.status || 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

