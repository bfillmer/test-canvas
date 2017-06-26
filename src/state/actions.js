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
type DragStartAction = {
  type: string,
  payload: {
    x: number,
    y: number,
    id: string
  }
}

type DragEndAction = {
  type: string
}

type DraggedAction = {
  type: string,
  payload: {
    x: number,
    y: number
  }
}

type ZoomedAction = {
  type: string,
  payload: {
    dy: number,
    id: string
  }
}

const startDrag: DragStartAction = createAction(types.DRAG_START, (x: number, y: number, id: string) => ({x, y, id}))
const endDrag: DragEndAction = createAction(types.DRAG_END)
const dragging: DraggedAction = createAction(types.DRAGGED, (x: number, y: number) => ({x, y}))
const zooming: ZoomedAction = createAction(types.ZOOMED, (dy: number, id: string) => ({dy, id}))

// ACTIONS
export const actions = {
  startDrag,
  endDrag,
  dragging,
  zooming
}
