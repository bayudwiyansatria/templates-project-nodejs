# Directory Structure

## Repository

```text
templates-project-nodejs/
  src/                        source (see below)
  test/                       Jest specs, mirroring src/
  lib/                        build output — generated, never committed
  dist/                       docs, coverage, and book output — generated
  docs/                       this book
    getting-started/
    guides/
    reference/
    release-notes/
    changes-log/
    styles/website.css        HonKit theme
    book.json                 HonKit configuration
    SUMMARY.md                HonKit table of contents
  docker/                     documentation site image
    docs.Dockerfile
    docker-compose.docs.yaml
    nginx/                    landing page and routing
  .github/                    workflows and templates
  eslint.config.ts            flat ESLint config, including the layer boundary
  rollup.config.ts            four build outputs
  typedoc.json                API reference generation, with validation
  jest.config.json            test and coverage configuration
  tsconfig*.json              compiler configuration
```

## `src/`

```text
src/
  index.ts          public API barrel — the entire published surface
  core/             the domain layer: what the library does
    index.ts
    Health.ts
    Metadata.ts
  types/            the shapes exchanged with callers
    index.ts
    HealthStatus.ts
    LibraryMetadata.ts
  constants/        values fixed for every caller
    index.ts
    Defaults.ts
  exceptions/       the faults raised
    index.ts
    LibraryException.ts
  utils/            helpers that do not know the domain
    index.ts
    Text.ts
```

### Module responsibility

| Directory         | Holds                                                 | May import from   |
| ----------------- | ----------------------------------------------------- | ----------------- |
| `src/index.ts`    | re-exports only — no implementation                   | every layer       |
| `src/core/`       | behaviour; rename it after your domain when forking   | every layer below |
| `src/types/`      | interfaces and type aliases callers receive or supply | nothing in `src/` |
| `src/constants/`  | values that never depend on runtime state             | nothing in `src/` |
| `src/exceptions/` | `LibraryException` and its subclasses                 | nothing in `src/` |
| `src/utils/`      | helpers that would make sense in any library          | nothing in `src/` |

### The one-way rule

Dependency arrows point _into_ the leaf layers — `types/`, `constants/`, `exceptions/`, `utils/` — and never back out.
That is what lets any of the four be read, tested, or lifted into another package without dragging the domain along.

It is enforced by a `no-restricted-imports` rule in [`eslint.config.ts`](../../eslint.config.ts), not by convention. A
convention survives only as long as everyone remembers it, and the import that breaks the boundary looks exactly like
every other import at the point it is written:

```ts
// src/utils/Text.ts — fails `npm run lint`
import { getHealthStatus } from '@/core'
```

If a leaf genuinely needs something from `core/`, the answer is to take it as an argument, or to move the shared piece
down into a leaf.

## Imports

Non-relative imports resolve through the `@/*` mapping in `tsconfig.json`:

```ts
import { LibraryException } from '@/exceptions'
import { isNonEmpty } from '@/utils/Text'
```

`baseUrl` is deliberately not used. It would make `import … from 'types'` mean `src/types`, but `types`, `constants`,
and `utils` are all real packages on npm — the meaning of such an import depends on what happens to be installed. The
`@/` prefix cannot collide, and `paths` needs no `baseUrl` (TypeScript 4.4+).

Three consumers have to agree on the mapping, and all three are configured:

| Consumer | Where                                                    |
| -------- | -------------------------------------------------------- |
| `tsc`    | `paths` in `tsconfig.json`                               |
| Jest     | `moduleNameMapper` in `jest.config.json`                 |
| Rollup   | `@rollup/plugin-typescript`, reading the same `tsconfig` |

If a bare `@/…` specifier ever appears inside `lib/`, one of the three has drifted.

## File naming

- **A file is named after its primary export**, in the case that export uses: `LibraryException.ts` exports
  `LibraryException`, `Text.ts` groups text helpers.
- **One primary export per file.** Tightly-coupled satellite types may sit alongside it — an options interface next to
  the function that takes it — but two unrelated exports belong in two files. The path then answers "where is this", and
  a change stays confined.
- **`index.ts` is always a barrel**, never an implementation.

## `test/`

Specs mirror the source path and end in `.spec.ts` (`jest.config.json` matches `.spec.ts$`):

```text
test/
  index.spec.ts           the public surface, imported the way a consumer would
  core/Metadata.spec.ts
  utils/Text.spec.ts
```

`test/index.spec.ts` earns its place by importing through the barrel rather than reaching into a module: it is the one
spec that fails if the published surface changes shape.
