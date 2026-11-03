import type { APIRoute } from 'astro';
import { createCmsClient } from '../../../lib/webflow-client';
import { buildSyncReport, deleteHotspotItems } from '../../../lib/sync-photo-hotspots';

// GET /api/cms/sync-photo-hotspots
// Dry-run analysis only — never deletes anything.
export const GET: APIRoute = async ({ request, locals }) => {
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('Sync photo hotspots: CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

  const url = new URL(request.url);
  const skipOrphans = url.searchParams.get('skipOrphans') === 'true';
  const skipDuplicates = url.searchParams.get('skipDuplicates') === 'true';
  const roomTypeFilter = url.searchParams.get('roomType') || null;
  const coordEpsilonParam = url.searchParams.get('coordEpsilon');
  const coordEpsilon = coordEpsilonParam ? Number(coordEpsilonParam) : undefined;

  try {
    const report = await buildSyncReport(client, {
      skipOrphans,
      skipDuplicates,
      roomTypeFilter,
      ...(coordEpsilon !== undefined && !Number.isNaN(coordEpsilon) && { coordEpsilon }),
    });

    return new Response(JSON.stringify(report), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Sync photo hotspots: analysis error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Analysis failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// POST /api/cms/sync-photo-hotspots
// Body: { ids: string[] } — deletes the given Photo Hotspot item ids.
// Intended to be called with ids curated from a prior GET report.
export const POST: APIRoute = async ({ request, locals }) => {
  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('Sync photo hotspots: CMS token error:', error);
    return new Response('Missing token', { status: 500 });
  }

  try {
    const body = (await request.json()) as { ids?: string[] };
    const ids = Array.isArray(body.ids) ? body.ids.filter((id) => typeof id === 'string' && id.length > 0) : [];

    if (ids.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing or empty ids array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await deleteHotspotItems(client, ids);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Sync photo hotspots: delete error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Delete failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
