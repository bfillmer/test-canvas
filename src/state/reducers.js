// @flow
import {handleActions} from 'redux-actions'

import {types} from 'state/actions'
import {assign} from 'state/utils'
import {pan, zoom} from 'state/transformations'

import {DragStartPayload, DraggedPayload, ZoomedPayload, Svg, SvgState} from 'state/types'

export const svgObject = (
  id: string,
  type: string,
  matrix: number[] = [1, 0, 0, 1, 0, 0],
  dragX: number = 0,
  dragY: number = 0
): Svg => ({
  id,
  type,
  matrix,
  dragX,
  dragY
})

export const VIEWPORT = 'VIEWPORT'
export const BLOCK = 'BLOCK'

// INITIAL STATE
const initialState: SvgState = {
  dragging: false,
  scalar: 1,
  svg: [
    svgObject('viewport', VIEWPORT),
    svgObject('block-one', BLOCK, [1, 0, 0, 1, 0, 0]),
    svgObject('block-two', BLOCK, [1, 0, 0, 1, 0, 200]),
    svgObject('block-three', BLOCK, [1, 0, 0, 1, 0, -200])
  ]
}

// REDUCER
export const reducer = handleActions({
  [types.DRAG_START]: (state: SvgState, {payload}: {payload: DragStartPayload}): SvgState => {
    const {id, x, y} = payload
    // const pt = transformPos(x, y)

    return assign({}, state, {
      dragging: id,
      svg: state.svg.map((svg: Svg) => svg.id === id ? assign({}, svg, {
        dragX: x,
        dragY: y
      }) : svg)
    })
  },
  [types.DRAGGED]: (state: SvgState, {payload}: {payload: DraggedPayload}): SvgState => {
    const {x, y} = payload
    // const pt = transformPos(x, y)

    return assign({}, state, {
      svg: state.svg.map((svg: Svg) => {
        if (svg.id !== state.dragging) return svg
        // Handle viewport differently as it controls the scale for all sub coordinate systems,
        // but doesn't need to scale it's own coordinate system.
        const dx = svg.type === 'VIEWPORT' ? (x - svg.dragX) : (x - svg.dragX) / state.scalar
        const dy = svg.type === 'VIEWPORT' ? (y - svg.dragY) : (y - svg.dragY) / state.scalar
        return assign({}, svg, {
          matrix: pan(dx, dy, svg.matrix),
          dragX: x,
          dragY: y
        })
      })
    })
  },
  [types.DRAG_END]: (state: SvgState): SvgState => assign({}, state, {
    dragging: false
  }),
  [types.ZOOMED]: (state: SvgState, {payload}: {payload: ZoomedPayload}): SvgState => {
    const {dy, id} = payload
    const scale = dy < 0 ? 1.05 : 0.95
    const matrix = state.svg.reduce((array: number[], svg: Svg) => svg.id === id ? zoom(scale, svg.matrix) : array, [])
    return assign({}, state, {
      scalar: matrix[0],
      svg: state.svg.map((svg: Svg) => svg.id === id ? assign({}, svg, { matrix }) : svg)
    })
  }
}, initialState)
