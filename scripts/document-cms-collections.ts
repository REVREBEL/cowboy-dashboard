import { WebflowClient } from 'webflow-api';

const token = process.env.WEBFLOW_CMS_SITE_API_TOKEN || process.env.WEBFLOW_CMS_API_TOKEN;
const baseUrl = process.env.WEBFLOW_API_HOST;

if (!token) {
  console.error('❌ Missing WEBFLOW_CMS_SITE_API_TOKEN or WEBFLOW_CMS_API_TOKEN');
  process.exit(1);
}

const client = new WebflowClient({
  accessToken: token,
  ...(baseUrl && { baseUrl })
});

async function documentCollections() {
  try {
    console.log('🔍 Fetching CMS collections...\n');
    
    // Get site ID from token or use default
    const sites = await client.sites.list();
    
    if (!sites?.sites || sites.sites.length === 0) {
      console.error('❌ No sites found');
      return;
    }
    
    const siteId = sites.sites[0]!.id;
    console.log(`📍 Site ID: ${siteId}\n`);
    
    // List all collections
    const collectionsResponse = await client.collections.list(siteId);
    const collections = collectionsResponse.collections || [];
    
    console.log(`📚 Found ${collections.length} collections\n`);
    console.log('='.repeat(80));
    
    for (const collection of collections) {
      console.log(`\n📦 Collection: ${collection.displayName}`);
      console.log(`   ID: ${collection.id}`);
      console.log(`   Slug: ${collection.slug}`);
      console.log(`   Singular Name: ${collection.singularName}`);
      
      // Get detailed collection info with fields
      const detailedCollection = await client.collections.get(collection.id);
      
      if (detailedCollection.fields && detailedCollection.fields.length > 0) {
        console.log(`\n   Fields (${detailedCollection.fields.length}):`);
        console.log('   ' + '-'.repeat(76));
        
        for (const field of detailedCollection.fields) {
          console.log(`   • ${field.displayName}`);
          console.log(`     - Slug: ${field.slug}`);
          console.log(`     - Type: ${field.type}`);
          console.log(`     - Required: ${field.isRequired ? 'Yes' : 'No'}`);
          
          if (field.helpText) {
            console.log(`     - Help: ${field.helpText}`);
          }
          
          // Additional type-specific info
          const validations = field.validations as { options?: Array<{ name: string }> } | undefined;
          if (field.type === 'Option' && validations?.options) {
            console.log(`     - Options: ${validations.options.map((o) => o.name).join(', ')}`);
          }
          
          console.log('');
        }
      } else {
        console.log('   No custom fields');
      }
      
      console.log('   ' + '-'.repeat(76));
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('\n✅ Documentation complete!\n');
    
    // Create a JSON summary
    interface FieldSummary {
      slug?: string;
      name?: string;
      type?: string;
      required?: boolean;
      helpText: string | null;
    }
    interface CollectionSummary {
      id: string;
      name?: string;
      slug?: string;
      singularName?: string;
      fields: FieldSummary[];
    }
    const summary: CollectionSummary[] = collections.map(col => ({
      id: col.id,
      name: col.displayName,
      slug: col.slug,
      singularName: col.singularName,
      fields: []
    }));
    
    // Fetch detailed fields for summary
    for (let i = 0; i < collections.length; i++) {
      const detailedCollection = await client.collections.get(collections[i].id);
      summary[i].fields = detailedCollection.fields?.map(field => ({
        slug: field.slug,
        name: field.displayName,
        type: field.type,
        required: field.isRequired,
        helpText: field.helpText || null
      })) || [];
    }
    
    console.log('\n📄 JSON Summary:\n');
    console.log(JSON.stringify(summary, null, 2));
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

documentCollections();

