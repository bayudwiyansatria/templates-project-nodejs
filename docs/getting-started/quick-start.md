# Quick Start

This walks one change through the whole loop: write it, expose it, test it, document it.

## 1. Verify the baseline

```bash
npm install
npm test        # lint, then Jest with coverage
npm run build   # four artifacts in lib/
```

## 2. Use what ships

```ts
import { createLibraryMetadata, getHealthStatus } from '@bayudwiyansatria/templates-project-nodejs'

getHealthStatus()
// { ok: true, message: 'library-ready', timestamp: '2026-08-05T09:00:00.000Z' }

createLibraryMetadata('@scope/package', '1.0.0', 'What it does')
// { name: '@scope/package', version: '1.0.0', description: 'What it does' }
```

`getHealthStatus` and `createLibraryMetadata` are placeholders. They exist to make the structure legible and to give the
test suite something real to assert on — delete them once your own code has taken their place.

## 3. Add your first export

Four steps, each in the layer that owns it. See [Directory Structure](../reference/directory-structure.md) for why the
split is where it is.

**Declare the shape** — `src/types/Greeting.ts`:

```ts
/**
 * A rendered greeting.
 *
 * @author Your Name
 * @version 1.0.0
 * @since 1.0.0
 */
export interface Greeting {
  /** The finished text. */
  text: string
}
```

Re-export it from `src/types/index.ts`.

**Write the behaviour** — `src/core/Greet.ts`:

```ts
import { LibraryException } from '@/exceptions'
import type { Greeting } from '@/types'
import { isNonEmpty } from '@/utils'

/**
 * Builds a greeting for `name`.
 *
 * @param name - Who to greet.
 *
 * @returns The rendered {@link Greeting}.
 *
 * @throws {@link LibraryException} with code `INVALID_ARGUMENT` when `name` is blank.
 *
 * @author Your Name
 * @version 1.0.0
 * @since 1.0.0
 */
export const greet = (name: string): Greeting => {
  if (!isNonEmpty(name)) {
    throw new LibraryException('INVALID_ARGUMENT', 'greet requires a non-empty name')
  }

  return { text: `Hello, ${name}` }
}
```

Re-export it from `src/core/index.ts`.

**Publish it** — add to `src/index.ts`:

```ts
export { greet } from '@/core'
export type { Greeting } from '@/types'
```

Nothing is API until it appears in `src/index.ts`. That file is the whole published surface.

**Test it** — `test/core/Greet.spec.ts`:

```ts
import { greet } from '@/core'
import { LibraryException } from '@/exceptions'

describe('greet', () => {
  it('renders a greeting', () => {
    expect(greet('World').text).toBe('Hello, World')
  })

  it('rejects a blank name', () => {
    expect(() => greet('  ')).toThrow(LibraryException)
  })
})
```

## 4. Check it all the way through

```bash
npm test
npm run build:docs
```

`npm run build:docs` fails if any exported symbol lacks a doc comment or a `{@link}` does not resolve — that is
deliberate, and it is why the JSDoc above is not optional. See [Documentation](../guides/documentation.md).

## Next

- [Directory Structure](../reference/directory-structure.md) — where code goes and why
- [Local Development](../guides/local-development.md) — every script, and what it runs
- [Publishing](../guides/publishing.md) — cutting a release
