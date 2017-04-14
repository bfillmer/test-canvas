
import React from 'react'
import {connect} from 'react-redux'

import {actions} from 'state/reducer'

import {Viewport} from 'view/Viewport'

const mapStateToProps = (state) => ({
  dragging: state.dragging,
  svg: state.svg
})

const Container = ({dispatch, dragging, svg}) => {
  const onDragStart = (e) => dispatch(actions.startDrag(e.clientX, e.clientY, e.target.id))
  const onDragMove = (e) => dragging ? dispatch(actions.dragging(e.clientX, e.clientY, e.target.id)) : null
  const onDragEnd = (e) => dispatch(actions.endDrag(e.target.id))
  const onWheel = (e) => dispatch(actions.zooming(e.deltaY, 'viewport'))
  const viewportMatrix = svg.filter(svg => svg.id === 'viewport').reduce((acc, val) => val.matrix.join(' '), [])

  const viewportProps = {
    onDragStart,
    onDragMove,
    onDragEnd,
    onWheel,
    viewportMatrix
  }

  const circles = svg.filter(s => s.id !== 'viewport').map(s => <circle id={s.id} transform={`matrix(${s.matrix.join(' ')})`} r='20' fill='teal' stroke='black' />)

  return (
    <Viewport {...viewportProps}>
      {circles}
    </Viewport>
  )
}

export const App = connect(mapStateToProps)(Container)
