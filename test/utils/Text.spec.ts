import { isNonEmpty } from '@/utils'

describe('isNonEmpty', () => {
  it.each([['a'], ['  padded  ']])('accepts %p', value => {
    expect(isNonEmpty(value)).toBe(true)
  })

  it.each([[''], ['   '], ['\n\t'], [null], [undefined], [0], [42], [{}], [[]]])('rejects %p', value => {
    expect(isNonEmpty(value)).toBe(false)
  })
})
