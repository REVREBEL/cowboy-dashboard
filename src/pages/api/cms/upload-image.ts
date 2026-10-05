import type { APIRoute } from 'astro';
import { WebflowClient } from 'webflow-api';
import crypto from 'crypto';

export const POST: APIRoute = async ({ request, locals }) => {
  const token = locals?.runtime?.env?.WEBFLOW_CMS_API_TOKEN || import.meta.env.WEBFLOW_CMS_API_TOKEN;
  const siteId = locals?.runtime?.env?.WEBFLOW_SITE_ID || import.meta.env.WEBFLOW_SITE_ID;
  
  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing API token' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!siteId) {
    return new Response(JSON.stringify({ error: 'Missing site ID' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Parse the multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'Invalid file type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'File too large (max 10MB)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get file buffer and calculate MD5 hash
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const hash = crypto.createHash('md5').update(buffer).digest('hex');

    // Initialize Webflow client
    const baseUrl = locals?.runtime?.env?.WEBFLOW_API_HOST || import.meta.env.WEBFLOW_API_HOST;
    const client = new WebflowClient({
      accessToken: token,
      ...(baseUrl && { baseUrl })
    });

    // Step 1: Create asset and get S3 upload URL
    const assetResponse = await client.assets.create(siteId, {
      fileName: file.name,
      fileHash: hash,
    });

    // Step 2: Upload to S3 using the presigned URL
    const uploadDetails = assetResponse.uploadDetails;
    const uploadUrl = assetResponse.uploadUrl;

    // Create form data for S3 upload
    const s3FormData = new FormData();
    
    // Add all the upload details fields in the correct order
    if (uploadDetails.xAmzAlgorithm) s3FormData.append('X-Amz-Algorithm', uploadDetails.xAmzAlgorithm);
    if (uploadDetails.xAmzCredential) s3FormData.append('X-Amz-Credential', uploadDetails.xAmzCredential);
    if (uploadDetails.xAmzDate) s3FormData.append('X-Amz-Date', uploadDetails.xAmzDate);
    if (uploadDetails.xAmzSignature) s3FormData.append('X-Amz-Signature', uploadDetails.xAmzSignature);
    if (uploadDetails.xAmzSecurityToken) s3FormData.append('X-Amz-Security-Token', uploadDetails.xAmzSecurityToken);
    if (uploadDetails.successActionStatus) s3FormData.append('success_action_status', uploadDetails.successActionStatus);
    if (uploadDetails.contentType) s3FormData.append('Content-Type', uploadDetails.contentType);
    if (uploadDetails.cacheControl) s3FormData.append('Cache-Control', uploadDetails.cacheControl);
    if (uploadDetails.acl) s3FormData.append('acl', uploadDetails.acl);
    if (uploadDetails.bucket) s3FormData.append('bucket', uploadDetails.bucket);
    if (uploadDetails.key) s3FormData.append('key', uploadDetails.key);
    if (uploadDetails.policy) s3FormData.append('policy', uploadDetails.policy);
    
    // Add the file last
    s3FormData.append('file', new Blob([buffer], { type: file.type }), file.name);

    // Upload to S3
    const s3Response = await fetch(uploadUrl, {
      method: 'POST',
      body: s3FormData,
    });

    if (!s3Response.ok) {
      const errorText = await s3Response.text();
      console.error('S3 upload failed:', s3Response.status, errorText);
      return new Response(JSON.stringify({ 
        error: `S3 upload failed: ${s3Response.status}`,
        details: errorText
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return the asset information
    return new Response(JSON.stringify({
      fileId: assetResponse.id,
      url: assetResponse.hostedUrl || assetResponse.s3Url,
      fileName: file.name,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Upload failed',
      details: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
