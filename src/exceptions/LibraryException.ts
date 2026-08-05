/**
 * Base exception for every fault this library raises.
 *
 * @remarks
 * A library that throws bare `Error` gives a caller nothing to narrow on: the
 * only way to tell a fault of ours from one thrown by the runtime is to match on
 * a message, which is prose and changes. Extending `Error` once, here, gives
 * consumers `instanceof LibraryException` and a stable {@link
 * LibraryException.code} to branch on.
 *
 * Three details exist for reasons that are easy to lose:
 *
 * - `Object.setPrototypeOf` is required because the build targets ES2020 by way
 *   of a downlevelled class. Without it `instanceof` returns `false` for
 *   subclasses in the emitted CommonJS bundle, which defeats the entire point.
 * - `name` is assigned from the constructor rather than hard-coded, so a
 *   subclass reports its own name without restating it.
 * - {@link LibraryException.cause} is declared on the class rather than taken
 *   from `ErrorOptions`. The second `Error` constructor argument is ES2022, and
 *   this project's `lib` is ES2020 — declaring the field keeps exception
 *   chaining available without moving the language baseline for every consumer.
 *
 * @example
 * ```ts
 * try {
 *   createLibraryMetadata('', '1.0.0')
 * } catch (error) {
 *   if (error instanceof LibraryException && error.code === 'INVALID_ARGUMENT') {
 *     // recover
 *   }
 * }
 * ```
 *
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export class LibraryException extends Error {
  /**
   * Stable, machine-readable identifier for the fault.
   *
   * @remarks
   * Branch on this rather than on {@link LibraryException.message}, which is
   * written for humans and may be reworded in any release.
   */
  public readonly code: string

  /**
   * The failure this one was raised in response to, when there was one.
   *
   * @remarks
   * Set it whenever this exception is thrown from a `catch` block. Discarding
   * the original leaves the caller with a description of what the library
   * concluded and nothing about what actually went wrong underneath.
   */
  public readonly cause?: unknown

  /**
   * @param code - Stable identifier for the fault, e.g. `INVALID_ARGUMENT`.
   * @param message - Human-readable explanation of what went wrong.
   * @param cause - The underlying failure, when this exception wraps one.
   */
  public constructor(code: string, message: string, cause?: unknown) {
    super(message)

    this.code = code
    this.cause = cause
    this.name = new.target.name

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
