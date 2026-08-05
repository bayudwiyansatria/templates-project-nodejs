/**
 * The shapes this library exchanges with its callers.
 *
 * @remarks
 * A leaf layer: nothing here may import from `@/core` or the root barrel, so a
 * type can be read without loading any behaviour. That direction is enforced by
 * a `no-restricted-imports` rule in [`eslint.config.ts`](../../eslint.config.ts)
 * rather than left to convention — the import that breaks it looks exactly like
 * every other import at the moment it is written.
 *
 * Types are declared here and re-exported from
 * [`src/index.ts`](../index.ts), so a consumer never imports from this path
 * directly. Within the library, reach them through `@/types`.
 *
 * @example
 * ```ts
 * import type { HealthStatus, LibraryMetadata } from '@/types'
 * ```
 *
 * @module
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export type { HealthStatus } from '@/types/HealthStatus'
export type { LibraryMetadata } from '@/types/LibraryMetadata'
