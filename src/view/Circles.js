
import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  circles: state.svg.filter(s => s.id !== 'viewport')
})

const Container = ({circles}) => {
  const renderCircles = circles.map(s => <circle key={s.id} id={s.id} transform={`matrix(${s.matrix.join(' ')})`} r='20' fill='teal' stroke='black' />)
  return (<g>{renderCircles}</g>)
}

export const Circles = connect(mapStateToProps)(Container)
