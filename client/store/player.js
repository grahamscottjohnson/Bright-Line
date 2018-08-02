/*
 * Action Types
 */

export const MOVE_PLAYER_X = 'MOVE_PLAYER_X'
export const MOVE_PLAYER_X_BACKWARDS = 'MOVE_PLAYER_X_BACKWARDS'
export const MOVE_PLAYER_Y = 'MOVE_PLAYER_Y'
export const MOVE_PLAYER_Y_BACKWARDS = 'MOVE_PLAYER_Y_BACKWARDS'
export const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION'

/*
 * Action Creators
 */

export const moveX = (i, j) => {
  return {
    type: MOVE_PLAYER_X,
    i,
    j
  }
}

export const moveXBackwards = (i, j) => {
  return {
    type: MOVE_PLAYER_X_BACKWARDS,
    i,
    j
  }
}

export const moveY = (i, j) => {
  return {
    type: MOVE_PLAYER_Y,
    i,
    j
  }
}

export const moveYBackwards = (i, j) => {
  return {
    type: MOVE_PLAYER_Y_BACKWARDS,
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
    case MOVE_PLAYER_X:
      return {...state, x: state.x + i.x + j.x}
    case MOVE_PLAYER_X_BACKWARDS:
      return {...state, x: state.x - i.x - j.x}
    case MOVE_PLAYER_Y:
      return {...state, y: state.y + i.y + j.y}
    case MOVE_PLAYER_Y_BACKWARDS:
      return {...state, y: state.y - i.y - j.y}
    case SET_PLAYER_POSITION:
      return {...state, x: action.x, y: action.y}
    default:
      return state
  }
}

export default player
