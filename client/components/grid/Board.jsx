import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Arrow from './Arrow';
import {Player} from '..';
import {connect} from 'react-redux';
import Block from './Block';
import {setI} from '../../store/i';
import {setJ} from '../../store/j';
import Door from './Door';
import Key from './Key';
import Switch from './Switch';
import Socket from './Socket';
import {dispatchWithUpdateLevel} from '../../store/level';

/*
 * Component
 */

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      vector: ''
    };
    this.handleMove = this.handleMove.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
  }

  /*
 * Arrow Drag functions
 */

  handleDown(event) {
    //convert event vals into coord
    const player = this.props.player;
    const name = event.target.className.baseVal;
    if (name === 'i-point' && this.isPlayerAtOrigin(this.props.player)) {
      this.setState({isDragging: true, oldPoint: this.props.i, vector: 'i'});
    } else if (name === 'j-point' && this.isPlayerAtOrigin(player)) {
      this.setState({isDragging: true, oldPoint: this.props.j, vector: 'j'});
    }
  }
  handleMove(event) {
    if (this.state.isDragging) {
      const clickVector = this.getVector(event, event.currentTarget);
      //&& event.target.className.baseVal === 'board' is no longer needed because of capture
      this.props.setVector(this.state.vector, clickVector);
    }
  }
  handleUp(event) {
    if (this.state.vector) {
      const clickVector = this.getVector(event, event.currentTarget);
      const newPoint = this.validatePoint(clickVector, this.state.oldPoint);
      this.props.setVector(this.state.vector, newPoint);
    }
    this.setState({
      isDragging: false,
      vector: ''
    });
  }

  /*
 * Helper Functions
 */

  getVector(event, currentTarget) {
    const rect = currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - this.props.size / 2; //x position on the React coordinate Grid
    const y = this.props.size / 2 - (event.clientY - rect.top); //y position on the React coordinate Grid
    return {x, y};
  }
  distance(v1, v2) {
    const side = Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2);
    return Math.pow(side, 0.5);
  }

  isClose(v, clickVector) {
    const unitLength =
      this.props.size / (2 * this.props.bound * this.props.bound);
    return this.distance(v, clickVector) < 0.4 * unitLength;
  }

  getClosest(point) {
    //ex: {x:.8, y:.2} => {x:1, y:0}
    const unitLength =
      this.props.size / (2 * this.props.bound * this.props.bound); // convert to Redux Grid for rounding niceness
    const resultPoint = {};
    Object.keys(point).forEach(dimension => {
      resultPoint[dimension] =
        Math.round(point[dimension] / unitLength) * unitLength;
    });
    return resultPoint;
  }

  validatePoint(newPoint, oldPoint) {
    const maybeResult = this.getClosest(newPoint);
    const result = this.isClose(maybeResult, newPoint) ? maybeResult : oldPoint;
    return result;
  }
  isPlayerAtOrigin(player) {
    return player.x === 0 && player.y === 0;
  }

  /*
 * Render
 */

  render() {
    const {
      size,
      i,
      j,
      baseI,
      baseJ,
      player,
      blocks,
      door,
      levelKey,
      hasKey,
      winsWithSwitch,
      levelSwitch,
      socket,
      switchUnlocked
    } = this.props;
    return (
      <svg
        className="center"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={this.handleDown}
        // onMouseDown={this.debug}
        onMouseMove={this.handleMove}
        onMouseUp={this.handleUp}
        // onClick={this.debug}
        style={{backgroundColor: 'black'}}
      >
        <g transform={`translate(${size / 2} ${size / 2})`}>
          {/* Base grid for reference */}
          <Grid i={baseI} j={baseJ} color="333" bound={3} />

          {/* Grid that player can bend */}
          <Grid i={i} j={j} color="white" bound={3} />

          {blocks.map(block => {
            return (
              <Block
                key={[block.x, block.y].toString()}
                x={block.x}
                y={block.y}
                size={Math.round(size / 20)}
              />
            );
          })}

          {/* Designate Origin */}
          <circle cx="0" cy="0" r="4" fill="blue" />

          <Door x={door.x} y={door.y} hasKey={hasKey || switchUnlocked} />

          {/* Decide wether to load key or switch depending on level */}
          {!winsWithSwitch && !hasKey && <Key x={levelKey.x} y={levelKey.y} />}
          {winsWithSwitch && <Switch x={levelSwitch.x} y={levelSwitch.y} />}
          {winsWithSwitch && <Socket x={socket.x} y={socket.y} />}

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

          <Player x={player.x} y={player.y} />
        </g>
      </svg>
    );
  }
}

