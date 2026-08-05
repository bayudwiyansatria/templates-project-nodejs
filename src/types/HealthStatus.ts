/**
 * The result of a health probe.
 *
 * @remarks
 * Deliberately serializable — no methods, no class — so it can cross a process
 * boundary unchanged. A consumer that logs it, returns it from an HTTP handler,
 * or asserts on it in a test all see the same shape.
 *
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export interface HealthStatus {
  /**
   * Whether the library considers itself operational.
   */
  ok: boolean

  /**
   * Human-readable detail accompanying {@link HealthStatus.ok}.
   */
  message: string

  /**
   * ISO-8601 instant at which the probe ran.
   */
  timestamp: string
}
