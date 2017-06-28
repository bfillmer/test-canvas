
import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  scalar: state.scalar,
  viewportMatrix: state.svg.filter(svg => svg.id === 'viewport').reduce((acc, val) => val.matrix, [])
})

const Container = ({scalar, viewportMatrix}) => {
  // Offical variable names for matrix points.
  const [a, b, c, d, e, f] = viewportMatrix
  // @TODO Viewport bounds based on 1440 viewbox. Need to convert to variables
  // along with viewbox def.
  const lBound = (-720 / scalar) - e
  const rBound = (720 / scalar) - e
  const lineSpacing = (1440/50) * scalar
  const linesPerHalf = Math.ceil((720 / scalar) / lineSpacing)
  const leftLines = []
  for (var n = 0; n <= linesPerHalf; n++) {
    // @TODO Fix y value.
    leftLines.push(
      <g key={n} transform={`translate(${-(n * lineSpacing)}, 0)`}>
        <line y2={960 / scalar} x2='0' stroke='#ccc' fill='none' strokeWidth='2' />
      </g>
    )
  }
  return (
    <g>
      {leftLines}
    </g>
  )
}

export const Grid = connect(mapStateToProps)(Container)
