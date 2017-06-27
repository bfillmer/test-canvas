
import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  gridSize: state.scalar * 40
})

const Container = ({gridSize}) => (
  <g>
    <defs>
      <pattern id='grid' x={gridSize} y={gridSize} width={gridSize} height={gridSize} patternUnits='userSpaceOnUse' preserveAspectRatio='xMidYMid slice'>
        <rect width={gridSize} height={gridSize} stroke='#ddd' fill='#eee' />
      </pattern>
    </defs>
    <rect id='viewport' width='100%' height='100%' fill='url(#grid)' x='-720' y='-480' />
  </g>
)

export const Grid = connect(mapStateToProps)(Container)
