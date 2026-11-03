# Repository Architecture Guidelines & Development Standards

## 1. Schema Resolution & Tooling Workflow
- **Skill Definitions:** Workspace skills and capabilities are specified in `.claude/skills/` and `skills-lock.json`.
- **Local Schema Authority:** Webflow CMS collection schemas, relationships, and field names are resolved locally from the repository filesystem (`cms-collections-documentation.json`, `src/lib/collections-config.ts`, and `src/lib/field-groups.ts`).
- **Environment Tooling Scope:** Remote schema discovery commands (such as `list-cms-collections` or `get-cms-collection-details`) may not enabled in this environment. All collection lookups rely on the local documentation files mentioned above.

## 2. Webflow CMS Authentication Standard
- Webflow CMS API operations must standardly use `createCmsClient(locals)` or `getCmsToken(locals)` imported from `src/lib/webflow-client.ts`.
- CMS operations authenticate against `WEBFLOW_CMS_API_TOKEN, which has full read/write accesss.

## 3. Code Verification Standard
- Following any TypeScript or Astro component edits, execute `npx astro check` in the terminal to ensure zero type errors and clean build status before completing tasks.