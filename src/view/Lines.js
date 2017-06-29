
import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  lines: state.blocks.filter(block => !!block.dependsOn).map(block => {
    const a = state.svg.reduce((array, svg) => svg.id === block.dependsOn ? svg.matrix : array, [])
    const b = state.svg.reduce((array, svg) => svg.id === block.id ? svg.matrix : array, [])
    return {
      a,
      b
    }
  })
})

const point = (x, y) => (`${x},${y}`)

const Container = ({lines}) => {
  const renderLines = lines.map(({a, b}, key) => {
    const points = [
      point(a[4], a[5]),
      point(b[4], b[5])
    ]
    return <polyline key={key} fill='none' stroke='#333' strokeWidth='2' points={points.join(' ')} />
  })
  return (
    <g id='viewport'>
      {renderLines}
    </g>
  )
}

export const Lines = connect(mapStateToProps)(Container)
