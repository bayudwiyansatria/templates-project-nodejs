# Local Development

## Install

```bash
npm install
```

## The scripts

| Script                      | Runs                                                             |
| --------------------------- | ---------------------------------------------------------------- |
| `npm run build`             | Rollup — four artifacts into `lib/`                              |
| `npm run dev`               | Rollup in watch mode; rebuilds on save                           |
| `npm test`                  | `lint` then `test:run` — the gate CI applies                     |
| `npm run test:run`          | Jest with coverage into `dist/coverage/`                         |
| `npm run lint` / `lint:run` | ESLint over `src`                                                |
| `npm run lint:fix`          | ESLint over `src` with `--fix`                                   |
| `npm run format`            | Prettier, writing in place                                       |
| `npm run build:docs`        | TypeDoc → `dist/docs/`                                           |
| `npm run build:docs:book`   | HonKit → `dist/book/`                                            |
| `npm run build:coverage`    | alias of `test:run`, named for what `build:static` needs from it |
| `npm run build:static`      | build + coverage + docs + book + landing page → `dist/`          |
| `npm run build:all`         | `build` then `build:static`                                      |
| `npm run docker:build:docs` | builds the documentation site image                              |
| `npm run docker:serve:docs` | serves it at `http://localhost/`                                 |
| `npm run release`           | placeholder the release workflow invokes before publishing       |

## Build

```bash
npm run build
```

Writes `lib/index.min.cjs`, `lib/index.min.mjs`, `lib/index.min.umd.cjs`, and `lib/index.d.ts`, each with a source map.
`lib/` is generated and is not committed.

While iterating:

```bash
npm run dev
```

## Test

```bash
npm run test:run
```

Jest runs every `*.spec.ts` under `test/`, collects coverage from `src/**`, and writes it to `dist/coverage/` —
`lcov.info` for Codecov and a browsable HTML report the documentation site serves at `/coverage/`.

`bail` is on, so the run stops at the first failing suite.

To run one file or one test:

```bash
npx jest --config jest.config.json test/core/Metadata.spec.ts
npx jest --config jest.config.json -t 'rejects an empty name'
```

Specs import through the same `@/` mapping as the source, via `moduleNameMapper` in `jest.config.json`. They compile
under `tsconfig.test.json`, which adds `@types/jest` on top of `tsconfig.json`.

## Lint

```bash
npm run lint
npm run lint:fix
```

ESLint 10 flat config in [`eslint.config.ts`](../../eslint.config.ts). Two things it enforces that are worth knowing
before you hit them:

- **`@typescript-eslint/no-unused-vars` is an error.** In a library, an unused import is dead weight that ships. Prefix
  a deliberately-unused parameter with `_`.
- **The layer boundary.** `types/`, `constants/`, `exceptions/`, and `utils/` may not import from `@/core`. See
  [Directory Structure](../reference/directory-structure.md#the-one-way-rule).

Spec files are excluded from linting, as they were under the old `.eslintrc.json`.

## Format

```bash
npm run format
```

Prettier owns formatting; `prettier/prettier` is switched off as a lint rule so a reformat is not reported twice.
Settings are in `.prettierrc.json` — no semicolons, single quotes, 120 columns, two-space indent.

## Type-check without building

```bash
npx tsc --noEmit
```

Faster than a full Rollup run when you only want to know whether the types hold.

## Documentation

```bash
npm run build:docs        # TypeDoc → dist/docs/
npm run build:docs:book   # HonKit  → dist/book/
```

`build:docs` fails the build on an undocumented export or an unresolvable `{@link}`. That is deliberate — see
[Documentation](./documentation.md).

## Everything at once

```bash
npm run build:static
```

Produces the complete site in `dist/`: landing page, `docs/`, `book/`, `coverage/`. This is what the documentation image
serves — see [Docker](./docker.md).
