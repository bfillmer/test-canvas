
import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  scalar: state.scalar,
  viewportMatrix: state.svg.filter(svg => svg.id === 'viewport').reduce((acc, val) => val.matrix, [])
})

// @NOTE Terrible rough first pass code.
const Container = ({scalar, viewportMatrix}) => {
  // @THOUGHTS Scaling of the drawn items comes down from the viewport automatically.
  // The width of the viewable area still needs to be filled with lines. Number of lines still needs to increase when zooming out.
  // However spacing between them should be handled naturally by scaling.
  // Panning shifts the center point x, y of the viewed area.
  // Thus we need to calculate the viewable area, number of lines to render given our scale relative to baseline.

  // @TODO These will be imported.
  const baseWidth = 1440
  const baseHeight = 960
  const viewboxWidth = baseWidth / scalar
  const viewboxHeight = baseHeight / scalar
  const halfWidth = viewboxWidth / 2
  const halfHeight = viewboxHeight / 2

  // Current Center Value
  const [centerX, centerY] = viewportMatrix.slice(4, 6)
  const gridSize = 50

  const lines = []

  // centerX + halfWidth

  // Lines to the right of center.
  for (let n = 0; n <= halfWidth - centerX; n = n + gridSize) {
    lines.push(<line key={`${n}-r`} x1={n} x2={n} y1={-halfHeight} y2={halfHeight} stroke='#a00' fill='none' strokeWidth='2' />)
  }

  // Lines to the left of center.
  // for (let n = 0; n <= halfWidth; n = n + gridSize) {
  //   // Do not duplicate the center line.
  //   if (n !== centerX) {
  //     lines.push(<line key={`${n}-l`} x1={-n} x2={-n} y1={-halfHeight} y2={halfHeight} stroke='#a00' fill='none' strokeWidth='2' />)
  //   }
  // }

  console.log('Center', centerX, centerY, 'Number of Lines', lines.length)

  return (
    <g id='viewport' transform={`matrix(${[1, 0, 0, 1, 0, 0].join(' ')})`}>
      {lines}
    </g>
  )

  // Offical variable names for matrix points.
  // const [a, b, c, d, centerX, centerY] = viewportMatrix
  // @TODO Viewport bounds based on 1440 viewbox. Need to convert to variables along with viewbox def.
  // const lBound = centerX - (720 / scalar)
  // const rBound = centerX + (720 / scalar)
  // const uBound = (-480 / scalar) - centerY
  // const dBound = (480 / scalar) - centerY
  // const lineSpacing = (1440 / 50) * scalar
  // const leftLines = []
  // const rightLines = []

  // const Left = () => (
  //   <g transform={`matrix(${[1, 0, 0, 1, lBound, uBound].join(' ')})`}>
  //     <line y2={960 / scalar} x2='0' stroke='#a00' fill='none' strokeWidth='2' />)
  //   </g>
  // )

  // const Right = () => (
  //   <g transform={`matrix(${[1, 0, 0, 1, rBound, uBound].join(' ')})`}>
  //     <line y2={960 / scalar} x2='0' stroke='#a00' fill='none' strokeWidth='2' />)
  //   </g>
  // )

  // console.log('Upper/Lower', uBound, dBound, 960 / scalar)

  // for (let n = centerX; n >= lBound; n = n - lineSpacing) {
  //   leftLines.push(
  //     <g id='viewport' key={`${n}l`} transform={`matrix(${[1, 0, 0, 1, n, uBound].join(' ')})`}>
  //       <line y2={960 / scalar} x2='0' stroke='#a00' fill='none' strokeWidth='2' />)
  //     </g>
  //   )
  // }

  // for (let n = centerX; n <= rBound; n = n + lineSpacing) {
  //   rightLines.push(
  //     <g id='viewport' key={`${n}r`} transform={`matrix(${[1, 0, 0, 1, n, uBound].join(' ')})`}>
  //       <line y2={960 / scalar} x2='0' stroke='#00a' fill='none' strokeWidth='2' />)
  //     </g>
  //   )
  // }

  // console.log('Total Lines Rendered', leftLines.length, rightLines.length)

  // return (
  //   <g>
  //     <rect width='30' height='30' fill='#100' />
  //   </g>
  // )
}

export const Grid = connect(mapStateToProps)(Container)
