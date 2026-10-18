
# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 🏨 CMS Client Portal

This project also includes a custom CMS client portal (`/portal`) for editing
Webflow CMS collections through a dedicated form UI. See `PORTAL_STATUS.md`
and `PORTAL_SPECIFICATION.md` for the full feature list and architecture.

### Core utilities

- **`src/lib/webflow-client.ts`** — Centralized Webflow CMS authentication.
  Exposes:
  - `getCmsToken(locals)` — resolves `WEBFLOW_CMS_API_TOKEN` (checking
    `locals.runtime.env`, then `import.meta.env`, then `process.env`, in that
    order) and throws if it isn't configured. There is no fallback to any
    other token name — this is the single source of truth for CMS auth.
  - `getWebflowApiHost(locals)` — resolves the optional `WEBFLOW_API_HOST`
    override using the same precedence.
  - `createCmsClient(locals)` — returns an authenticated `WebflowClient`
    instance (from the `webflow-api` package) built from the above two
    helpers. Every CMS API route under `src/pages/api/cms/` uses this
    function instead of constructing its own client, so token rotation or
    environment changes only require editing one file.
- **`src/lib/base-url.ts`** — Exports the `baseUrl` constant used to prefix
  every fetch/link/redirect so the app works correctly whether it's running
  locally or mounted under a Webflow Cloud sub-path.
- **`src/lib/collections-config.ts`** — Static CMS collection + field
  metadata used to power the portal home page without requiring the
  `sites:read` scope.
- **`src/lib/field-groups.ts`** / **`src/lib/field-layouts.ts`** — Group and
  lay out raw CMS fields into logical, multi-column sections for the item
  editor.
- **`src/lib/image-upload-client.ts`** — Shared image upload/validation logic
  used by both the single-image and multi-image editor fields.
- **`src/lib/photo-hotspots.ts`** — Helpers for fetching and matching Photo
  Hotspot CMS items to a given Room Type photo.

For the full list of API routes, field-type support, and known limitations,
see `PORTAL_STATUS.md`.

