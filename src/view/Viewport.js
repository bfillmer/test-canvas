
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

// @TODO The rendered size of the svg needs to be used for the viewbox computations.
// We could pass this along as props to things like the grid, or store in redux state.
// We probably also want to consider what the scalar should be like depending on viewBox
// dimensions. Likely we would establish default breakpoints for that, then obviously
// override any scalar with one pulled from an API if we were storing editor state.
// react-measure can give us bounds on render, and takes an onResize callback.
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
    id='viewport'
    width='100%'
    height='100%'
    onMouseDown={onDragStart}
    onMouseMove={e => onDragMove(e, dragging)}
    onMouseUp={onDragEnd}
    onWheel={onWheel}
    viewBox={[-(1440 / 2), -(960 / 2), 1440, 960].join(' ')}
    preserveAspectRatio='xMidYMid slice'
  >
    <g transform={`matrix(${viewportMatrix})`}>
      {children}
    </g>
  </svg>
)

export const Viewport = connect(mapStateToProps, mapDispatchToProps)(Container)
