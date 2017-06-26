
import {createAction} from 'redux-actions'

// TYPES
export const types = {
  DRAG_START: 'svg/DRAG_START',
  DRAG_END: 'svg/DRAG_END',
  DRAGGED: 'svg/DRAGGED',
  ZOOMED: 'svg/ZOOMED'
}

// ACTIONS
export const actions = {
  startDrag: createAction(types.DRAG_START, (x, y, id) => ({x, y, id})),
  endDrag: createAction(types.DRAG_END),
  dragging: createAction(types.DRAGGED, (x, y) => ({x, y})),
  zooming: createAction(types.ZOOMED, (dy, id) => ({dy, id}))
}
