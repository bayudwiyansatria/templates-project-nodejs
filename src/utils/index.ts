/**
 * Internal helpers.
 *
 * @remarks
 * A leaf layer: nothing here may import from `@/core` or the root barrel. The
 * test is whether the helper would still make sense in a library about
 * something else — if it needs to know what this library does, it belongs in
 * `@/core`.
 *
 * These are **not** part of the published API. `src/index.ts` deliberately does
 * not re-export this barrel; a fork that wants its helpers to be API adds one
 * line there, which is a decision worth making explicitly rather than
 * inheriting. Compare `nodejs-auth-client`, which does publish its `utils/`
 * because `parseJwt` and `cleanupAuthUrl` are genuinely part of its surface.
 *
 * @example
 * ```ts
 * import { isNonEmpty } from '@/utils'
 * ```
 *
 * @module
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export { isNonEmpty } from '@/utils/Text'
