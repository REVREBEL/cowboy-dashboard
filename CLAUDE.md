# Repository Agent Guidelines & Skill Rules

## 1. Skill & Tool Execution Rules
- **Check Skills First:** Before executing multi-step tasks, inspect `.claude/skills/` and `skills-lock.json` to identify active tools and functions.
- **No External/Fake Tool Calls:** Never attempt to call non-existent or external tool declarations (such as `list-cms-collections` or `get-cms-collection-details`).
- **Local Schema Resolution:** Always inspect `cms-collections-documentation.json`, `src/lib/collections-config.ts`, and `src/lib/field-groups.ts` locally via terminal/file commands to resolve Webflow CMS collection schemas and field names.

## 2. Webflow CMS Authentication Standard
- Standardize all Webflow CMS API calls using `createCmsClient(locals)` or `getCmsToken(locals)` from `src/lib/webflow-client.ts`.
- Strictly use `WEBFLOW_CMS_API_TOKEN`.

## 3. Quality & Build Verification
- After completing TypeScript/Astro edits, always run `npx astro check` to verify there are 0 build errors before finishing.


## NOTE
The tool `list-cms-collections` is not available in this environment. Please do not call external CMS schema tools.
