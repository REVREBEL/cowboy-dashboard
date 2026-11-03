/**
 * Sync & de-duplicate Photo Hotspots
 * ===================================
 *
 * CLI maintenance script that scans every published Photo Hotspot item and
 * flags/removes two classes of bad data:
 *
 *   1. Orphaned hotspots — the hotspot's saved `photo-file-id` / `photo-url`
 *      no longer matches any photo (hero image, feature images, or gallery
 *      image) on any published Room Type. This happens when a photo is
 *      removed/replaced in a Room Type's gallery after hotspots were tagged
 *      on it.
 *
 *   2. Duplicate hotspots — two or more hotspots that resolve to the exact
 *      same Room Type photo + the same Amenity, pinned at (effectively) the
 *      same x/y position. This happens when the multi-hotspot tagger (or a
 *      retried bulk-create request) accidentally creates the same pin twice.
 *      The oldest hotspot (by `createdOn`) in each duplicate group is kept;
 *      the rest are flagged for removal.
 *
 * By default this script only REPORTS what it finds (dry run). Pass --apply
 * to actually delete the flagged items from the Photo Hotspots collection.
 *
 * This script shares its analysis/delete logic with the in-portal "Sync
 * photo hotspots" tool (Portal → Tools) via src/lib/sync-photo-hotspots.ts —
 * both stay in lockstep automatically.
 *
 * Usage:
 *   node --env-file=.env --experimental-strip-types scripts/sync-photo-hotspots.ts [options]
 *
 * Options:
 *   --apply                 Actually delete flagged hotspots (default: dry run report only)
 *   --skip-orphans          Don't flag/delete orphaned hotspots
 *   --skip-duplicates       Don't flag/delete duplicate hotspots
 *   --room-type=<id>        Only report duplicate groups belonging to this Room Type item id
 *                           (orphans are always reported in full, since by definition they
 *                           don't resolve to any Room Type)
 *   --coord-epsilon=<n>     Percent tolerance when comparing x/y for duplicate detection
 *                           (default 1.5, i.e. pins within 1.5% of each other on both axes
 *                           are considered the same spot)
 *   --help                  Print this usage block and exit
 *
 * Requires WEBFLOW_CMS_SITE_API_TOKEN (or WEBFLOW_CMS_API_TOKEN) to be set,
 * e.g. via `--env-file=.env` as shown above.
 */

import { WebflowClient } from 'webflow-api';
import { buildSyncReport, deleteHotspotItems } from '../src/lib/sync-photo-hotspots.ts';

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(
    `Sync & de-duplicate Photo Hotspots

Usage:
  node --env-file=.env --experimental-strip-types scripts/sync-photo-hotspots.ts [options]

Options:
  --apply                 Actually delete flagged hotspots (default: dry run report only)
  --skip-orphans          Don't flag/delete orphaned hotspots
  --skip-duplicates       Don't flag/delete duplicate hotspots
  --room-type=<id>        Only report duplicate groups belonging to this Room Type item id
  --coord-epsilon=<n>     Percent tolerance for duplicate coordinate matching (default 1.5)
  --help                  Print this usage block and exit
`
  );
  process.exit(0);
}

const APPLY = args.includes('--apply');
const SKIP_ORPHANS = args.includes('--skip-orphans');
const SKIP_DUPLICATES = args.includes('--skip-duplicates');

const roomTypeFilterArg = args.find((a) => a.startsWith('--room-type='));
const ROOM_TYPE_FILTER = roomTypeFilterArg ? roomTypeFilterArg.slice('--room-type='.length) : null;

const epsilonArg = args.find((a) => a.startsWith('--coord-epsilon='));
const COORD_EPSILON = epsilonArg ? Number(epsilonArg.slice('--coord-epsilon='.length)) : 1.5;

// ---------------------------------------------------------------------------
// Webflow client
// ---------------------------------------------------------------------------

const token = process.env.WEBFLOW_CMS_SITE_API_TOKEN || process.env.WEBFLOW_CMS_API_TOKEN;
const apiHost = process.env.WEBFLOW_API_HOST;

if (!token) {
  console.error('❌ Missing WEBFLOW_CMS_SITE_API_TOKEN or WEBFLOW_CMS_API_TOKEN env var.');
  console.error('   Run with: node --env-file=.env --experimental-strip-types scripts/sync-photo-hotspots.ts');
  process.exit(1);
}

const client = new WebflowClient({
  accessToken: token,
  ...(apiHost && { baseUrl: apiHost }),
});

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('🔍 Fetching Room Types and Photo Hotspots...\n');

  const report = await buildSyncReport(client, {
    skipOrphans: SKIP_ORPHANS,
    skipDuplicates: SKIP_DUPLICATES,
    roomTypeFilter: ROOM_TYPE_FILTER,
    coordEpsilon: COORD_EPSILON,
  });

  console.log(`📚 ${report.roomTypeCount} published Room Types, ${report.hotspotCount} published Photo Hotspots\n`);
  console.log('='.repeat(80));

  if (!SKIP_ORPHANS) {
    console.log(`\n🧹 Orphaned hotspots (no matching Room Type photo): ${report.orphans.length}`);
    for (const h of report.orphans) {
      console.log(`   - [${h.id}] "${h.name}" — amenity: ${h.amenityName}, photo: ${h.photoRef}`);
    }
  }

  const duplicatesToDelete = report.duplicateGroups.flatMap((g) => g.removed);

  if (!SKIP_DUPLICATES) {
    console.log(`\n👯 Duplicate hotspot groups found: ${report.duplicateGroups.length}`);
    for (const group of report.duplicateGroups) {
      console.log(
        `   Room Type "${group.roomTypeName}" — amenity: ${group.amenityName} — photo: ${group.photoRef}`
      );
      console.log(
        `     ✅ keep   [${group.kept.id}] "${group.kept.name}" (${group.kept.xPercent}%, ${group.kept.yPercent}%)`
      );
      for (const r of group.removed) {
        console.log(`     ❌ remove [${r.id}] "${r.name}" (${r.xPercent}%, ${r.yPercent}%)`);
      }
    }
  }

  // --- Summary ---------------------------------------------------------------

  console.log('\n' + '='.repeat(80));
  console.log(
    `\n📊 Summary: ${report.orphans.length} orphaned, ${duplicatesToDelete.length} duplicate (across ${report.duplicateGroups.length} groups)`
  );

  const toDeleteIds = report.toDeleteIds;

  if (toDeleteIds.length === 0) {
    console.log('\n✨ Nothing to clean up.');
    return;
  }

  if (!APPLY) {
    console.log(`\n💡 Dry run only — ${toDeleteIds.length} item(s) would be deleted.`);
    console.log('   Re-run with --apply to actually delete them.');
    return;
  }

  console.log(`\n🗑  Deleting ${toDeleteIds.length} item(s)...`);
  const result = await deleteHotspotItems(client, toDeleteIds);

  for (const id of result.deleted) {
    console.log(`   ✅ Deleted [${id}]`);
  }
  for (const failure of result.failed) {
    console.error(`   ❌ Failed to delete [${failure.id}]: ${failure.error}`);
  }

  console.log(
    `\n✅ Done. Deleted ${result.deleted.length}/${toDeleteIds.length} item(s)${
      result.failed.length ? `, ${result.failed.length} failed` : ''
    }.`
  );
}

main().catch((error) => {
  console.error('\n❌ Script failed:', error);
  process.exit(1);
});
