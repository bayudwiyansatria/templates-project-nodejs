# Publishing

Releases are cut by the **Release Dispatch** workflow, manually, with the version supplied as an input. Nothing
publishes on a push.

## What ships

`package.json#files` is `["lib/", "!lib/*.map"]` — the four build outputs and nothing else. Source, tests, docs, and
configuration stay in the repository.

Check before releasing:

```bash
npm run build
npm pack --dry-run
```

Consumers reach the bundles through `exports`:

| Consumer                | Resolves to             |
| ----------------------- | ----------------------- |
| `import` (ESM, bundler) | `lib/index.min.mjs`     |
| `require` (CommonJS)    | `lib/index.min.cjs`     |
| TypeScript              | `lib/index.d.ts`        |
| `<script>` tag          | `lib/index.min.umd.cjs` |

Verify both entries actually load, since neither the build nor the test suite exercises the packaged form:

```bash
node -e "import('./lib/index.min.mjs').then(m => console.log(Object.keys(m)))"
node -e "console.log(Object.keys(require('./lib/index.min.cjs')))"
```

## Versioning

[Semantic versioning](https://semver.org/), applied to the public surface — what `src/index.ts` exports:

| Change                                                     | Bump  |
| ---------------------------------------------------------- | ----- |
| removing an export, renaming one, or narrowing a signature | major |
| adding an export, or widening a signature compatibly       | minor |
| a fix with no change to the surface                        | patch |

Adding a new `code` value to a `LibraryException` is a minor change; changing what an existing code means is a major
one, because consumers branch on it.

## Before you dispatch

```bash
npm test
npm run build
npm run build:docs
```

Then:

1. Add a `docs/release-notes/<version>.md`, following the section skeleton the existing notes use — copy the nearest
   previous version and replace the content rather than inventing a shape:

   | Section               | Always | Notes                                              |
   | --------------------- | ------ | -------------------------------------------------- |
   | `📅 Release Date`     | yes    | ISO date                                           |
   | `📖 Overview`         | yes    | what this release is _for_, in prose               |
   | `⚠️ Breaking Changes` | no     | omit when there are none                           |
   | `🚀 Features`         | yes    | new capability, bolded label first                 |
   | `🔧 Enhancements`     | yes    | improvements to what already existed               |
   | `🩹 Fixes`            | no     | omit when there are none                           |
   | `🗑️ Removals`         | no     | omit when there are none                           |
   | `🔐 Security`         | yes    | say so explicitly when nothing changed             |
   | `⬆️ Upgrading From …` | no     | required whenever `⚠️ Breaking Changes` is present |
   | `🐛 Known Issues`     | yes    | `None` is a valid and useful answer                |
   | `📦 Dependencies`     | yes    | a From/To table when versions moved                |
   | `👥 Contributors`     | yes    |                                                    |
   | `🙏 Acknowledgments`  | yes    |                                                    |

2. Add a `docs/changes-log/YYYY-MM-DD.md` entry for the session. This one is narrative and unconstrained — it records
   what was done and _why_, including what was considered and rejected. Release notes address consumers; the changes log
   addresses whoever next has to work on the code.
3. Move the `[Unreleased]` items in `CHANGELOG.md` under the new version heading, using the Keep a Changelog groups
   (Breaking Changes / Added / Changed / Fixed / Removed).
4. Link both new files from `docs/SUMMARY.md`.

## Run the release

**Actions → Release Dispatch → Run workflow**, supplying `MAJOR_VERSION`, `MINOR_VERSION`, and `INCREMENTAL_VERSION`.
The workflow chain is:

```text
build ──┬── test ──┐
        └── docs ──┴── publish ── release ── pages
```

| Job       | Does                                                                   |
| --------- | ---------------------------------------------------------------------- |
| `build`   | installs and builds, uploading `lib/` as an artifact                   |
| `docs`    | generates the documentation                                            |
| `test`    | runs lint and the suite against the built artifact, uploading coverage |
| `publish` | stamps the version, runs `npm run release`, publishes to the registry  |
| `release` | creates the GitHub release with `lib/`, coverage, and docs attached    |
| `pages`   | publishes `dist/` to GitHub Pages — public repositories only           |

The version in `package.json` is stamped by the workflow from the dispatch inputs; you do not need to bump it by hand
first, though keeping it in step with the last release avoids confusion.

## Registry and secrets

`publishConfig` targets GitHub Packages (`https://npm.pkg.github.com`) with `access: restricted`. For public npm
instead, change `publishConfig.registry` and set `access: public`.

Two repository secrets are required:

| Secret           | Used by             |
| ---------------- | ------------------- |
| `NPM_AUTH_TOKEN` | install and publish |
| `CODECOV_TOKEN`  | coverage upload     |

`GITHUB_TOKEN` is supplied by Actions.

## Feature and main branches

- `feature/**` and `hotfix/**` pushes run **Features** — build and test only
- pushes to `master` run **Main** — build, docs, and test

Neither publishes.
