
import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  scalar: state.scalar,
  viewportMatrix: state.svg.filter(svg => svg.id === 'viewport').reduce((acc, val) => val.matrix, [])
})

// Viewport constants. Need to be set and leveraged both in Grid and Viewport.
const baseWidth = 1440
const baseHeight = 960
const viewboxWidth = baseWidth
const viewboxHeight = baseHeight
const halfWidth = viewboxWidth / 2
const halfHeight = viewboxHeight / 2

// @NOTE First pass code. More hardcoded into the render function than necessary.
// @TODO Set limits on scalar in the reducer to prevent excessive zoom out.
const Container = ({scalar, viewportMatrix}) => {
  // Current Center Value
  const [centerX, centerY] = viewportMatrix.slice(4, 6)
  const gridSize = 50

  // Additional grid unit added to each bound to ensure grid scales to just outside the viewport.
  // Grid unit adjusted for scalar when added, then the bould is adjusted for scalar after.
  const bounds = {
    left: (-(centerX + halfWidth) - (gridSize * scalar)) / scalar,
    right: ((halfWidth - centerX) + (gridSize * scalar)) / scalar,
    top: (-(centerY + halfHeight) - (gridSize * scalar)) / scalar,
    bottom: ((halfHeight - centerY) + (gridSize * scalar)) / scalar
  }

  // Calculate the maximum lines from the center point to any given bound direction.
  const maxLines = b => Math.ceil(b / gridSize) * gridSize

  const left = maxLines(bounds.left)
  const right = maxLines(bounds.right)
  const top = maxLines(bounds.top)
  const bottom = maxLines(bounds.bottom)

  const lines = []

  for (let n = left; n <= right; n += gridSize) {
    lines.push(<line key={`${n}-v`} x1={n} x2={n} y1={top} y2={bottom} stroke='#fff' fill='none' strokeWidth='2' />)
  }

  for (let n = top; n <= bottom; n += gridSize) {
    lines.push(<line key={`${n}-h`} x1={left} x2={right} y1={n} y2={n} stroke='#fff' fill='none' strokeWidth='2' />)
  }

  const center = (<circle cx='0' cy='0' r='6' stroke='#ddd' strokeWidth='1' fill='#ddd' />)

  // id set to viewport so that drag events fire and update the viewport matrix.
  return (
    <g id='viewport' transform={`matrix(${[1, 0, 0, 1, 0, 0].join(' ')})`}>
      {lines}
      {center}
    </g>
  )
}

export const Grid = connect(mapStateToProps)(Container)
