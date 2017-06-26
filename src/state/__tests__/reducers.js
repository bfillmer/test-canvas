/* global describe, expect, test */

import {actions} from '../actions'
import {reducer} from '../reducers'

const svgId = 'test-id'
const initialState = {
  dragging: false,
  scalar: 1,
  svg: [{
    id: svgId,
    matrix: [1, 0, 0, 1, 0, 0],
    dragX: 0,
    dragY: 0
  }]
}

describe('Svg Reducer Functions', () => {
  test('DRAG_START', () => {
    const [x, y, id] = [10, 20, svgId]
    const expected = {
      dragging: svgId,
      scalar: 1,
      svg: [{
        id: svgId,
        matrix: [1, 0, 0, 1, 0, 0],
        dragX: x,
        dragY: y
      }]
    }
    const action = actions.startDrag(x, y, id)
    const actual = reducer(initialState, action)
    expect(actual).toEqual(expected)
  })

  test('DRAGGED', () => {
    const [x, y] = [20, 30]
    const modifiedState = {
      dragging: svgId,
      scalar: 1,
      svg: [{
        id: svgId,
        matrix: [1, 0, 0, 1, 0, 0],
        dragX: 0,
        dragY: 0
      }]
    }
    const expected = {
      dragging: svgId,
      scalar: 1,
      svg: [{
        id: svgId,
        matrix: [1, 0, 0, 1, 20, 30],
        dragX: 20,
        dragY: 30
      }]
    }
    const action = actions.dragging(x, y)
    const actual = reducer(modifiedState, action)
    expect(actual).toEqual(expected)
  })

  test('DRAG_END', () => {
    const modifiedState = {
      dragging: svgId,
      scalar: 1,
      svg: [{
        id: svgId,
        matrix: [1, 0, 0, 1, 0, 0],
        dragX: 0,
        dragY: 0
      }]
    }
    const action = actions.endDrag()
    const actual = reducer(modifiedState, action)
    expect(actual).toEqual(initialState)
  })

  test('ZOOMED', () => {
    const [dy, id] = [20, svgId]
    const scalar = 0.95
    const expected = {
      dragging: false,
      scalar,
      svg: [{
        id: svgId,
        matrix: [scalar, 0, 0, scalar, 0, 0],
        dragX: 0,
        dragY: 0
      }]
    }
    const action = actions.zooming(dy, id)
    const actual = reducer(initialState, action)
    expect(actual).toEqual(expected)
  })
})
