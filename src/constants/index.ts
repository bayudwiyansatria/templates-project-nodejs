/**
 * Values that are fixed for every caller.
 *
 * @remarks
 * A leaf layer, on the same terms as `@/types`: nothing here may import from
 * `@/core` or the root barrel. A constant that needs to read behaviour to
 * decide its value is not a constant, and belongs in `@/core`.
 *
 * @example
 * ```ts
 * import { DEFAULT_HEALTH_MESSAGE } from '@/constants'
 * ```
 *
 * @module
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export { DEFAULT_HEALTH_MESSAGE } from '@/constants/Defaults'
