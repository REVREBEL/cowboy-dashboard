import { WebflowClient } from 'webflow-api';

type Locals =
  | {
      runtime?: {
        env?: Record<string, string | undefined>;
      };
      [key: string]: any;
    }
  | Record<string, any>;

/**
 * Resolves the Webflow API host/base URL, checking locals.runtime.env,
 * import.meta.env, and process.env (in that order).
 */
function resolveEnvVar(locals: Locals | undefined, key: string): string | undefined {
  const runtimeEnv = locals?.runtime?.env;
  const metaEnv = import.meta.env as unknown as Record<string, string | undefined>;
  const processEnv = typeof process !== 'undefined' ? (process.env as Record<string, string | undefined>) : undefined;

  return runtimeEnv?.[key] || metaEnv?.[key] || processEnv?.[key] || undefined;
}

/**
 * Resolves the Webflow CMS API token, strictly standardizing on
 * WEBFLOW_CMS_API_TOKEN. Checks locals.runtime.env, import.meta.env, and
 * process.env (in that order of priority).
 */
export function getCmsToken(locals?: Locals): string {
  const token = resolveEnvVar(locals, 'WEBFLOW_CMS_API_TOKEN');

  if (!token) {
    throw new Error('WEBFLOW_CMS_API_TOKEN is not configured.');
  }

  return token;
}

/**
 * Resolves the Webflow API host (optional), checking locals.runtime.env,
 * import.meta.env, and process.env (in that order).
 */
export function getWebflowApiHost(locals?: Locals): string | undefined {
  return resolveEnvVar(locals, 'WEBFLOW_API_HOST');
}

/**
 * Returns an authenticated WebflowClient instance using WEBFLOW_CMS_API_TOKEN.
 */
export function createCmsClient(locals?: Locals): WebflowClient {
  const accessToken = getCmsToken(locals);
  const baseUrl = getWebflowApiHost(locals);

  return new WebflowClient({
    accessToken,
    ...(baseUrl && { baseUrl }),
  });
}

