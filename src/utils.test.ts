import { data } from './data'
import { getCostFromRoutes } from './utils'

describe('getCostFromRoutes', () => {
  it('returns 4, given `A-B-E` routes', () => {
    expect(getCostFromRoutes(data.links, 'A-B-E')).toBe(4)
  })

  it('returns 10, given `A-D` routes', () => {
    expect(getCostFromRoutes(data.links, 'A-D')).toBe(10)
  })

  it('returns 8, given `E-A-C-F` routes', () => {
    expect(getCostFromRoutes(data.links, 'E-A-C-F')).toBe(8)
  })

  it('returns `No such route` error, given `A-D-F` routes', () => {
    expect(() => {
      getCostFromRoutes(data.links, 'A-D-F')
    }).toThrow('No such route')
  })
})