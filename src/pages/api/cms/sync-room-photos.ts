import type { APIRoute } from 'astro';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { write = false, clearEmpty = false, width = 1600, only = null } = body;

    // Build the command
    let command = 'node scripts/sync-mews-room-photos';
    
    if (write) command += ' --write';
    if (clearEmpty) command += ' --clear-empty';
    if (width && width !== 1600) command += ` --width=${width}`;
    if (only) command += ` --only "${only}"`;

    // Get environment variables from Astro environment
    const env = {
      ...process.env,
      MEWS_BASE_URL: locals?.runtime?.env?.MEWS_BASE_URL || import.meta.env.MEWS_BASE_URL,
      MEWS_CLIENT: locals?.runtime?.env?.MEWS_CLIENT || import.meta.env.MEWS_CLIENT,
      MEWS_CONFIG_ID: locals?.runtime?.env?.MEWS_CONFIG_ID || import.meta.env.MEWS_CONFIG_ID,
      WEBFLOW_CMS_API_TOKEN: locals?.runtime?.env?.WEBFLOW_CMS_API_TOKEN || import.meta.env.WEBFLOW_CMS_API_TOKEN,
      WEBFLOW_ROOM_TYPE_COLLECTION_ID: locals?.runtime?.env?.WEBFLOW_ROOM_TYPE_COLLECTION_ID || import.meta.env.WEBFLOW_ROOM_TYPE_COLLECTION_ID || '6abc815b36cbcba74b8b01c4', // room-types collection ID
      WEBFLOW_API_HOST: locals?.runtime?.env?.WEBFLOW_API_HOST || import.meta.env.WEBFLOW_API_HOST,
    };

    // Execute the script with environment variables
    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
      timeout: 60000, // 60 second timeout
      env,
    });

    return new Response(JSON.stringify({
      success: true,
      output: stdout,
      errors: stderr || null,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Sync room photos error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Sync failed',
      output: (error as any).stdout || null,
      errors: (error as any).stderr || null,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};




