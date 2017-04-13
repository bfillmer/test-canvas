
import React from 'react'
import {connect} from 'react-redux'

import {actions} from 'state/reducer'

const Circle = () => <circle r='50' fill='teal' stroke='black' />

const mapStateToProps = (state) => ({
  matrix: state.matrix,
  dragging: state.dragging
})

export const Container = ({dispatch, matrix, dragging}) => {
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
    >
      <g transform={`matrix(${matrix.join(' ')})`}>
        <Circle />
      </g>
    </svg>
  )
}

export const App = connect(mapStateToProps)(Container)
