# CHANGELOG

All notable changes to this project will be documented in this file.

See detailed changes in [docs/changes-log/](docs/changes-log/) for each work session, and
[docs/release-notes/](docs/release-notes/) for each release.

## [Unreleased]

## [1.1.0] - 2026-08-05

Gives the template a working structure and a documentation system, and repairs the tooling that was supposed to keep
both honest.

### Breaking Changes

- **The CommonJS and UMD bundles changed extension**, `lib/index.min.js` → `lib/index.min.cjs` and
  `lib/index.min.umd.js` → `lib/index.min.umd.cjs`. `package.json` declares `"type": "module"`, which makes Node read
  every `.js` file in the package as ESM — so the CommonJS bundle parsed as ESM and `require()` of it returned nothing
  usable. The build succeeded and the tests passed throughout, because neither exercises the packaged form. Consumers
  using `require` were already broken and are now fixed; anyone referencing the bundle paths directly must update them
- **`baseUrl: "src"` is replaced by `paths: { "@/*": ["./src/*"] }`.** Imports move from `'types'` to `'@/types'`. The
  old form produced bare specifiers, and `types`, `constants`, and `utils` are all real packages on npm — the meaning of
  such an import depended on what happened to be installed
- **`peerDependencies: { rollup }` removed.** A library built with Rollup does not require its consumers to install
  Rollup; this forced an unrelated peer on every downstream project
- **`.eslintrc.json` and `.eslintignore` replaced by `eslint.config.ts`.** ESLint 10 does not read the former

### Added

- **A layered `src/`** — `core/` (domain), `types/`, `constants/`, `exceptions/`, `utils/`, each with an
  `@module`-documented barrel stating what belongs in the layer and what may import it
- **`LibraryException`** — a base exception carrying a stable `code` and an optional `cause`, so consumers can catch and
  branch without matching on message text. `cause` is declared on the class rather than taken from `ErrorOptions`, which
  is ES2022, keeping the ES2020 baseline intact
- **A lint-enforced layer boundary.** `types/`, `constants/`, `exceptions/`, and `utils/` may not import from `@/core`
- **`exports` map** in `package.json`, so modern Node and bundlers resolve the package instead of falling back to legacy
  `main`/`module`
- **A documentation site** — `docker/docs.Dockerfile` and nginx serving a landing page, the TypeDoc reference, the
  coverage report, and the HonKit book, published on port 80 at `http://localhost/`
- **Documentation gates.** `typedoc.json` gains `treatWarningsAsErrors` with `validation.notDocumented`, `invalidLink`,
  `notExported`, and `rewrittenLink`; `skipErrorChecking` is `false`. Turning it on immediately caught a stale README
  link left by a file rename
- **A restructured book** — `getting-started/`, `guides/`, and `reference/`, with an index that states which docs are
  living and which are point-in-time records
- **Tests** for the new modules; `test/index.spec.ts` is unchanged and still passes, which is what proves the public
  surface survived the restructure
- `.dockerignore`, and the `build:static` / `build:all` / `docker:*` scripts

### Changed

- **HonKit replaces GitBook.** `gitbook-cli` is abandoned and no longer installs; the old image was pinned to
  `node:10-buster`
- **`docs/book.json` `root`** corrected from `./docs` to `.` — the file already lives inside `docs/`
- **Toolchain modernized** — ESLint 8.23 → 10, `@typescript-eslint` 5 → 8, TypeScript 4.7.4 → 5.0.4, Jest 29 → 30,
  TypeDoc 0.23 → 0.28, plus an `overrides` block pinning vulnerable transitives
- **Coverage reporters** are now `lcovonly` + `html`, so Codecov still gets `lcov.info` while the site serves a
  browsable report
- **`tsconfig.test.json`** — its `types` array sat outside `compilerOptions`, where TypeScript ignored it
- UMD global renamed `BayuAuthClient` → `TemplatesProjectNodejs`, a leftover from an unrelated project
- Rollup emits `exports: 'named'` for CommonJS and UMD, and drops warnings originating in `node_modules`
- `docs/changes-log/2026-apr-19.md` renamed to `2026-04-19.md` for ISO consistency
- `docs/release-notes/1.0.0.md` release date corrected to 2026-04-19, matching `CHANGELOG.md`

### Fixed

- **`lint:run` linted nothing.** `eslint -c .eslintrc.json --ext=.ts,tsx` was missing a path argument
- **`npm test` hid lint failures.** `npm run lint & npm run test:run` backgrounds the linter on POSIX shells; it is now
  `&&`
- **`dev` referenced a runtime CLI** that was never a dependency and has no meaning in a library. It is now Rollup watch
  mode

### Removed

- The root `Dockerfile` and `docker-compose.yaml`, whose final image ran `tail -f /dev/null` and served nothing
- `docker/book.Dockerfile` and `docker/docker-compose.book.yaml`, the dead GitBook build
- Dead devDependencies `@eslint/config-array`, `eslint-plugin-import`, and `eslint-config-typescript`, none of which any
  config referenced
- The Deployment section of `AGENTS.md`, which documented an Azure Static Web Apps workflow, a
  `staticwebapp.config.json`, and a `DEPLOYMENT.md` — none of which exist in this repository

See [docs/release-notes/1.1.0.md](docs/release-notes/1.1.0.md) for full release details.

## [1.0.0] - 2026-04-19

### Added

- Initial repository scaffold for a Node.js library template
- TypeScript, Rollup, Jest, ESLint, Prettier, and TypeDoc configuration
- Community documentation and contribution standards
- Changelog and release notes structure under `docs/`

See [docs/release-notes/1.0.0.md](docs/release-notes/1.0.0.md) for full release details.
