import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import Arrow from './Arrow'
import {Player} from '../'
import {connect} from 'react-redux'
import Block from './Block'
import {setI} from '../../store/i'
import {setJ} from '../../store/j'

/*
 * Helper Functions
 */

const distance = (v1, v2) => {
  const side = Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2)
  return Math.pow(side, 0.5)
}

const isClose = (v, clickVector) => {
  return distance(v, clickVector) < 20
}

const getVector = event => {
  const result = {
    x: event.clientX - 300 - 8, //8 is because of margin,
    y: 300 - event.clientY + 8
  }
  return result
}

const getClosest = (newPoint, key) => {
  const hundDigit = Math.floor(newPoint[key] / 100)
  const fifties = [hundDigit * 100, hundDigit * 100 + 50, hundDigit * 100 + 100]
  const mappedFifties = fifties.map(val => Math.abs(newPoint[key] - val))
  const goodIndex = mappedFifties.indexOf(Math.min(...mappedFifties))
  const result = fifties[goodIndex]
  console.log(
    `getClosest`,
    hundDigit,
    Math.min(...mappedFifties),
    mappedFifties,
    goodIndex,
    fifties,
    result
  )
  return result
}

const getPoint = (newPoint, oldPoint, board) => {
  //board is so that I don't have to hard code it
  const x = getClosest(newPoint, 'x')
  const y = getClosest(newPoint, 'y')
  const maybeResult = {x, y}
  const result = isClose(maybeResult, newPoint) ? maybeResult : oldPoint
  console.log(`getPoint`, maybeResult, result)
  return result
}
const isPlayerAtOrigin = player => {
  return player.x === 0 && player.y === 0
}

/*
 * Component
 */

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDragging: false,
      vector: ''
    }
    this.handleMove = this.handleMove.bind(this)
    this.handleDown = this.handleDown.bind(this)
    this.handleUp = this.handleUp.bind(this)
  }
  handleDown(event) {
    //convert event vals into coord
    const player = this.props.player
    console.log(`handleDown:`, isPlayerAtOrigin(player))
    const clickVector = getVector(event)
    if (
      isClose(this.props.i, clickVector) &&
      isPlayerAtOrigin(this.props.player)
    ) {
      this.setState({isDragging: true, oldPoint: this.props.i, vector: 'i'})
    } else if (isClose(this.props.j, clickVector) && isPlayerAtOrigin(player)) {
      this.setState({isDragging: true, oldPoint: this.props.j, vector: 'j'})
    }
  }
  handleMove(event) {
    if (this.state.isDragging) {
      //convert vals into coord
      const clickVector = getVector(event)
      this.props.setVector(this.state.vector, clickVector)
    }
  }
  handleUp(event) {
    const newState = {
      isDragging: false,
      vector: ''
    }
    if (this.state.vector) {
      //convert event
      const clickVector = getVector(event)
      const newPoint = getPoint(clickVector, this.state.oldPoint, {}) //board
      this.props.setVector(this.state.vector, newPoint)
    }
    this.setState(newState)
  }

  /*
 * Render
 */

  render() {
    const size = 600
    const i = this.props.i
    const j = this.props.j
    const player = this.props.player
    const playerX = player.x
    const playerY = player.y
    const quadrantLength = size / 2
    const blocks = this.props.blocks || []
    return (
      <svg
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={this.handleDown}
        onMouseMove={this.handleMove}
        onMouseUp={this.handleUp}
      >
        <g transform={`translate(${quadrantLength} ${quadrantLength})`}>
          {/* Base grid for reference */}
          <Grid color="ddd" />

          {/* Grid that player can bend */}
          <Grid i={i} j={j} color="black" />

          {/* i and j vectors */}
          <Arrow
            x={i.x}
            y={i.y}
            color={isPlayerAtOrigin(player) ? '0f0' : '0a0'}
          />
          <Arrow
            x={j.x}
            y={j.y}
            color={isPlayerAtOrigin(player) ? 'f00' : 'a00'}
          />

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
    player: state.player,
    // playerX: state.player.x,
    // playerY: state.player.y,
    blocks: state.level.blocks
  }
}

const mapDispatch = dispatch => {
  return {
    setVector: (name, vector) => {
      if (name === 'i') {
        dispatch(setI(vector.x, vector.y))
      } else if (name === 'j') {
        dispatch(setJ(vector.x, vector.y))
      }
    }
  }
}

export default connect(mapState, mapDispatch)(Board)

/*
 * Prop Settings
 */

// Board.defaultProps = {
//   i: {x: 20, y: 0},
//   j: {x: 0, y: 20},
//   playerX: 0,
//   playerY: 0
// }

// Board.propTypes = {
//   i: PropTypes.object,
//   j: PropTypes.object
// }
