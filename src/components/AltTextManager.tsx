import { useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Search, Upload, Download, RefreshCw, AlertTriangle, Save, CheckCircle2 } from 'lucide-react';
import { baseUrl } from '@/lib/base-url';
import { toCsv, parseCsv, csvRowsToObjects } from '@/lib/csv-utils';
import { ALT_TEXT_CSV_COLUMNS } from '@/lib/alt-text-types';
import type { AltTextRow, AltTextUpdate, AltTextImportResult } from '@/lib/alt-text-types';
import AltTextImporter from '@/components/tools/AltTextImporter';

interface EditableRow extends AltTextRow {
  originalAlt: string;
}

type Filter = 'all' | 'missing' | 'edited';

export default function AltTextManager() {
  const [rows, setRows] = useState<EditableRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedAt, setScannedAt] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [saveResult, setSaveResult] = useState<AltTextImportResult | null>(null);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dirtyCount = useMemo(() => rows.filter((r) => r.alt !== r.originalAlt).length, [rows]);
  const missingCount = useMemo(() => rows.filter((r) => !r.alt.trim()).length, [rows]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (filter === 'missing' && row.alt.trim()) return false;
      if (filter === 'edited' && row.alt === row.originalAlt) return false;
      if (!term) return true;
      return (
        row.collectionName.toLowerCase().includes(term) ||
        row.itemName.toLowerCase().includes(term) ||
        row.itemSlug.toLowerCase().includes(term) ||
        row.fieldLabel.toLowerCase().includes(term)
      );
    });
  }, [rows, search, filter]);

  async function handleScan() {
    setLoading(true);
    setError(null);
    setSaveResult(null);
    setImportMessage(null);
    try {
      const res = await fetch(`${baseUrl}/api/tools/alt-text/export`);
      if (!res.ok) throw new Error(`Scan failed (${res.status})`);
      const data = await res.json() as { rows: AltTextRow[]; generatedAt: string };
      setRows(data.rows.map((r) => ({ ...r, originalAlt: r.alt })));
      setScannedAt(data.generatedAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan CMS');
    } finally {
      setLoading(false);
    }
  }

  function updateAlt(key: string, alt: string) {
    setRows((prev) => prev.map((row) => (row.key === key ? { ...row, alt } : row)));
  }

  function handleDownloadCsv() {
    const csv = toCsv(
      [...ALT_TEXT_CSV_COLUMNS],
      rows.map((row) => [
        row.collectionName,
        row.itemName,
        row.itemSlug,
        row.itemId,
        row.fieldLabel,
        row.fieldSlug,
        row.imageIndex === null ? '' : row.imageIndex,
        row.imageUrl,
        row.alt
      ])
    );
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `alt-text-export-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async function handleCsvFile(file: File) {
    setImportMessage(null);
    setError(null);
    try {
      const text = await file.text();
      const { headers, rows: csvRows } = parseCsv(text);
      const objects = csvRowsToObjects(headers, csvRows);

      if (rows.length === 0) {
        setError('Scan the CMS first, then import a CSV to apply edited alt text.');
        return;
      }

      const byItemField = new Map<string, EditableRow>();
      for (const row of rows) {
        const indexPart = row.imageIndex === null ? '' : String(row.imageIndex);
        byItemField.set(`${row.itemId}:${row.fieldSlug}:${indexPart}`, row);
      }

      let matched = 0;
      let unmatched = 0;
      const updated = [...rows];

      for (const obj of objects) {
        const itemId = obj['item_id'];
        const fieldSlug = obj['field_slug'];
        const imageIndexRaw = obj['image_index'];
        const alt = obj['alt_text'] ?? '';
        if (!itemId || !fieldSlug) continue;

        const lookupKey = `${itemId}:${fieldSlug}:${imageIndexRaw ?? ''}`;
        const existing = byItemField.get(lookupKey);
        if (!existing) {
          unmatched += 1;
          continue;
        }

        const idx = updated.findIndex((r) => r.key === existing.key);
        if (idx !== -1) {
          updated[idx] = { ...updated[idx], alt };
          matched += 1;
        }
      }

      setRows(updated);
      setImportMessage(
        `Loaded ${matched} alt text change${matched === 1 ? '' : 's'} from CSV${unmatched > 0 ? ` (${unmatched} row${unmatched === 1 ? '' : 's'} could not be matched to a current photo)` : ''}. Review below, then save.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse CSV');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleSave() {
    const dirtyRows = rows.filter((r) => r.alt !== r.originalAlt);
    if (dirtyRows.length === 0) return;

    setSaving(true);
    setError(null);
    setSaveResult(null);
    try {
      const updates: AltTextUpdate[] = dirtyRows.map((row) => ({
        collectionId: row.collectionId,
        itemId: row.itemId,
        fieldSlug: row.fieldSlug,
        fieldType: row.fieldType,
        imageIndex: row.imageIndex,
        imageUrl: row.imageUrl,
        alt: row.alt
      }));

      const res = await fetch(`${baseUrl}/api/tools/alt-text/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });

      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      const result = (await res.json()) as AltTextImportResult;
      setSaveResult(result);

      // Mark successfully-saved rows (anything not listed in errors) as clean.
      const erroredItemIds = new Set(result.errors.map((e) => `${e.collectionId}:${e.itemId}`));
      setRows((prev) =>
        prev.map((row) =>
          erroredItemIds.has(`${row.collectionId}:${row.itemId}`) ? row : { ...row, originalAlt: row.alt }
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl text-foreground">Alt text manager</h2>
          <p className="text-sm font-body text-muted-foreground">
            Scan every photo field across your CMS collections, audit missing alt text, and bulk edit it &mdash; in
            the table below or via CSV.
          </p>
        </div>
        <Button onClick={handleScan} disabled={loading} className="gap-2">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
          {rows.length > 0 ? 'Re-scan CMS' : 'Scan CMS for photos'}
        </Button>
      </div>

      {error && (
        <div className="flex items-start gap-2 border border-destructive/40 bg-destructive/10 text-destructive px-4 py-3 rounded text-sm font-body">
          <AlertTriangle className="size-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {rows.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-border bg-border">
          <StatCard label="Photos found" value={rows.length} />
          <StatCard label="Missing alt text" value={missingCount} tone={missingCount > 0 ? 'warn' : 'ok'} />
          <StatCard label="Unsaved edits" value={dirtyCount} tone={dirtyCount > 0 ? 'info' : undefined} />
          <StatCard
            label="Last scanned"
            value={scannedAt ? new Date(scannedAt).toLocaleTimeString() : '—'}
            isText
          />
        </div>
      )}

      <Tabs defaultValue="audit" className="w-full">
        <TabsList>
          <TabsTrigger value="audit">Audit &amp; edit</TabsTrigger>
          <TabsTrigger value="csv">CSV import / export</TabsTrigger>
          <TabsTrigger value="bulk">Bulk CSV update</TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="space-y-4 mt-4">
          {rows.length === 0 ? (
            <div className="border border-dashed border-border rounded px-6 py-12 text-center">
              <p className="text-sm font-body text-muted-foreground">
                Click &ldquo;Scan CMS for photos&rdquo; above to find every image across your collections and
                start auditing alt text.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative input-sm">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search collection, item, or field..."
                    className="pl-8"
                  />
                </div>
                <div className="flex gap-1">
                  <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
                    All ({rows.length})
                  </FilterButton>
                  <FilterButton active={filter === 'missing'} onClick={() => setFilter('missing')}>
                    Missing ({missingCount})
                  </FilterButton>
                  <FilterButton active={filter === 'edited'} onClick={() => setFilter('edited')}>
                    Edited ({dirtyCount})
                  </FilterButton>
                </div>
                <div className="flex-1" />
                <Button onClick={handleSave} disabled={saving || dirtyCount === 0} className="gap-2">
                  {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                  Save {dirtyCount > 0 ? `${dirtyCount} change${dirtyCount === 1 ? '' : 's'}` : 'changes'}
                </Button>
              </div>

              {saveResult && (
                <div className="flex items-start gap-2 border border-border bg-muted px-4 py-3 rounded text-sm font-body text-foreground">
                  <CheckCircle2 className="size-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span>
                    Saved {saveResult.updatedImages} image{saveResult.updatedImages === 1 ? '' : 's'} across{' '}
                    {saveResult.updatedItems} item{saveResult.updatedItems === 1 ? '' : 's'}.
                    {saveResult.errors.length > 0 && ` ${saveResult.errors.length} item(s) failed to save.`}
                    {saveResult.skipped.length > 0 &&
                      ` ${saveResult.skipped.length} image(s) were skipped (no longer exist on the item).`}
                  </span>
                </div>
              )}

              <div className="border border-border divide-y divide-border max-h-[640px] overflow-y-auto">
                {filteredRows.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm font-body text-muted-foreground">
                    No photos match the current filter.
                  </div>
                )}
                {filteredRows.map((row) => (
                  <div key={row.key} className="flex items-center gap-4 px-4 py-3 bg-card">
                    <img
                      src={row.imageUrl}
                      alt={row.alt || ''}
                      className="size-14 object-cover rounded border border-border flex-shrink-0 bg-muted"
                    />
                    <div className="min-w-0 w-56 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="secondary" className="text-[10px]">
                          {row.collectionName}
                        </Badge>
                        {row.fieldType === 'multiImage' && (
                          <span className="text-[10px] font-mono text-muted-foreground">#{(row.imageIndex ?? 0) + 1}</span>
                        )}
                      </div>
                      <p className="text-sm font-body text-foreground truncate mt-1" title={row.itemName}>
                        {row.itemName}
                      </p>
                      <p className="text-xs font-body text-muted-foreground truncate">{row.fieldLabel}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Input
                        value={row.alt}
                        onChange={(e) => updateAlt(row.key, e.target.value)}
                        placeholder="Describe this image..."
                        className={!row.alt.trim() ? 'border-destructive/50' : undefined}
                      />
                    </div>
                    {row.alt !== row.originalAlt && (
                      <Badge className="flex-shrink-0 text-[10px]">Edited</Badge>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="csv" className="space-y-4 mt-4">
          {rows.length === 0 ? (
            <div className="border border-dashed border-border rounded px-6 py-12 text-center">
              <p className="text-sm font-body text-muted-foreground">
                Scan the CMS first to export the current photos, or apply an edited CSV to the loaded rows.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-px border border-border bg-border">
              <div className="bg-card px-4 py-5 space-y-3">
                <h3 className="font-heading text-sm text-foreground">Export</h3>
                <p className="text-sm font-body text-muted-foreground">
                  Download every scanned photo and its current alt text as a CSV you can edit in Excel, Sheets,
                  or Numbers.
                </p>
                <Button variant="outline" onClick={handleDownloadCsv} className="gap-2">
                  <Download className="size-4" />
                  Download CSV ({rows.length} rows)
                </Button>
              </div>
              <div className="bg-card px-4 py-5 space-y-3">
                <h3 className="font-heading text-sm text-foreground">Import</h3>
                <p className="text-sm font-body text-muted-foreground">
                  Upload an edited CSV (same columns as the export). Matching rows will be loaded into the Audit
                  &amp; edit tab for review before you save.
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="size-4" />
                  Upload CSV
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCsvFile(file);
                  }}
                />
                {importMessage && (
                  <p className="text-xs font-body text-primary">{importMessage}</p>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4 mt-4">
          <p className="text-sm font-body text-muted-foreground">
            Upload a CSV of <span className="font-mono text-xs">collection_id, item_id, field_slug, image_index, alt_text</span>{' '}
            rows to directly update alt text in the CMS, without needing to scan first. Useful for applying
            large, pre-prepared edits.
          </p>
          <AltTextImporter onImported={handleScan} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
  isText
}: {
  label: string;
  value: string | number;
  tone?: 'warn' | 'ok' | 'info';
  isText?: boolean;
}) {
  const toneClass =
    tone === 'warn'
      ? 'text-destructive'
      : tone === 'info'
        ? 'text-primary'
        : 'text-foreground';
  return (
    <div className="bg-card px-4 py-3">
      <p className="text-xs font-body text-muted-foreground mb-1">{label}</p>
      <p className={`font-heading ${isText ? 'text-base' : 'text-2xl'} ${toneClass}`}>{value}</p>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-body rounded border transition-colors ${
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card text-muted-foreground border-border hover:text-foreground'
      }`}
    >
      {children}
    </button>
  );
}


