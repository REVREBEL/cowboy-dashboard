import { WebflowClient } from 'webflow-api';
import { COLLECTIONS, type CollectionConfig } from './collections-config';

export interface LiveCollectionInfo extends CollectionConfig {
  fieldCount: number;
}

/**
 * Infers a reasonable complexity bucket for a collection we have no static
 * metadata for yet (e.g. a brand new collection added in Webflow).
 */
function inferComplexity(fieldCount: number): CollectionConfig['complexity'] {
  if (fieldCount <= 5) return 'simple';
  if (fieldCount <= 15) return 'core';
  return 'complex';
}

/**
 * Fetches the live list of CMS collections directly from Webflow and merges
 * it with any static metadata we have (complexity bucket, sort field).
 *
 * This means new collections created in Webflow show up in the portal
 * automatically — no code changes required. If the live call fails for any
 * reason (e.g. token scope issue), we fall back to the static config so the
 * portal still works.
 */
export async function getLiveCollections(
  client: WebflowClient,
  siteId: string
): Promise<LiveCollectionInfo[]> {
  try {
    const { collections } = await client.collections.list(siteId);

    const results = await Promise.all(
      (collections || []).map(async (col): Promise<LiveCollectionInfo> => {
        const staticMeta = COLLECTIONS.find((c) => c.id === col.id);
        let fieldCount = 0;

        try {
          const detailed = await client.collections.get(col.id);
          fieldCount = detailed.fields?.length ?? 0;
        } catch {
          // Leave fieldCount at 0 if the detail call fails for this collection
        }

        return {
          id: col.id ?? staticMeta?.id ?? '',
          name: staticMeta?.name ?? col.displayName ?? col.slug ?? 'Untitled collection',
          slug: col.slug ?? staticMeta?.slug ?? '',
          singularName: staticMeta?.singularName ?? col.singularName ?? 'Item',
          complexity: staticMeta?.complexity ?? inferComplexity(fieldCount),
          sortField: staticMeta?.sortField,
          fieldCount
        };
      })
    );

    return results;
  } catch (error) {
    console.error('Failed to fetch live collections, falling back to static config:', error);
    return COLLECTIONS.map((c) => ({ ...c, fieldCount: 0 }));
  }
}

/** Groups live collections by complexity bucket for the portal home page. */
export function groupLiveCollectionsByComplexity(collections: LiveCollectionInfo[]) {
  return {
    simple: collections.filter((c) => c.complexity === 'simple'),
    medium: collections.filter((c) => c.complexity === 'core'),
    complex: collections.filter((c) => c.complexity === 'complex')
  };
}


