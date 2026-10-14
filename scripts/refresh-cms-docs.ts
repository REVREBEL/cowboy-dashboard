import { WebflowClient } from 'webflow-api';
import { writeFileSync } from 'fs';
import { COLLECTIONS } from '../src/lib/collections-config';

const token = process.env.WEBFLOW_CMS_API_TOKEN || process.env.WEBFLOW_CMS_SITE_API_TOKEN;
const baseUrl = process.env.WEBFLOW_API_HOST;

if (!token) {
  console.error('❌ Missing WEBFLOW_CMS_API_TOKEN');
  process.exit(1);
}

const client = new WebflowClient({
  accessToken: token,
  ...(baseUrl && { baseUrl })
});

async function refresh() {
  console.log('🔍 Refreshing CMS collection documentation (live schema)...\n');

  const summary: any[] = [];

  for (const col of COLLECTIONS) {
    try {
      const detailed = await client.collections.get(col.id);
      const fields = (detailed.fields || []).map((field: any) => ({
        slug: field.slug,
        name: field.displayName,
        type: field.type,
        required: field.isRequired,
        helpText: field.helpText || null,
        options: field.validations?.options?.map((o: any) => o.name) || undefined
      }));

      summary.push({
        id: col.id,
        name: detailed.displayName || col.name,
        slug: detailed.slug || col.slug,
        singularName: detailed.singularName || col.singularName,
        fieldCount: fields.length,
        fields
      });

      console.log(`✅ ${col.name}: ${fields.length} fields`);
    } catch (err: any) {
      console.error(`❌ Failed to fetch ${col.name} (${col.id}): ${err.message}`);
      summary.push({
        id: col.id,
        name: col.name,
        slug: col.slug,
        singularName: col.singularName,
        error: err.message
      });
    }
  }

  writeFileSync(
    'cms-collections-documentation.json',
    JSON.stringify(summary, null, 2)
  );

  console.log('\n📄 Wrote cms-collections-documentation.json');
  console.log(`\nTotal fields across all collections: ${summary.reduce((sum, c) => sum + (c.fieldCount || 0), 0)}`);
}

refresh();
