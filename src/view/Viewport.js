
import React from 'react'
import {connect} from 'react-redux'

import {actions} from 'state/actions'

const mapStateToProps = state => ({
  dragging: state.dragging,
  viewportMatrix: state.svg.filter(svg => svg.id === 'viewport').reduce((acc, val) => val.matrix.join(' '), [])
})

const mapDispatchToProps = (dispatch, props) => ({
  onDragStart: e => dispatch(actions.startDrag(e.clientX, e.clientY, e.target.id)),
  onDragMove: (e, dragging) => dragging ? dispatch(actions.dragging(e.clientX, e.clientY)) : null,
  onDragEnd: e => dispatch(actions.endDrag(e.target.id)),
  onWheel: e => dispatch(actions.zooming(e.deltaY, 'viewport'))
})

const Container = ({
  dragging,
  onDragStart,
  onDragMove,
  onDragEnd,
  onWheel,
  viewportMatrix,
  children
}) => (
  <svg
    width='100%'
    height='100%'
    id='viewport'
    onMouseDown={e => onDragStart(e)}
    onMouseMove={e => onDragMove(e, dragging)}
    onMouseUp={e => onDragEnd(e)}
    onWheel={e => onWheel(e)}
    viewBox={[-(1440 / 2), -(960 / 2), 1440, 960].join(' ')}
    preserveAspectRatio='xMidYMid slice'
  >
    <g transform={`matrix(${viewportMatrix})`}>
      {children}
    </g>
  </svg>
)

export const Viewport = connect(mapStateToProps, mapDispatchToProps)(Container)
