
import React from 'react'

export const Viewport = ({
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
    onMouseDown={onDragStart}
    onMouseMove={onDragMove}
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
