import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import Arrow from './Arrow'
import {Player} from '../'
import {connect} from 'react-redux'
import Block from './Block'
import {setI} from '../../store/i'
import {setJ} from '../../store/j'
import Door from './Door'
import Key from './Key'

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

  /*
 * Arrow Drag functions
 */

  handleDown(event) {
    //convert event vals into coord
    const player = this.props.player
    if (
      event.target.className.baseVal === 'i-point' &&
      this.isPlayerAtOrigin(this.props.player)
    ) {
      this.setState({isDragging: true, oldPoint: this.props.i, vector: 'i'})
    } else if (
      event.target.className.baseVal === 'j-point' &&
      this.isPlayerAtOrigin(player)
    ) {
      this.setState({isDragging: true, oldPoint: this.props.j, vector: 'j'})
    }
  }
  handleMove(event) {
    if (this.state.isDragging && event.target.className.baseVal === 'board') {
      const clickVector = this.getVector(event)
      this.props.setVector(this.state.vector, clickVector)
    }
  }
  handleUp(event) {
    if (this.state.vector) {
      const clickVector = this.props[this.state.vector]
      //scaling because validatePoint is easier when it's the redux coordinate
      const scaledVector = scaleVector(clickVector, 12 / this.props.size)
      const newPoint = this.validatePoint(scaledVector, this.state.oldPoint, {}) //board
      this.props.setVector(this.state.vector, newPoint)
    }
    this.setState({
      isDragging: false,
      vector: ''
    })
  }

  /*
 * Helper Functions
 */
  getVector(event) {
    //expects to be run from the overall board object for the right offset
    const rect = event.target.getBoundingClientRect()
    const clickPositionX = event.clientX - rect.left
    const clickPositionY = event.clientY - rect.top
    const size = this.props.size
    const x = clickPositionX - size / 2
    const y = size / 2 - clickPositionY
    const vector = {x, y}
    return vector
  }
  distance(v1, v2) {
    const side = Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2)
    return Math.pow(side, 0.5)
  }

  isClose(v, clickVector) {
    return this.distance(v, clickVector) < 0.4
  }

  getClosest(point) {
    //ex: {x:.8, y:.2} => {x:1, y:0}
    const resultPoint = {}
    Object.keys(point).forEach(dimension => {
      resultPoint[dimension] = Math.round(point[dimension])
    })
    return resultPoint
  }

  validatePoint(newPoint, oldPoint) {
    const maybeResult = this.getClosest(newPoint)
    const result = this.isClose(maybeResult, newPoint)
      ? scaleVector(maybeResult, this.props.size / 12)
      : oldPoint
    return result
  }
  isPlayerAtOrigin(player) {
    return player.x === 0 && player.y === 0
  }

  /*
 * Render
 */

  render() {
    const size = this.props.size
    const i = this.props.i
    const j = this.props.j
    const player = this.props.player
    const playerX = player.x
    const playerY = player.y
    const quadrantLength = size / 2
    const blocks = this.props.blocks || []
    const door = this.props.door || {}
    const levelKey = this.props.levelKey || {}
    return (
      <svg
        className="board"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={this.handleDown}
        onMouseMove={this.handleMove}
        onMouseUp={this.handleUp}
      >
        <g transform={`translate(${quadrantLength} ${quadrantLength})`}>
          {/* Base grid for reference */}
          <Grid
            i={scaleVector({x: 1, y: 0}, Math.round(size / 12))}
            j={scaleVector({x: 0, y: 1}, Math.round(size / 12))}
            color="ddd"
            bound={3}
          />

          {/* Grid that player can bend */}
          <Grid i={i} j={j} color="black" bound={3} />

          {/* i and j vectors */}
          <Arrow
            name="i"
            x={i.x}
            y={i.y}
            color={this.isPlayerAtOrigin(player) ? '0f0' : '0a0'}
          />
          <Arrow
            name="j"
            x={j.x}
            y={j.y}
            color={this.isPlayerAtOrigin(player) ? 'f00' : 'a00'}
          />

          {/* Designate Origin */}
          <circle cx="0" cy="0" r="3" fill="blue" />

          <Door x={door.x} y={door.y} />
          {!this.props.hasKey && <Key x={levelKey.x} y={levelKey.y} />}
          {blocks.map(block => {
            return (
              <Block
                key={[block.x, block.y].toString()}
                x={block.x}
                y={block.y}
                size={Math.round(size / 20)}
              />
            )
          })}
          <Player x={playerX} y={playerY} />
        </g>
      </svg>
    )
  }
}

function scaleVector(vector, scalar) {
  const newVector = {}
  Object.keys(vector).forEach(dimension => {
    newVector[dimension] = vector[dimension] * scalar
  })
  return newVector
}

const mapState = state => {
  const size = state.size
  return {
    i: scaleVector(state.i, Math.round(size / 12)),
    j: scaleVector(state.j, Math.round(size / 12)),
    player: scaleVector(state.player, Math.round(size / 12)),
    // playerX: state.player.x,
    // playerY: state.player.y,
    blocks: state.level.blocks.map(block =>
      scaleVector(block, Math.round(size / 12))
    ),
    levelKey: scaleVector(state.level.key, Math.round(size / 12)),
    door: scaleVector(state.level.door, Math.round(size / 12)),
    hasKey: state.level.hasKey,
    hasWon: state.level.hasWon,
    size
  }
}

const mapDispatch = dispatch => {
  return {
    setVector: (name, oldVector) =>
      dispatch((_, getState) => {
        const vector = scaleVector(oldVector, 12 / getState().size)
        if (name === 'i') {
          dispatch(setI(vector.x, vector.y))
        } else if (name === 'j') {
          dispatch(setJ(vector.x, vector.y))
        }
      })
  }
}

export default connect(mapState, mapDispatch)(Board)

/*
 * Prop Settings
 */

Board.defaultProps = {
  i: {x: 1, y: 0},
  j: {x: 0, y: 1},
  playerX: 0,
  playerY: 0,
  size: 600
}

// Board.propTypes = {
//   i: PropTypes.object,
//   j: PropTypes.object
// }
