
import React from 'react'
import {connect} from 'react-redux'

import {BLOCK} from 'state/reducers'

// @NOTE Blocks would individually connect to the store to get their normalized data, thus
// the viewport only updates when anything with positioning changes, and the internal Block
// state only updates when relevant Block data changes.
const Block = ({id, matrix}) => (
  <g transform={`matrix(${matrix.join(' ')})`}>
    <rect id={id} width='150' height='100' rx='6' ry='6' fill='#ccc' stroke='#666' strokeWidth='2' x='-75' y='-50' />
  </g>
)

const mapStateToProps = state => ({
  blocks: state.svg.filter(s => s.type === BLOCK)
})

const Container = ({blocks}) => {
  const renderBlocks = blocks.map(s => <Block key={s.id} {...s} />)
  return (<g>{renderBlocks}</g>)
}

export const Blocks = connect(mapStateToProps)(Container)
