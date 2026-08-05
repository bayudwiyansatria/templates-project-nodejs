/**
 * Identity of a published package.
 *
 * @remarks
 * `description` is optional because `package.json` treats it as optional; the
 * two are meant to line up field for field.
 *
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export interface LibraryMetadata {
  /**
   * Package name, including the scope when there is one.
   */
  name: string

  /**
   * Semantic version of the package.
   */
  version: string

  /**
   * One-line summary of what the package does.
   */
  description?: string
}
