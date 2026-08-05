/**
 * Constants
 */
import { DEFAULT_HEALTH_MESSAGE } from '@/constants'

/**
 * Types
 */
import type { HealthStatus } from '@/types'

/**
 * Returns a health payload describing the current state of the library.
 *
 * @remarks
 * Everything except `timestamp` is deterministic, which is what makes this
 * usable as a smoke test: a caller can assert the whole shape and only has to
 * treat one field as variable.
 *
 * @param message - Detail to report alongside the status. Defaults to
 *   {@link DEFAULT_HEALTH_MESSAGE}.
 *
 * @returns A {@link HealthStatus} stamped with the current instant.
 *
 * @example
 * ```ts
 * getHealthStatus()
 * // { ok: true, message: 'library-ready', timestamp: '2026-08-05T09:00:00.000Z' }
 * ```
 *
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export const getHealthStatus = (message: string = DEFAULT_HEALTH_MESSAGE): HealthStatus => {
  return {
    ok: true,
    message,
    timestamp: new Date().toISOString()
  }
}
