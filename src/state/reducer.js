
import {createAction, handleActions} from 'redux-actions'

const assign = Object.assign

// TYPES
const DRAG_START = 'svg/DRAG_START'
const DRAG_END = 'svg/DRAG_END'
const DRAGGED = 'svg/DRAGGED'
const ZOOMED = 'svg/ZOOMED'

// ACTIONS
export const actions = {
  startDrag: createAction(DRAG_START, (x, y) => ({x, y})),
  endDrag: createAction(DRAG_END),
  dragging: createAction(DRAGGED, (x, y) => ({x, y})),
  zooming: createAction(ZOOMED, dy => ({dy}))
}

// REDUCERS
const initialState = {
  viewbox: [-(1440 / 2), -(960 / 2), 1440, 960],
  matrix: [1, 0, 0, 1, 0, 0],
  dragging: false
}

// Update the last two entries in our matrix array with the delta x/y from moving.
const pan = (dx, dy, matrix) => matrix.map((n, i) => (i === 4) ? n + dx : (i === 5) ? n + dy : n)

// Scale all matrix properties when zooming.
const zoom = (dy, matrix) => {
  // Soom in or out based on the delta of the wheel scroll.
  const scale = dy < 0 ? 1.05 : 0.95
  return matrix.map((n, i) => n * scale)
}

export const reducer = handleActions({
  [DRAG_START]: (state, action) => assign({}, state, {
    dragging: true,
    x: action.payload.x,
    y: action.payload.y
  }),
  [DRAGGED]: (state, action) => {
    const {x, y} = action.payload
    const dx = x - state.x
    const dy = y - state.y
    return assign({}, state, {
      matrix: pan(dx, dy, state.matrix),
      x: x,
      y: y
    })
  },
  [DRAG_END]: (state, action) => assign({}, state, { dragging: false }),
  [ZOOMED]: (state, action) => assign({}, state, {
    matrix: zoom(action.payload.dy, state.matrix)
  })
}, initialState)

// @NOTE All of the above applies to the canvas as canvas-transformations.
// Need to reuse panning for element-based transformations.
// Reuse basic matrix math for element-based transformations.
// Place element data in a collection in state.
// Determine whether the click happens on the element or the canvas.
// Zoom based on center point. Convert all x/y coords relative to center?
