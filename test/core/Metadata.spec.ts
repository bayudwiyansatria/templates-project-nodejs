import { createLibraryMetadata } from '@/core'
import { LibraryException } from '@/exceptions'

describe('createLibraryMetadata', () => {
  it('passes an optional description through untouched', () => {
    expect(createLibraryMetadata('demo-lib', '1.0.0')).toEqual({
      name: 'demo-lib',
      version: '1.0.0',
      description: undefined
    })
  })

  it.each([
    ['an empty name', '', '1.0.0'],
    ['a whitespace-only name', '   ', '1.0.0'],
    ['an empty version', 'demo-lib', ''],
    ['a whitespace-only version', 'demo-lib', '\t']
  ])('rejects %s', (_case, name, version) => {
    expect(() => createLibraryMetadata(name, version)).toThrow(LibraryException)
  })

  it('reports INVALID_ARGUMENT so callers can branch without matching the message', () => {
    expect.assertions(2)

    try {
      createLibraryMetadata('', '1.0.0')
    } catch (error) {
      expect(error).toBeInstanceOf(LibraryException)
      expect((error as LibraryException).code).toBe('INVALID_ARGUMENT')
    }
  })
})
