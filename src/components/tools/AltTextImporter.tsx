import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { AlertTriangle, CheckCircle2, FileUp, Loader2, UploadCloud, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { baseUrl } from '@/lib/base-url';
import { parseCsv, csvRowsToObjects } from '@/lib/csv-utils';
import type { AltTextRow, AltTextUpdate, AltTextImportResult } from '@/lib/alt-text-types';

interface PreviewRow {
  key: string;
  collectionId: string;
  collectionName: string;
  itemId: string;
  itemName: string;
  fieldLabel: string;
  fieldSlug: string;
  fieldType: 'image' | 'multiImage';
  imageIndex: number | null;
  imageUrl: string;
  oldAlt: string;
  newAlt: string;
  modified: boolean;
  include: boolean;
}

interface UnmatchedRow {
  itemId: string;
  fieldRef: string;
  reason: string;
}

// Batch size for applying changes — small enough to give meaningful, frequent
// progress updates, large enough to avoid excessive round trips.
const APPLY_BATCH_SIZE = 10;

function pick(obj: Record<string, string>, keys: string[]): string {
  for (const key of keys) {
    const value = obj[key];
    if (value !== undefined && value !== '') return value;
  }
  return '';
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export default function AltTextImporter({ onImported }: { onImported?: () => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([]);
  const [unmatched, setUnmatched] = useState<UnmatchedRow[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [applying, setApplying] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [applyErrors, setApplyErrors] = useState<Array<{ itemId: string; reason: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modifiedRows = useMemo(() => previewRows.filter((r) => r.modified), [previewRows]);
  const includedCount = useMemo(() => previewRows.filter((r) => r.include).length, [previewRows]);
  const unchangedCount = previewRows.length - modifiedRows.length;

  const resetAll = useCallback(() => {
    setFileName(null);
    setPreviewRows([]);
    setUnmatched([]);
    setError(null);
    setApplyErrors([]);
    setProgress(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      setError('Please upload a .csv file.');
      return;
    }

    setError(null);
    setApplyErrors([]);
    setProgress(null);
    setFileName(file.name);
    setScanning(true);
    setPreviewRows([]);
    setUnmatched([]);

    try {
      const [text, exportRes] = await Promise.all([
        file.text(),
        fetch(`${baseUrl}/api/tools/alt-text/export`)
      ]);

      if (!exportRes.ok) throw new Error(`Failed to load current CMS data (${exportRes.status})`);
      const exportData = (await exportRes.json()) as { rows: AltTextRow[] };

      const { headers, rows: csvRows } = parseCsv(text);
      const objects = csvRowsToObjects(headers, csvRows);

      if (objects.length === 0) {
        setError('That CSV has no data rows.');
        setScanning(false);
        return;
      }

      // Build a lookup keyed by itemId + field slug + image index ('single' for Image fields).
      const byLookup = new Map<string, AltTextRow>();
      for (const row of exportData.rows) {
        const indexPart = row.imageIndex === null ? 'single' : String(row.imageIndex);
        byLookup.set(`${row.itemId}:${row.fieldSlug}:${indexPart}`, row);
      }

      const nextPreview: PreviewRow[] = [];
      const nextUnmatched: UnmatchedRow[] = [];

      objects.forEach((obj, i) => {
        const itemId = pick(obj, ['item_id']);
        const fieldSlug = pick(obj, ['field_slug', 'field_name']);
        const imageIndexRaw = pick(obj, ['image_index']);
        const newAlt = pick(obj, ['alt_text', 'alt']);

        if (!itemId || !fieldSlug) {
          nextUnmatched.push({ itemId: itemId || `row ${i + 2}`, fieldRef: fieldSlug || '(missing field)', reason: 'Missing item_id or field column' });
          return;
        }

        const indexPart = imageIndexRaw.trim() === '' ? 'single' : String(Number(imageIndexRaw));
        const match = byLookup.get(`${itemId}:${fieldSlug}:${indexPart}`);

        if (!match) {
          nextUnmatched.push({ itemId, fieldRef: fieldSlug, reason: 'No matching photo found in the live CMS' });
          return;
        }

        const oldAlt = match.alt || '';
        const modified = newAlt.trim() !== oldAlt.trim();

        nextPreview.push({
          key: match.key,
          collectionId: match.collectionId,
          collectionName: match.collectionName,
          itemId: match.itemId,
          itemName: match.itemName,
          fieldLabel: match.fieldLabel,
          fieldSlug: match.fieldSlug,
          fieldType: match.fieldType,
          imageIndex: match.imageIndex,
          imageUrl: match.imageUrl,
          oldAlt,
          newAlt,
          modified,
          include: modified
        });
      });

      setPreviewRows(nextPreview);
      setUnmatched(nextUnmatched);

      if (nextPreview.length === 0 && nextUnmatched.length > 0) {
        setError('None of the rows in that CSV matched a live photo. Make sure you are uploading an unmodified export (same item_id / field_slug / image_index columns).');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read that CSV');
    } finally {
      setScanning(false);
    }
  }, []);

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function toggleInclude(key: string) {
    setPreviewRows((prev) => prev.map((r) => (r.key === key ? { ...r, include: !r.include } : r)));
  }

  function toggleAll(include: boolean) {
    setPreviewRows((prev) => prev.map((r) => (r.modified ? { ...r, include } : r)));
  }

  async function applyChanges() {
    const toApply = previewRows.filter((r) => r.include && r.modified);
    if (toApply.length === 0) {
      setConfirmOpen(false);
      return;
    }

    setConfirmOpen(false);
    setApplying(true);
    setApplyErrors([]);
    setProgress({ done: 0, total: toApply.length });

    let successCount = 0;
    let errorCount = 0;
    const errors: Array<{ itemId: string; reason: string }> = [];

    const batches = chunk(toApply, APPLY_BATCH_SIZE);

    for (const batch of batches) {
      const updates: AltTextUpdate[] = batch.map((row) => ({
        collectionId: row.collectionId,
        itemId: row.itemId,
        fieldSlug: row.fieldSlug,
        fieldType: row.fieldType,
        imageIndex: row.imageIndex,
        imageUrl: row.imageUrl,
        alt: row.newAlt
      }));

      try {
        const res = await fetch(`${baseUrl}/api/tools/alt-text/import`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updates })
        });

        if (!res.ok) throw new Error(`Batch failed (${res.status})`);
        const result = (await res.json()) as AltTextImportResult;

        successCount += result.updatedImages;
        if (result.errors.length > 0) {
          errorCount += batch.length - result.updatedImages;
          for (const e of result.errors) errors.push({ itemId: e.itemId, reason: e.reason });
        }
      } catch (err) {
        errorCount += batch.length;
        for (const row of batch) {
          errors.push({ itemId: row.itemId, reason: err instanceof Error ? err.message : 'Request failed' });
        }
      }

      setProgress((prev) => ({ done: Math.min((prev?.done ?? 0) + batch.length, toApply.length), total: toApply.length }));
    }

    setApplying(false);
    setApplyErrors(errors);

    // Mark applied rows as no-longer-modified so the preview reflects the new baseline.
    const appliedKeys = new Set(toApply.filter((r) => !errors.some((e) => e.itemId === r.itemId)).map((r) => r.key));
    setPreviewRows((prev) =>
      prev.map((r) => (appliedKeys.has(r.key) ? { ...r, oldAlt: r.newAlt, modified: false, include: false } : r))
    );

    if (errorCount === 0) {
      toast.success(`Updated ${successCount} alt text${successCount === 1 ? '' : 's'}.`);
    } else {
      toast.warning(`Updated ${successCount} alt text${successCount === 1 ? '' : 's'}, ${errorCount} failed.`, {
        description: 'See the error details below for more information.'
      });
    }

    onImported?.();
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading text-sm text-foreground">Bulk CSV update</h3>
        <p className="text-sm font-body text-muted-foreground mt-1">
          Drop in an edited export CSV to preview exactly what will change before anything is written back to the
          CMS.
        </p>
      </div>

      {!fileName && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded px-6 py-10 text-center transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-border bg-card'
          }`}
        >
          <UploadCloud className="size-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-body text-foreground">Drag and drop a CSV here</p>
            <p className="text-xs font-body text-muted-foreground mt-0.5">or click below to browse</p>
          </div>
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
            <FileUp className="size-4" />
            Choose CSV file
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}

      {scanning && (
        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground px-4 py-3 border border-border rounded bg-card">
          <Loader2 className="size-4 animate-spin" />
          Comparing &ldquo;{fileName}&rdquo; against the live CMS...
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 border border-destructive/40 bg-destructive/10 text-destructive px-4 py-3 rounded text-sm font-body">
          <AlertTriangle className="size-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {!scanning && fileName && previewRows.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-body">
              <Badge variant="secondary">{fileName}</Badge>
              <Badge className="bg-primary text-primary-foreground">{modifiedRows.length} modified</Badge>
              {unchangedCount > 0 && <Badge variant="outline">{unchangedCount} unchanged</Badge>}
              {unmatched.length > 0 && (
                <Badge variant="outline" className="border-destructive/50 text-destructive">
                  {unmatched.length} unmatched
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={resetAll}>
                Clear
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={includedCount === 0 || applying}
                onClick={() => setConfirmOpen(true)}
                className="gap-2"
              >
                {applying ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
                Apply {includedCount} change{includedCount === 1 ? '' : 's'}
              </Button>
            </div>
          </div>

          {progress && (
            <div className="space-y-1.5">
              <Progress value={(progress.done / progress.total) * 100} />
              <p className="text-xs font-body text-muted-foreground">
                {applying ? 'Updating' : 'Updated'} {progress.done} of {progress.total} photos...
              </p>
            </div>
          )}

          {applyErrors.length > 0 && (
            <div className="border border-destructive/40 bg-destructive/10 rounded px-4 py-3 space-y-1">
              <p className="text-sm font-body text-destructive flex items-center gap-1.5">
                <XCircle className="size-4" /> {applyErrors.length} item{applyErrors.length === 1 ? '' : 's'} failed to update
              </p>
              <ul className="text-xs font-body text-destructive/80 list-disc list-inside">
                {applyErrors.slice(0, 5).map((e, i) => (
                  <li key={i}>
                    {e.itemId}: {e.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <button type="button" className="underline hover:text-foreground" onClick={() => toggleAll(true)}>
              Select all modified
            </button>
            <span>&middot;</span>
            <button type="button" className="underline hover:text-foreground" onClick={() => toggleAll(false)}>
              Select none
            </button>
          </div>

          <div className="border border-border divide-y divide-border rounded overflow-hidden max-h-[28rem] overflow-y-auto">
            {previewRows.map((row) => (
              <div key={row.key} className="flex items-center gap-3 px-4 py-2.5 bg-card">
                <Checkbox
                  checked={row.include}
                  disabled={!row.modified}
                  onCheckedChange={() => toggleInclude(row.key)}
                />
                <img
                  src={row.imageUrl}
                  alt=""
                  className="size-10 object-cover rounded border border-border flex-shrink-0 bg-muted"
                />
                <div className="min-w-0 w-48 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">
                      {row.collectionName}
                    </Badge>
                  </div>
                  <p className="text-sm font-body text-foreground truncate mt-0.5" title={row.itemName}>
                    {row.itemName}
                  </p>
                  <p className="text-xs font-body text-muted-foreground truncate">{row.fieldLabel}</p>
                </div>
                <div className="flex-1 min-w-0 grid grid-cols-2 gap-3 text-sm font-body">
                  <p className="truncate text-muted-foreground line-through decoration-muted-foreground/50" title={row.oldAlt}>
                    {row.oldAlt || <span className="italic">(empty)</span>}
                  </p>
                  <p className="truncate text-foreground font-medium" title={row.newAlt}>
                    {row.newAlt || <span className="italic text-muted-foreground">(empty)</span>}
                  </p>
                </div>
                {row.modified ? (
                  <Badge className="flex-shrink-0 text-[10px]">Modified</Badge>
                ) : (
                  <Badge variant="outline" className="flex-shrink-0 text-[10px]">
                    Unchanged
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {unmatched.length > 0 && (
            <details className="text-xs font-body text-muted-foreground">
              <summary className="cursor-pointer hover:text-foreground">
                {unmatched.length} row{unmatched.length === 1 ? '' : 's'} could not be matched
              </summary>
              <ul className="mt-2 list-disc list-inside space-y-0.5">
                {unmatched.slice(0, 20).map((u, i) => (
                  <li key={i}>
                    Item {u.itemId} / {u.fieldRef}: {u.reason}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apply {includedCount} alt text change{includedCount === 1 ? '' : 's'}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will write the new alt text directly to your live Webflow CMS items. This can&apos;t be undone
              automatically, though you can always re-upload the original CSV to revert.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={applyChanges}>Apply changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
