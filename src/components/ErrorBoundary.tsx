import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional label shown in the fallback UI to identify which feature crashed. */
  label?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Generic client-side error boundary. Catches render/lifecycle errors thrown by
 * its children (e.g. a third-party component crashing due to a missing context
 * provider) and shows a recoverable fallback instead of taking down the whole
 * page with a blank screen.
 *
 * Note: error boundaries only catch errors during React's render/commit phases.
 * They do NOT catch errors inside async callbacks (e.g. a `fetch().then()`), so
 * those should continue to be handled with local try/catch + state as usual.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error(`[ErrorBoundary${this.props.label ? `: ${this.props.label}` : ''}]`, error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-start gap-3 border border-destructive/40 bg-destructive/10 text-destructive px-4 py-4 rounded text-sm font-body">
          <div className="flex items-start gap-2">
            <AlertTriangle className="size-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">
                {this.props.label ? `${this.props.label} failed to load.` : 'Something went wrong.'}
              </p>
              <p className="text-xs opacity-80 mt-1">
                {this.state.error?.message ?? 'An unexpected error occurred while rendering this section.'}
              </p>
            </div>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={this.handleReset} className="gap-2">
            <RefreshCw className="size-3.5" />
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
