# API Overview

The generated reference is written to `dist/docs/` by `npm run build:docs`, and served at `http://localhost/docs/` by
the documentation site. This page is the short version, plus the rule that decides what belongs on it.

## What counts as API

A symbol is public when it is re-exported from [`src/index.ts`](../../src/index.ts), and internal when it is not. There
is no second mechanism: `package.json#exports` names `lib/index.d.ts` and the two bundles built from that one entry, so
nothing else in `lib/` is reachable by any path a consumer can write.

This is why `src/index.ts` is a barrel with no implementation in it. Keeping it that way means the published surface is
something you can see, rather than something you have to read the codebase to determine.

## Current exports

Placeholders — they exist to make the structure legible and give the suite something to assert on. Replace them.

### Functions

| Export                                               | Returns           | Throws                                  |
| ---------------------------------------------------- | ----------------- | --------------------------------------- |
| `getHealthStatus(message?)`                          | `HealthStatus`    | —                                       |
| `createLibraryMetadata(name, version, description?)` | `LibraryMetadata` | `LibraryException` / `INVALID_ARGUMENT` |

### Types

| Export            | Shape                             |
| ----------------- | --------------------------------- |
| `HealthStatus`    | `{ ok, message, timestamp }`      |
| `LibraryMetadata` | `{ name, version, description? }` |

### Constants

| Export                   | Value             |
| ------------------------ | ----------------- |
| `DEFAULT_HEALTH_MESSAGE` | `'library-ready'` |

### Exceptions

| Export             | Carries                                    |
| ------------------ | ------------------------------------------ |
| `LibraryException` | `code`, `message`, and an optional `cause` |

## Errors are branched on by code

`LibraryException` extends `Error` once so consumers get `instanceof` and a stable `code`:

```ts
import { LibraryException } from '@bayudwiyansatria/templates-project-nodejs'

try {
  createLibraryMetadata('', '1.0.0')
} catch (error) {
  if (error instanceof LibraryException && error.code === 'INVALID_ARGUMENT') {
    // recover
  }
}
```

Branch on `code`, not on `message`. The message is written for humans and may be reworded in any release; the code is
the contract.

## What is not exported

`src/utils/` is internal. Its helpers are re-exported from `@/utils` for use inside the library, but `src/index.ts`
deliberately omits them — a fork that means them as API adds the line itself, which is a decision worth making on
purpose rather than inheriting.