/*
 * Container
 */

const mapState = state => {
  const {size, bound} = state;
  const switchAsXY = matrixMultiply(state.level.switch, state.i, state.j);
  const scaleVectorToThisGridSize = vector =>
    scaleVectorToGridSize(vector, size, bound);
  return {
    i: scaleVectorToThisGridSize(state.i),
    j: scaleVectorToThisGridSize(state.j),
    baseI: scaleVectorToThisGridSize({x: 1, y: 0}),
    baseJ: scaleVectorToThisGridSize({x: 0, y: 1}),
    player: scaleVectorToThisGridSize(state.player),
    // playerX: state.player.x,
    // playerY: state.player.y,
    blocks: state.level.blocks.map(block => scaleVectorToThisGridSize(block)),
    levelKey: scaleVectorToThisGridSize(state.level.key),
    door: scaleVectorToThisGridSize(state.level.door),
    hasKey: state.level.hasKey,
    hasWon: state.level.hasWon,
    size,
    bound: state.bound,
    winsWithSwitch: !!state.level.winsWithSwitch,
    levelSwitch: scaleVectorToThisGridSize(switchAsXY),
    socket: scaleVectorToThisGridSize(state.level.socket),
    switchUnlocked: state.level.switchUnlocked
  };
};

const mapDispatch = dispatch => {
  return {
    setVector: (name, oldVector) =>
      dispatch((_, getState) => {
        const vector = scaleVectorFromGridSize(
          oldVector,
          getState().size,
          getState().bound
        );
        if (name === 'i') {
          dispatch(
            dispatchWithUpdateLevel(
              setI(vector.x, vector.y),
              {x: vector.x, y: vector.y},
              getState().j
            )
          );
        } else if (name === 'j') {
          dispatch(
            dispatchWithUpdateLevel(setJ(vector.x, vector.y), getState().i, {
              x: vector.x,
              y: vector.y
            })
          );
        }
      })
  };
};

export default connect(mapState, mapDispatch)(Board);

/*
 * HelperFunctions
 */

function scaleVectorToGridSize(vector, size, bound) {
  const scaleFactor = size / (2 * bound * bound); //see size reducer
  return scaleVector(vector, scaleFactor);
}
function scaleVectorFromGridSize(vector, size, bound) {
  const scaleFactor = 2 * bound * bound / size; //see size reducer
  const result = scaleVector(vector, scaleFactor);
  return result;
}

function scaleVector(vector, scalar) {
  if (!vector) return {};
  const newVector = {};
  Object.keys(vector).forEach(dimension => {
    newVector[dimension] = vector[dimension] * scalar;
  });
  return newVector;
}

function matrixMultiply(point, i, j) {
  if (!point) return {};
  const newI = scaleVector(i, point.i);
  const newJ = scaleVector(j, point.j);
  return {
    x: newI.x + newJ.x,
    y: newI.y + newJ.y
  };
}

/*
 * Prop Settings
 */

// Board.defaultProps = {
//   i: {x: 1, y: 0},
//   j: {x: 0, y: 1},
//   playerX: 0,
//   playerY: 0,
//   size: 600
// };

// Board.propTypes = {
//   i: PropTypes.object,
//   j: PropTypes.object
// }
