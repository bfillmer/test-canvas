// @flow
import {createAction} from 'redux-actions'

import {DragStartPayload, DraggedPayload, ZoomedPayload} from 'state/types'

// REDUX TYPES
export const types = {
  DRAG_START: 'svg/DRAG_START',
  DRAG_END: 'svg/DRAG_END',
  DRAGGED: 'svg/DRAGGED',
  ZOOMED: 'svg/ZOOMED'
}

// ACTIONS
export const actions = {
  startDrag: createAction(types.DRAG_START, (x: number, y: number, id: string): DragStartPayload => ({x, y, id})),
  endDrag: createAction(types.DRAG_END),
  dragging: createAction(types.DRAGGED, (x: number, y: number): DraggedPayload => ({x, y})),
  zooming: createAction(types.ZOOMED, (dy: number, id: string): ZoomedPayload => ({dy, id}))
}
