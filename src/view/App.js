
import React from 'react'
import {connect} from 'react-redux'

import {actions} from 'state/reducer'

const mapStateToProps = (state) => ({
  viewbox: state.viewbox,
  matrix: state.matrix,
  dragging: state.dragging
})

const Container = ({dispatch, viewbox, matrix, dragging}) => {
  const onDragStart = (e) => dispatch(actions.startDrag(e.clientX, e.clientY))
  const onDragMove = (e) => dragging ? dispatch(actions.dragging(e.clientX, e.clientY)) : null
  const onDragEnd = () => dispatch(actions.endDrag())
  const onWheel = (e) => dispatch(actions.zooming(e.deltaY))

  return (
    <svg
      width='100%'
      height='100%'
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onWheel={onWheel}
      viewBox={viewbox.join(' ')}
      preserveAspectRatio='xMidYMid slice'
    >
      <g transform={`matrix(${matrix.join(' ')})`}>
        <circle r='20' transform='matrix(1 0 0 1 -10 -10)' fill='teal' stroke='black' />
        <circle r='20' transform='matrix(1 0 0 1 20 20)' fill='teal' stroke='black' />
      </g>
    </svg>
  )
}

export const App = connect(mapStateToProps)(Container)
