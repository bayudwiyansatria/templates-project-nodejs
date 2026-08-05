/**
 * Reports whether a value is a string carrying at least one non-whitespace
 * character.
 *
 * @remarks
 * Narrower than a truthiness check on purpose. `' '` is truthy, and a name or
 * version made entirely of spaces is not a name or a version — accepting one
 * pushes the failure downstream to whoever reads the metadata, which is a worse
 * place to discover it.
 *
 * @param value - Any value; no assumption is made about its type.
 *
 * @returns `true` when `value` is a string with non-whitespace content.
 *
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export const isNonEmpty = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0
}
