import type { APIRoute } from 'astro';
import { WebflowClient } from 'webflow-api';

export const GET: APIRoute = async ({ locals }) => {
  const token = locals?.runtime?.env?.WEBFLOW_CMS_SITE_API_TOKEN || 
                locals?.runtime?.env?.WEBFLOW_CMS_API_TOKEN ||
                import.meta.env.WEBFLOW_CMS_SITE_API_TOKEN ||
                import.meta.env.WEBFLOW_CMS_API_TOKEN;
                
  const siteId = locals?.runtime?.env?.WEBFLOW_SITE_ID || 
                 import.meta.env.WEBFLOW_SITE_ID;
  
  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing CMS API token' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!siteId) {
    return new Response(JSON.stringify({ error: 'Missing WEBFLOW_SITE_ID in environment variables' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const baseUrl = locals?.runtime?.env?.WEBFLOW_API_HOST || import.meta.env.WEBFLOW_API_HOST;
  
  const client = new WebflowClient({
    accessToken: token,
    ...(baseUrl && { baseUrl })
  });

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
