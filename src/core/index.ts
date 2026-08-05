/**
 * The domain layer — what this library actually does.
 *
 * @remarks
 * **Rename this directory when you fork.** `core` is a placeholder; the name
 * should say what the library is about, the way `nodejs-auth-client` calls its
 * equivalent `client/`. Everything else in `src/` is supporting cast:
 *
 * | Layer            | Holds                                        | May import               |
 * | ---------------- | -------------------------------------------- | ------------------------ |
 * | `@/core`         | behaviour                                     | every layer below        |
 * | `@/types`        | the shapes exchanged with callers             | nothing in `src/`        |
 * | `@/constants`    | values fixed for every caller                 | nothing in `src/`        |
 * | `@/exceptions`   | the faults raised                             | nothing in `src/`        |
 * | `@/utils`        | helpers that do not know the domain           | nothing in `src/`        |
 *
 * The arrow runs one way, and a `no-restricted-imports` rule in
 * [`eslint.config.ts`](../../eslint.config.ts) keeps it that way. That
 * direction is what lets a leaf layer be read, tested, or lifted out without
 * dragging the domain along.
 *
 * @example
 * ```ts
 * import { createLibraryMetadata, getHealthStatus } from '@/core'
 * ```
 *
 * @module
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export { getHealthStatus } from '@/core/Health'
export { createLibraryMetadata } from '@/core/Metadata'
