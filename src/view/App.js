
import React from 'react'
import {connect} from 'react-redux'

import {Viewport} from 'view/Viewport'

const mapStateToProps = state => ({
  svg: state.svg
})

// @TODO Move circles to their own component, rendering (#dadjoke) App a dumb component.
const Container = ({svg}) => {
  const circles = svg.filter(s => s.id !== 'viewport').map(s => <circle key={s.id} id={s.id} transform={`matrix(${s.matrix.join(' ')})`} r='20' fill='teal' stroke='black' />)

  return (
    <Viewport>
      {circles}
    </Viewport>
  )
}

export const App = connect(mapStateToProps)(Container)
