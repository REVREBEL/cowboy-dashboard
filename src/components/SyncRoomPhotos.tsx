
import React, { useState } from 'react';
import { RefreshCw, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { baseUrl } from '../lib/base-url';

export default function SyncRoomPhotos() {
  const [expanded, setExpanded] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<{ success: boolean; output: string; errors?: string } | null>(null);
  const [write, setWrite] = useState(true);
  const [clearEmpty, setClearEmpty] = useState(false);
  const [width, setWidth] = useState('800');
  const [only, setOnly] = useState('');

  const handleSync = async () => {
    setSyncing(true);
    setResult(null);

    try {
      const response = await fetch(`${baseUrl}/api/cms/sync-room-photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          write,
          clearEmpty,
          width: parseInt(width) || 1600,
          only: only.trim() || null,
        }),
      });

      const data = (await response.json()) as { success: boolean; output: string; errors?: string };
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        output: '',
        errors: error instanceof Error ? error.message : 'Sync failed',
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="border border-border bg-card">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between gap-3 p-6 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <RefreshCw className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Sync Room Photos from Mews
          </h3>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          <p className="text-sm text-muted-foreground font-body">
            Synchronize room type images from your Mews PMS configuration. This will update the images field for all room types that have a matching Mews Room Type ID.
          </p>

          <div className="space-y-4 pt-2">
            {/* Write Mode */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="write-mode" className="font-body text-sm font-medium">
                  Write Mode
                </Label>
                <p className="text-xs text-muted-foreground font-body">
                  {write ? 'Will update Webflow items' : 'Dry run only (preview changes)'}
                </p>
              </div>
              <Switch
                id="write-mode"
                checked={write}
                onCheckedChange={setWrite}
              />
            </div>

            {/* Clear Empty */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="clear-empty" className="font-body text-sm font-medium">
                  Clear Empty
                </Label>
                <p className="text-xs text-muted-foreground font-body">
                  Clear images when Mews has no photos
                </p>
              </div>
              <Switch
                id="clear-empty"
                checked={clearEmpty}
                onCheckedChange={setClearEmpty}
              />
            </div>

            {/* Image Width */}
            <div className="space-y-1.5">
              <Label htmlFor="image-width" className="font-body text-sm font-medium">
                Image Width (px)
              </Label>
              <Input
                id="image-width"
                type="number"
                min="400"
                max="3000"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="font-body text-sm max-w-32"
              />
            </div>

            {/* Filter by Room */}
            <div className="space-y-1.5">
              <Label htmlFor="only-room" className="font-body text-sm font-medium">
                Filter by Room (optional)
              </Label>
              <Input
                id="only-room"
                type="text"
                value={only}
                onChange={(e) => setOnly(e.target.value)}
                placeholder="Room name, slug, or Mews ID"
                className="font-body text-sm"
              />
              <p className="text-xs text-muted-foreground font-body">
                Leave empty to sync all rooms
              </p>
            </div>
          </div>

          {/* Sync Button */}
          <Button
            onClick={handleSync}
            disabled={syncing}
            className="w-full font-button"
          >
            {syncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                {write ? 'Sync Room Photos' : 'Preview Sync (Dry Run)'}
              </>
            )}
          </Button>

          {/* Result Display */}
          {result && (
            <div className={`p-4 border ${
              result.success 
                ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
            }`}>
              <div className="flex items-start gap-2 mb-2">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-sm mb-1">
                    {result.success ? 'Sync Complete' : 'Sync Failed'}
                  </h4>
                  {result.output && (
                    <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto bg-white dark:bg-black p-3 border border-border mt-2">
                      {result.output}
                    </pre>
                  )}
                  {result.errors && (
                    <div className="mt-2">
                      <p className="text-xs font-semibold mb-1">Errors:</p>
                      <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto bg-white dark:bg-black p-3 border border-border">
                        {result.errors}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!write && (
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-3">
              <p className="text-xs text-yellow-800 dark:text-yellow-200 font-body">
                <strong>Note:</strong> Write mode is disabled. This is a dry run that will only preview changes without updating Webflow.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}




