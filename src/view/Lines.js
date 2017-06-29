
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

const point = ([x, y]) => (`${x},${y}`)

const Container = ({lines}) => {
  const renderLines = lines.map(({a, b}, key) => {
    const [aX, aY, bX, bY] = [a[4], a[5], b[4], b[5]]
    // Calculate total movement in x & y directions. [DONE]
    // Whichever is longer, move half that direction. [DONE]
    // Then the total distance in the other direction. [DONE]
    // Then finish up the rest of the way. [DONE]
    const p1 = [aX, aY]
    const [mX, mY] = [(aX + bX) / 2, (aY + bY) / 2]
    const [diffX, diffY] = [Math.abs(bX - aX), Math.abs(bY - aY)]
    const p2 = (diffX > diffY) ? [mX, aY] : [aX, mY]
    const p3 = (diffX > diffY) ? [mX, bY] : [bX, mY]
    const p4 = [bX, bY]
    const points = [
      point(p1),
      point(p2),
      point(p3),
      point(p4)
    ]
    return <polyline key={key} fill='none' stroke='#333' strokeWidth='4' strokeLinejoin='round' points={points.join(' ')} />
  })
  return (
    <g id='viewport'>
      {renderLines}
    </g>
  )
}

export const Lines = connect(mapStateToProps)(Container)
