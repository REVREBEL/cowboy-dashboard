import ErrorBoundary from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';
import AltTextManager from '@/components/AltTextManager';

/**
 * Client-only entry point for the /portal/tools page.
 *
 * This is rendered with `client:only="react"` from the Astro page so it never
 * runs on the server — avoiding any server/client context mismatch for
 * components that rely on browser-only APIs (file inputs, drag/drop, Blob
 * URLs, etc.). Wrapping in an ErrorBoundary ensures a crash here shows a
 * recoverable message instead of a blank page, and mounting <Toaster /> here
 * (rather than relying on one elsewhere) guarantees toast notifications from
 * the bulk CSV importer always have somewhere to render.
 */
export default function AltTextManagerClient() {
  return (
    <ErrorBoundary label="Alt text manager">
      <AltTextManager />
      <Toaster />
    </ErrorBoundary>
  );
}
