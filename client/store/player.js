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

export const moveI = (i, j) => {
  return {
    type: MOVE_PLAYER_I,
    i,
    j
  }
}

export const moveIBackwards = (i, j) => {
  return {
    type: MOVE_PLAYER_I_BACKWARDS,
    i,
    j
  }
}

export const moveJ = (i, j) => {
  return {
    type: MOVE_PLAYER_J,
    i,
    j
  }
}

export const moveJBackwards = (i, j) => {
  return {
    type: MOVE_PLAYER_J_BACKWARDS,
    i,
    j
  }
}

export const setPlayerPosition = (x, y) => {
  return {
    type: SET_PLAYER_POSITION,
    x,
    y
  }
}

/*
 * Initial State
 */

const initialState = {x: 0, y: 0}

/*
 * Reducer
 */

const player = (state = initialState, action) => {
  const {i, j} = action
  switch (action.type) {
    case MOVE_PLAYER_I:
      return {...state, x: state.x + i.x, y: state.y + i.y}
    case MOVE_PLAYER_I_BACKWARDS:
      return {...state, x: state.x - i.x, y: state.y - i.y}
    case MOVE_PLAYER_J:
      return {...state, x: state.x + j.x, y: state.y + j.y}
    case MOVE_PLAYER_J_BACKWARDS:
      return {...state, x: state.x - j.x, y: state.y - j.y}
    case SET_PLAYER_POSITION:
      return {...state, x: action.x, y: action.y}
    default:
      return state
  }
}

export default player
