import type { APIRoute } from 'astro';
import crypto from 'crypto';
import { createCmsClient } from '../../../lib/webflow-client';

// Webflow's asset pipeline rejects images above 4MB. Keep this in sync with
// MAX_FILE_SIZE in src/lib/image-upload-client.ts.
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

// How long (and how many attempts) to poll Webflow's Asset API to confirm an
// upload was actually indexed before we report success back to the client.
// Without this, the S3 POST can "succeed" while Webflow is still processing
// the file, leading to a success response whose hostedUrl isn't resolvable
// yet (a broken/temporary thumbnail in the UI).
const INDEXING_POLL_ATTEMPTS = 6;
const INDEXING_POLL_DELAY_MS = 500;

function jsonError(error: string, status: number, extra?: Record<string, unknown>) {
  return new Response(JSON.stringify({ success: false, error, ...extra }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const POST: APIRoute = async ({ request, locals }) => {
  const siteId = locals?.runtime?.env?.WEBFLOW_SITE_ID || import.meta.env.WEBFLOW_SITE_ID;

  if (!siteId) {
    return jsonError('Missing site ID', 500);
  }

  let client;
  try {
    client = createCmsClient(locals);
  } catch (error) {
    console.error('CMS token error:', error);
    return jsonError('Missing API token', 500);
  }

  try {
    // Parse the multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return jsonError('No file provided', 400);
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return jsonError('Invalid file type', 400);
    }

    // Validate file size (4MB max, matching Webflow's own asset size limit).
    // This is enforced server-side as the source of truth even though the
    // client also validates up front, since client-side checks can always be
    // bypassed.
    if (file.size > MAX_FILE_SIZE) {
      return jsonError("Image exceeds Webflow's 4MB limit.", 400);
    }

    // Get file buffer and calculate MD5 hash
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const hash = crypto.createHash('md5').update(buffer).digest('hex');

    // Step 1: Create asset and get S3 upload URL
    const assetResponse = await client.assets.create(siteId, {
      fileName: file.name,
      fileHash: hash,
    });

    // Step 2: Upload to S3 using the presigned URL
    const uploadDetails = assetResponse.uploadDetails;
    const uploadUrl = assetResponse.uploadUrl;

    if (!uploadDetails || !uploadUrl) {
      return jsonError('Webflow did not return upload details', 502);
    }

    // Create form data for S3 upload
    const s3FormData = new FormData();

    // Add all the upload details fields in the correct order
    if (uploadDetails.xAmzAlgorithm) s3FormData.append('X-Amz-Algorithm', uploadDetails.xAmzAlgorithm);
    if (uploadDetails.xAmzCredential) s3FormData.append('X-Amz-Credential', uploadDetails.xAmzCredential);
    if (uploadDetails.xAmzDate) s3FormData.append('X-Amz-Date', uploadDetails.xAmzDate);
    if (uploadDetails.xAmzSignature) s3FormData.append('X-Amz-Signature', uploadDetails.xAmzSignature);
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
      return jsonError(`S3 upload failed: ${s3Response.status}`, 502, { details: errorText });
    }

    // Step 3: Verify Webflow has actually indexed the asset before reporting
    // success. The S3 POST above completing doesn't guarantee Webflow's own
    // asset pipeline has finished processing the file yet — if we return
    // immediately, the client can briefly (or permanently, for an oversized/
    // invalid file Webflow rejects downstream) receive a hostedUrl that
    // doesn't resolve, which showed up as a broken/temporary thumbnail.
    const assetId = assetResponse.id;
    let indexedAsset: Awaited<ReturnType<typeof client.assets.get>> | null = null;

    if (assetId) {
      for (let attempt = 0; attempt < INDEXING_POLL_ATTEMPTS; attempt++) {
        try {
          const asset = await client.assets.get(assetId);
          if (asset?.hostedUrl) {
            indexedAsset = asset;
            break;
          }
        } catch (pollErr) {
          // Asset may not be queryable yet immediately after creation; keep
          // retrying until we run out of attempts.
          console.warn(`Asset indexing check attempt ${attempt + 1} failed:`, pollErr);
        }
        if (attempt < INDEXING_POLL_ATTEMPTS - 1) {
          await sleep(INDEXING_POLL_DELAY_MS);
        }
      }

      if (!indexedAsset) {
        console.error('Asset was not indexed by Webflow in time:', assetId);
        return jsonError(
          'Webflow did not finish processing this image in time. Please try again.',
          502
        );
      }
    }

    const hostedUrl = indexedAsset?.hostedUrl || assetResponse.hostedUrl || assetResponse.assetUrl;

    if (!hostedUrl) {
      console.error('No hosted URL available after upload/indexing:', assetId);
      return jsonError('Webflow did not return a usable image URL.', 502);
    }

    // Return the asset information
    return new Response(
      JSON.stringify({
        success: true,
        fileId: assetResponse.id,
        url: hostedUrl,
        fileName: file.name,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return jsonError(error instanceof Error ? error.message : 'Upload failed', 500, {
      details: error instanceof Error ? error.stack : undefined,
    });
  }
};
