
import {createAction, handleActions} from 'redux-actions'

const assign = Object.assign

const svgObject = (
  id,
  matrix = [1, 0, 0, 1, 0, 0],
  dragging = false,
  dragX = 0,
  dragY = 0
) => ({
  id,
  dragging,
  matrix,
  dragX,
  dragY
})

// TYPES
const DRAG_START = 'svg/DRAG_START'
const DRAG_END = 'svg/DRAG_END'
const DRAGGED = 'svg/DRAGGED'
const ZOOMED = 'svg/ZOOMED'

// ACTIONS
export const actions = {
  startDrag: createAction(DRAG_START, (x, y, id) => ({x, y, id})),
  endDrag: createAction(DRAG_END),
  dragging: createAction(DRAGGED, (x, y) => ({x, y})),
  zooming: createAction(ZOOMED, (dy, id) => ({dy, id}))
}

// REDUCERS
const initialState = {
  dragging: false,
  svg: [
    svgObject('viewport'),
    svgObject('circle-one', [1, 0, 0, 1, -10, -10]),
    svgObject('circle-two', [1, 0, 0, 1, 20, 20])
  ]
}

// Update x, y in our matrix array with the delta x/y from moving.
const pan = (dx, dy, matrix) => matrix.map((n, i) => (i === 4) ? n + dx : (i === 5) ? n + dy : n)

// Soom in or out based on the delta of the wheel scroll.
const zoom = (dy, matrix) => {
  const scale = dy < 0 ? 1.05 : 0.95
  return matrix.map((n, i) => n * scale)
}

export const reducer = handleActions({
  [DRAG_START]: (state, action) => {
    const {id, x, y} = action.payload
    return assign({}, state, {
      dragging: id,
      svg: state.svg.map(svg => svg.id === id ? assign({}, svg, {
        dragX: x,
        dragY: y
      }) : svg)
    })
  },
  [DRAGGED]: (state, action) => {
    const {x, y} = action.payload
    return assign({}, state, {
      svg: state.svg.map(svg => {
        if (svg.id !== state.dragging) return svg
        const dx = x - svg.dragX
        const dy = y - svg.dragY
        return assign({}, svg, {
          matrix: pan(dx, dy, svg.matrix),
          dragX: x,
          dragY: y
        })
      })
    })
  },
  [DRAG_END]: (state, action) => assign({}, state, {
    dragging: false
  }),
  [ZOOMED]: (state, action) => assign({}, state, {
    svg: state.svg.map(svg => svg.id === action.payload.id ? assign({}, svg, { matrix: zoom(action.payload.dy, svg.matrix) }) : svg)
  })
}, initialState)
