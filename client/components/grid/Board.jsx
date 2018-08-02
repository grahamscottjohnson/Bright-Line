import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import Arrow from './Arrow'
import {Player} from '../'
import {connect} from 'react-redux'
import Block from './Block'

/*
 * Component
 */

class Board extends Component {
  makeAxis(numAxis) {
    return 'linter'
  }
  render() {
    const size = 600
    const i = this.props.i
    const j = this.props.j
    const playerX = this.props.playerX
    const playerY = this.props.playerY
    const quadrantLength = size / 2
    const blocks = this.props.blocks || []
    return (
      <svg height={size} width={size}>
        <g transform={`translate(${quadrantLength} ${quadrantLength})`}>
          {/* Base grid for reference */}
          <Grid />

          {/* Grid that player can bend
        <Grid i={i} j={j} /> */}

          {/* i and j vectors */}
          <Arrow x={i.x} y={i.y} />
          <Arrow x={j.x} y={j.y} />

          {/* Designate Origin */}
          <circle cx="0" cy="0" r="3" fill="blue" />

          <Player x={playerX} y={playerY} />

          {/* If any blocks */}
          {blocks.map(block => {
            return (
              <Block
                key={[block.x, block.y].toString()}
                x={block.x}
                y={block.y}
                size={30}
              />
            )
          })}
        </g>
      </svg>
    )
  }
}

const mapState = state => {
  return {
    i: state.i,
    j: state.j,
    playerX: state.player.x,
    playerY: state.player.y,
    blocks: state.level.blocks
  }
}

export default connect(mapState)(Board)

/*
 * Prop Settings
 */

// Board.defaultProps = {
//   i: {x: 20, y: 0},
//   j: {x: 0, y: 20},
//   playerX: 0,
//   playerY: 0
// }

Board.propTypes = {
  i: PropTypes.object,
  j: PropTypes.object
}
