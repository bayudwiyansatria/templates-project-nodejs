# Using This Template

Everything to change between cloning this repository and your library's first commit. It is ordered so that nothing
later depends on a step you have not done yet.

## 1. Package identity

`package.json`:

| Field                            | Change to                                           |
| -------------------------------- | --------------------------------------------------- |
| `name`                           | your scoped package name                            |
| `version`                        | `1.0.0` — your history starts here, not this repo's |
| `description`, `keywords`        | your library                                        |
| `homepage`, `bugs`, `repository` | your GitHub URLs                                    |
| `publishConfig.registry`         | keep for GitHub Packages, or drop for public npm    |

Then `.npmrc`, which points the scope at GitHub Packages, and `LICENSE` / `NOTICE` if your terms differ.

## 2. The UMD global

`rollup.config.ts` sets `umdOptions.name` to `TemplatesProjectNodejs`. It is the global a browser gets from a `<script>`
tag, so it must be a valid identifier — a scoped package name is not. Rename it to match your library.

This is the field most often missed. This repository shipped `BayuAuthClient` in it for several releases, inherited from
a project that had nothing to do with it.

## 3. Rename the domain layer

`src/core/` is a placeholder. Rename it to say what your library is about — `client/`, `parser/`, `store/` — and update
the `@/core` imports in `src/index.ts` and `src/core/index.ts`.

Leave `types/`, `constants/`, `exceptions/`, and `utils/` named as they are; they mean the same thing in every library.
If you rename or add a leaf layer, update the `files` list in the boundary rule at the bottom of `eslint.config.ts` so
it keeps covering them.

## 4. Replace the placeholder code

Delete and replace:

- `src/core/Health.ts`, `src/core/Metadata.ts`
- `src/types/HealthStatus.ts`, `src/types/LibraryMetadata.ts`
- `src/constants/Defaults.ts`
- `src/utils/Text.ts`
- `test/index.spec.ts`, `test/core/Metadata.spec.ts`, `test/utils/Text.spec.ts`

Keep `src/exceptions/LibraryException.ts` and rename the class — every library benefits from one base exception its
consumers can catch. Keep every `index.ts` barrel; they are the structure.

## 5. Documentation

- `docs/book.json` — `title`, `description`, and the sidebar repository link
- `docker/nginx/index.html` — heading, intro copy, and the SEO / JSON-LD blocks, which all name this template
- `typedoc.json` — `name` and `navigationLinks.GitHub`
- `docker/docker-compose.docs.yaml` — the image name
- `README.md` — rewrite entirely
- `docs/release-notes/` and `docs/changes-log/` — delete this repository's history and start your own
- `CHANGELOG.md` — reset to a single `1.0.0` entry

## 6. Check what you inherited

Two things worth verifying explicitly, because both have silently ridden along into forks of this template before:

- **`tsconfig.json#types`** — it lists only `@types/jest` and `@types/node`. If you add an ambient types package, make
  sure it is one your library actually needs. `@bayudwiyansatria/auth-client`, a browser library, carried
  `@cloudflare/workers-types` for three releases because it was in the template at the time it was forked.
- **`devDependencies`** — remove anything your build does not use. An unused lint plugin costs an install, an audit
  finding, and a version bump forever.

## 7. Confirm the toolchain before writing code

```bash
npm install
npm test           # lint, then Jest with coverage
npm run build      # four artifacts in lib/
npm run build:docs # fails on any undocumented export
```

If `npm run build:docs` fails on your placeholder replacements, that is the gate working — see
[Documentation](./documentation.md).

## 8. CI

The workflows in `.github/workflows/` call reusable workflows from
[`bayudwiyansatria/.github`](https://github.com/bayudwiyansatria/.github). They need two repository secrets:

- `NPM_AUTH_TOKEN` — publish access to the registry
- `CODECOV_TOKEN` — coverage upload

`release.yml` is dispatch-only: you pick the version when you run it. See [Publishing](./publishing.md).
