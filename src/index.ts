/**
 * Public API of the library.
 *
 * @remarks
 * This file is the entire published surface. `package.json#exports` points here,
 * TypeDoc documents from here, and nothing under `lib/` reaches a consumer by
 * any other path — so a symbol is API when it appears below, and internal when
 * it does not.
 *
 * Keep it a barrel. Behaviour lives in `@/core`; putting an implementation here
 * makes the public surface something you have to read code to determine, rather
 * than something you can see at a glance.
 *
 * ## Quick start
 *
 * ```ts
 * import { createLibraryMetadata, getHealthStatus } from '@bayudwiyansatria/templates-project-nodejs'
 *
 * const status = getHealthStatus()
 * const metadata = createLibraryMetadata('@scope/package', '1.0.0', 'What it does')
 * ```
 *
 * ## Exports
 *
 * | Category   | Exports                                        |
 * | ---------- | ---------------------------------------------- |
 * | Functions  | `getHealthStatus`, `createLibraryMetadata`     |
 * | Types      | `HealthStatus`, `LibraryMetadata`              |
 * | Constants  | `DEFAULT_HEALTH_MESSAGE`                       |
 * | Exceptions | `LibraryException`                             |
 *
 * `@/utils` is deliberately absent: its helpers are internal. A fork that means
 * them as API adds `export { isNonEmpty } from '@/utils'` below — a decision
 * worth making on purpose rather than inheriting.
 *
 * @module
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */

/**
 * Functions
 */
export { createLibraryMetadata, getHealthStatus } from '@/core'

/**
 * Constants
 */
export { DEFAULT_HEALTH_MESSAGE } from '@/constants'

/**
 * Exceptions
 */
export { LibraryException } from '@/exceptions'

/**
 * Types
 */
export type { HealthStatus, LibraryMetadata } from '@/types'
