import type { APIRoute } from 'astro';
import { WebflowClient } from 'webflow-api';

export const GET: APIRoute = async ({ locals }) => {
  const token = locals?.runtime?.env?.WEBFLOW_SITE_API_TOKEN || 
                import.meta.env.WEBFLOW_SITE_API_TOKEN;
  
  if (!token) {
    return new Response(JSON.stringify({ 
      error: 'Missing WEBFLOW_SITE_API_TOKEN',
      hint: 'This endpoint needs the site token (not CMS token) to list sites'
    }), { 
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
    const sites = await client.sites.list();
    
    return new Response(JSON.stringify({ 
      sites: sites.sites.map(site => ({
        id: site.id,
        displayName: site.displayName,
        shortName: site.shortName,
        previewUrl: site.previewUrl
      }))
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.response?.data || null
    }), { 
      status: error.status || 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
