/**
 * The faults this library raises.
 *
 * @remarks
 * A leaf layer: nothing here may import from `@/core` or the root barrel. An
 * exception that needs domain behaviour to construct itself is a sign the
 * behaviour belongs in `@/core` and the exception should take its result as a
 * constructor argument.
 *
 * A fork adds its own subclasses of
 * [`LibraryException`](./LibraryException.ts) beside it and re-exports them
 * here, so a consumer can still catch every fault with one `instanceof`.
 *
 * @example
 * ```ts
 * import { LibraryException } from '@/exceptions'
 * ```
 *
 * @module
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export { LibraryException } from '@/exceptions/LibraryException'
