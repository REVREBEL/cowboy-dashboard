import React, { useMemo, useState } from 'react';
import { RefreshCw, AlertCircle, CheckCircle, ChevronDown, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { baseUrl } from '../lib/base-url';
import type { SyncReport, HotspotSummary } from '../lib/sync-photo-hotspots';

type DeleteResult = { deleted: string[]; failed: Array<{ id: string; error: string }> };

function HotspotRow({
  hotspot,
  checked,
  onToggle,
}: {
  hotspot: HotspotSummary;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <label className="flex items-start gap-2 py-1.5 px-2 text-xs font-body hover:bg-muted/40 rounded cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(hotspot.id)}
        className="mt-0.5 shrink-0"
      />
      <span className="flex-1 min-w-0">
        <span className="text-foreground font-medium">{hotspot.name}</span>{' '}
        <span className="text-muted-foreground">
          &mdash; amenity: {hotspot.amenityName}
          {hotspot.roomTypeName ? `, room type: ${hotspot.roomTypeName}` : ''}
          {hotspot.xPercent !== null && hotspot.yPercent !== null
            ? ` (${hotspot.xPercent}%, ${hotspot.yPercent}%)`
            : ''}
        </span>
        <span className="block text-muted-foreground/70 truncate">{hotspot.photoRef}</span>
      </span>
    </label>
  );
}

export default function SyncPhotoHotspots() {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [report, setReport] = useState<SyncReport | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [deleteResult, setDeleteResult] = useState<DeleteResult | null>(null);

  const allFlaggedIds = useMemo(() => {
    if (!report) return [];
    return [
      ...report.orphans.map((o) => o.id),
      ...report.duplicateGroups.flatMap((g) => g.removed.map((r) => r.id)),
    ];
  }, [report]);

  const runAnalysis = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    setError(null);
    setDeleteResult(null);

    try {
      const response = await fetch(`${baseUrl}/api/cms/sync-photo-hotspots`);
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }
      const data = (await response.json()) as SyncReport;
      setReport(data);
      setSelected(new Set([
        ...data.orphans.map((o) => o.id),
        ...data.duplicateGroups.flatMap((g) => g.removed.map((r) => r.id)),
      ]));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(allFlaggedIds));
  const selectNone = () => setSelected(new Set());

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (selected.size === 0) return;
    if (!window.confirm(`Delete ${selected.size} Photo Hotspot item(s)? This can't be undone.`)) {
      return;
    }

    setDeleting(true);
    setError(null);
    setDeleteResult(null);

    try {
      const response = await fetch(`${baseUrl}/api/cms/sync-photo-hotspots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data = (await response.json()) as DeleteResult;
      setDeleteResult(data);

      // Drop the deleted items from the current report/selection so the UI
      // reflects the new state without requiring a full re-fetch.
      setReport((prev) => {
        if (!prev) return prev;
        const deletedSet = new Set(data.deleted);
        return {
          ...prev,
          orphans: prev.orphans.filter((o) => !deletedSet.has(o.id)),
          duplicateGroups: prev.duplicateGroups
            .map((g) => ({ ...g, removed: g.removed.filter((r) => !deletedSet.has(r.id)) }))
            .filter((g) => g.removed.length > 0),
          toDeleteIds: prev.toDeleteIds.filter((id) => !deletedSet.has(id)),
        };
      });
      setSelected((prev) => {
        const next = new Set(prev);
        data.deleted.forEach((id) => next.delete(id));
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const duplicateCount = report?.duplicateGroups.reduce((sum, g) => sum + g.removed.length, 0) ?? 0;
  const hasFlagged = (report?.orphans.length ?? 0) > 0 || duplicateCount > 0;

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
            Sync &amp; De-duplicate Photo Hotspots
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
            Scans every published Photo Hotspot against every published Room Type's photos and
            flags two kinds of bad data: <strong>orphaned hotspots</strong> (the photo they were
            tagged on no longer exists on any Room Type) and <strong>duplicate hotspots</strong>{' '}
            (the same amenity pinned twice at effectively the same spot on the same photo &mdash;
            the oldest pin in each group is kept). Nothing is deleted until you review the results
            below and click delete.
          </p>

          <Button
            type="button"
            onClick={runAnalysis}
            disabled={loading}
            variant="outline"
            className="w-full font-button"
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Analysis
              </>
            )}
          </Button>

          {error && (
            <div className="p-4 border bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-body text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {deleteResult && (
            <div
              className={`p-4 border flex items-start gap-2 ${
                deleteResult.failed.length === 0
                  ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                  : 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800'
              }`}
            >
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-body text-foreground">
                Deleted {deleteResult.deleted.length} item(s).
                {deleteResult.failed.length > 0
                  ? ` ${deleteResult.failed.length} failed: ${deleteResult.failed
                      .map((f) => f.error)
                      .join('; ')}`
                  : ''}
              </p>
            </div>
          )}

          {report && (
            <div className="space-y-4">
              <p className="text-xs font-body text-muted-foreground">
                Scanned {report.roomTypeCount} published Room Types and {report.hotspotCount}{' '}
                published Photo Hotspots.
              </p>

              {!hasFlagged ? (
                <p className="text-sm font-body text-foreground">
                  ✨ Nothing to clean up &mdash; every hotspot matches a photo and no duplicates
                  were found.
                </p>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-body font-medium text-foreground">
                      {report.orphans.length} orphaned, {duplicateCount} duplicate hotspot(s)
                      flagged
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={selectAll}
                        className="text-xs font-body text-primary hover:underline"
                      >
                        Select all
                      </button>
                      <span className="text-xs text-muted-foreground">·</span>
                      <button
                        type="button"
                        onClick={selectNone}
                        className="text-xs font-body text-primary hover:underline"
                      >
                        Select none
                      </button>
                    </div>
                  </div>

                  {report.orphans.length > 0 && (
                    <div className="border border-border rounded">
                      <p className="text-xs font-button uppercase tracking-wider text-muted-foreground px-2 pt-2">
                        Orphaned ({report.orphans.length})
                      </p>
                      <div className="p-1 max-h-64 overflow-y-auto">
                        {report.orphans.map((o) => (
                          <HotspotRow key={o.id} hotspot={o} checked={selected.has(o.id)} onToggle={toggle} />
                        ))}
                      </div>
                    </div>
                  )}

                  {report.duplicateGroups.length > 0 && (
                    <div className="border border-border rounded">
                      <p className="text-xs font-button uppercase tracking-wider text-muted-foreground px-2 pt-2">
                        Duplicate groups ({report.duplicateGroups.length})
                      </p>
                      <div className="p-1 max-h-64 overflow-y-auto space-y-2">
                        {report.duplicateGroups.map((g, idx) => (
                          <div key={idx} className="px-2">
                            <p className="text-xs font-body text-muted-foreground">
                              <span className="text-foreground font-medium">{g.roomTypeName}</span>{' '}
                              &mdash; {g.amenityName}
                            </p>
                            <p className="text-xs font-body text-green-700 dark:text-green-400 pl-2">
                              ✅ keep: {g.kept.name} ({g.kept.xPercent}%, {g.kept.yPercent}%)
                            </p>
                            {g.removed.map((r) => (
                              <HotspotRow key={r.id} hotspot={r} checked={selected.has(r.id)} onToggle={toggle} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting || selected.size === 0}
                    variant="destructive"
                    className="w-full font-button"
                  >
                    {deleting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete {selected.size} Selected Item{selected.size === 1 ? '' : 's'}
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
