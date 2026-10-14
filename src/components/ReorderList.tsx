import React, { useState, useRef } from 'react';
import { GripVertical, Save, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { baseUrl } from '../lib/base-url';

export interface ReorderItem {
  id: string;
  name: string;
  slug: string;
  sort: number;
}

interface ReorderListProps {
  collectionId: string;
  collectionSlug: string;
  collectionName: string;
  sortField: string;
  initialItems: ReorderItem[];
}

export default function ReorderList({
  collectionId,
  collectionSlug,
  collectionName,
  sortField,
  initialItems
}: ReorderListProps) {
  const [items, setItems] = useState<ReorderItem[]>(initialItems);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    dragIndex.current = index;
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires data to be set for drag to initiate
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (overIndex !== index) setOverIndex(index);
  };

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const from = dragIndex.current;
    dragIndex.current = null;
    setOverIndex(null);
    if (from === null || from === index) return;

    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDirty(true);
  };

  const handleDragEnd = () => {
    dragIndex.current = null;
    setOverIndex(null);
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      next.splice(target, 0, moved);
      return next;
    });
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        sortField,
        items: items.map((item, index) => ({ id: item.id, sort: index }))
      };

      const response = await fetch(`${baseUrl}/api/cms/${collectionId}/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'Failed to save order');
      }

      toast.success('Order saved');
      setDirty(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save order');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <a
            href={`${baseUrl}/portal/${collectionSlug}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {collectionName}
          </a>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl text-foreground mb-1.5">
                Reorder {collectionName}
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                Drag items to change their order, then save.
              </p>
            </div>
            <Button
              onClick={handleSave}
              disabled={!dirty || saving}
              className="font-button"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save order
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground font-body py-12 text-center">
            No items to reorder.
          </p>
        ) : (
          <ul className="border border-border bg-card divide-y divide-border">
            {items.map((item, index) => (
              <li
                key={item.id}
                draggable
                onDragStart={handleDragStart(index)}
                onDragOver={handleDragOver(index)}
                onDrop={handleDrop(index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 px-4 py-3 bg-card transition-colors ${
                  overIndex === index ? 'bg-muted/60' : ''
                }`}
              >
                <span
                  className="cursor-grab active:cursor-grabbing text-muted-foreground shrink-0"
                  aria-hidden="true"
                >
                  <GripVertical className="h-4 w-4" />
                </span>

                <span className="w-6 shrink-0 font-mono text-xs text-muted-foreground">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="font-body text-sm text-foreground truncate">
                    {item.name || 'Untitled'}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground truncate">
                    {item.slug}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveItem(index, -1)}
                    disabled={index === 0}
                    aria-label="Move up"
                    className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 10l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 1)}
                    disabled={index === items.length - 1}
                    aria-label="Move down"
                    className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}


