/*
 * Action Types
 */

export const MOVE_PLAYER_I = 'MOVE_PLAYER_I'
export const MOVE_PLAYER_I_BACKWARDS = 'MOVE_PLAYER_I_BACKWARDS'
export const MOVE_PLAYER_J = 'MOVE_PLAYER_J'
export const MOVE_PLAYER_J_BACKWARDS = 'MOVE_PLAYER_J_BACKWARDS'
export const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION'

/*
 * Action Creators
 */

export const moveI = (i, j, blocks, bound) => {
  return {
    type: MOVE_PLAYER_I,
    i,
    j,
    blocks,
    bound
  }
}

export const moveIBackwards = (i, j, blocks, bound) => {
  return {
    type: MOVE_PLAYER_I_BACKWARDS,
    i,
    j,
    blocks,
    bound
  }
}

export const moveJ = (i, j, blocks, bound) => {
  return {
    type: MOVE_PLAYER_J,
    i,
    j,
    blocks,
    bound
  }
}

export const moveJBackwards = (i, j, blocks, bound) => {
  return {
    type: MOVE_PLAYER_J_BACKWARDS,
    i,
    j,
    blocks,
    bound
  }
}

// export const setPlayerPosition = (x, y, blocks, bound) => {
//   return {
//     type: SET_PLAYER_POSITION,
//     x,
//     y,
//     blocks,
//     bound
//   }
// }

/*
 * Initial State
 */

const initialState = {x: 0, y: 0, i: 0, j: 0}

/*
 * Reducer
 */

const player = (state = initialState, action) => {
  const {i, j, blocks, bound} = action
  let newSpot = {}
  switch (action.type) {
    case MOVE_PLAYER_I:
      newSpot = {...state, x: state.x + i.x, y: state.y + i.y, i: state.i + 1}
      break
    case MOVE_PLAYER_I_BACKWARDS:
      newSpot = {...state, x: state.x - i.x, y: state.y - i.y, i: state.i - 1}
      break
    case MOVE_PLAYER_J:
      newSpot = {...state, x: state.x + j.x, y: state.y + j.y, j: state.j + 1}
      break
    case MOVE_PLAYER_J_BACKWARDS:
      newSpot = {...state, x: state.x - j.x, y: state.y - j.y, j: state.j - 1}
      break
    // case SET_PLAYER_POSITION:
    //   newSpot = {...state, x: action.x, y: action.y}
    //   break
    default:
      return state
  }
  return !isBlocked(state, newSpot, blocks) && isInBounds(newSpot, bound)
    ? newSpot
    : state
}

function isBlocked(oldSpot, newSpot, array) {
  return array.some(elem => {
    return elem.x === newSpot.x && elem.y === newSpot.y
  })
}

function isInBounds(spot, bound) {
  return Math.abs(spot.i) <= bound && Math.abs(spot.j) <= bound
}

export default player
