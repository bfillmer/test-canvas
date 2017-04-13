
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
  matrix: [1, 0, 0, 1, 100, 100],
  dragging: false
}

// Update the last two entries in our matrix array with the delta x/y from moving.
const pan = (dx, dy, matrix) => matrix.map((n, i) => (i === 4) ? n + dx : (i === 5) ? n + dy : n)

// Scale all matrix properties when zooming.
const zoom = (dy, matrix) => {
  const scale = dy < 0 ? 1.05 : 0.95
  return matrix.map((n, i) => {
    const scaledValue = n * scale
    return (i === (4 || 5)) ? scaledValue + ((1 - scale) * 50) : scaledValue
  })
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
