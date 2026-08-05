/**
 * Exceptions
 */
import { LibraryException } from '@/exceptions'

/**
 * Types
 */
import type { LibraryMetadata } from '@/types'

/**
 * Functions
 */
import { isNonEmpty } from '@/utils'

/**
 * Builds a validated {@link LibraryMetadata} record.
 *
 * @remarks
 * Validation happens here rather than at the call site because metadata is
 * typically assembled once, at module load, and then read everywhere else. A
 * blank name that is allowed through surfaces later as an empty string in a log
 * line or a documentation heading, far from the code that produced it.
 *
 * `description` is genuinely optional and is passed through untouched.
 *
 * @param name - Package name, including the scope when there is one.
 * @param version - Semantic version of the package.
 * @param description - Optional one-line summary.
 *
 * @returns The assembled {@link LibraryMetadata}.
 *
 * @throws {@link LibraryException} with code `INVALID_ARGUMENT` when `name` or
 *   `version` is missing, not a string, or entirely whitespace.
 *
 * @example
 * ```ts
 * createLibraryMetadata('@scope/package', '1.0.0', 'What it does')
 * ```
 *
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export const createLibraryMetadata = (name: string, version: string, description?: string): LibraryMetadata => {
  if (!isNonEmpty(name)) {
    throw new LibraryException('INVALID_ARGUMENT', 'Library metadata requires a non-empty name')
  }

  if (!isNonEmpty(version)) {
    throw new LibraryException('INVALID_ARGUMENT', 'Library metadata requires a non-empty version')
  }

  return {
    name,
    version,
    description
  }
}
