/* global describe, expect, test */

import {pan, zoom} from '../transformations'

describe('Matrix Transformation Functions', () => {
  test('pan manipulates correct matrix values correctly', () => {
    const [x, y] = [4, 5]
    const matrix = [1, 0, 0, 1, 0, 0]
    const expected = [1, 0, 0, 1, x, y]
    const actual = pan(x, y, matrix)
    expect(actual).toEqual(expected)
  })

  test('zoom manipulates matrix values correctly', () => {
    const scale = 10
    const matrix = [1, 2, 3, 4, 5, 6]
    const expected = [10, 20, 30, 40, 50, 60]
    const actual = zoom(scale, matrix)
    expect(actual).toEqual(expected)
  })
})
