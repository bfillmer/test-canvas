// @flow
import {handleActions} from 'redux-actions'

import {types} from 'state/actions'
import {assign} from 'state/utils'
import {pan, zoom} from 'state/transformations'

import {DragStartPayload, DraggedPayload, ZoomedPayload, Svg, SvgState} from 'state/types'

const svgObject = (
  id,
  matrix = [1, 0, 0, 1, 0, 0],
  dragX = 0,
  dragY = 0
): Svg => ({id, matrix, dragX, dragY})

// INITIAL STATE
export const initialState:SvgState = {
  dragging: false,
  scalar: 1,
  svg: [
    svgObject('viewport'),
    svgObject('circle-one', [1, 0, 0, 1, -10, -10]),
    svgObject('circle-two', [1, 0, 0, 1, -10, 40]),
    svgObject('circle-three', [1, 0, 0, 1, -10, -60]),
    svgObject('circle-four', [1, 0, 0, 1, 80, -10]),
    svgObject('circle-five', [1, 0, 0, 1, 80, 40]),
    svgObject('circle-six', [1, 0, 0, 1, 80, -60]),
    svgObject('circle-seven', [1, 0, 0, 1, 35, -10]),
    svgObject('circle-eight', [1, 0, 0, 1, 170, -10]),
    svgObject('circle-nine', [1, 0, 0, 1, 170, 40]),
    svgObject('circle-ten', [1, 0, 0, 1, 170, -60])
  ]
}

// REDUCER
export const reducer = handleActions({
  [types.DRAG_START]: (state, {payload}: {payload: DragStartPayload}) => {
    const {id, x, y} = payload
    return assign({}, state, {
      dragging: id,
      svg: state.svg.map(svg => svg.id === id ? assign({}, svg, {
        dragX: x,
        dragY: y
      }) : svg)
    })
  },
  [types.DRAGGED]: (state, {payload}: {payload: DraggedPayload}) => {
    const {x, y} = payload
    return assign({}, state, {
      svg: state.svg.map(svg => {
        if (svg.id !== state.dragging) return svg
        const dx = (x - svg.dragX) / state.scalar
        const dy = (y - svg.dragY) / state.scalar
        return assign({}, svg, {
          matrix: pan(dx, dy, svg.matrix),
          dragX: x,
          dragY: y
        })
      })
    })
  },
  [types.DRAG_END]: (state, action) => assign({}, state, {
    dragging: false
  }),
  [types.ZOOMED]: (state, {payload}: {payload: ZoomedPayload}) => {
    const {dy, id} = payload
    const scale = dy < 0 ? 1.05 : 0.95
    const matrix = state.svg.reduce((array, svg) => svg.id === id ? zoom(scale, svg.matrix) : array, [])
    return assign({}, state, {
      scalar: matrix[0],
      svg: state.svg.map(svg => svg.id === id ? assign({}, svg, { matrix }) : svg)
    })
  }
}, initialState)
