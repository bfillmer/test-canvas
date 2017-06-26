// @flow
import {createAction} from 'redux-actions'

// REDUX TYPES
export const types = {
  DRAG_START: 'svg/DRAG_START',
  DRAG_END: 'svg/DRAG_END',
  DRAGGED: 'svg/DRAGGED',
  ZOOMED: 'svg/ZOOMED'
}

// FLOW TYPES
// type DragStartAction = {
//   type: string,
//   payload: {
//     x: number,
//     y: number,
//     id: string
//   }
// }
//
// type DragEndAction = {
//   type: string
// }
//
// type DraggedAction = {
//   type: string,
//   payload: {
//     x: number,
//     y: number
//   }
// }
//
// type ZoomedAction = {
//   type: string,
//   payload: {
//     dy: number,
//     id: string
//   }
// }

// ACTIONS
export const actions = {
  startDrag: createAction(types.DRAG_START, (x: number, y: number, id: string) => ({x, y, id})),
  endDrag: createAction(types.DRAG_END),
  dragging: createAction(types.DRAGGED, (x: number, y: number) => ({x, y})),
  zooming: createAction(types.ZOOMED, (dy: number, id: string) => ({dy, id}))
}
