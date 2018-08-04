import axios from 'axios'

/*
 * Action Types
 */

const SET_LEVEL = 'SET_LEVEL'
const UPDATE_LEVEL = 'UPDATE_LEVEL'

/*
 * Action Creators
 */

export const setLevel = level => {
  return {
    type: SET_LEVEL,
    level
  }
}

export const updateLevel = player => {
  return {
    type: UPDATE_LEVEL,
    player
  }
}

/*
 * Thunk Creators
 */

export const retrieveLevel = stage => {
  return async dispatch => {
    const response = await axios(`/levels/${stage}.json`)
    dispatch(setLevel(response.data))
  }
}

export const handlePlayer = action => {
  return (dispatch, getState) => {
    dispatch(action)
    const player = getState().player // getting the overall state here after we have combined reducers
    //instead: = getState().player
    dispatch(updateLevel(player))
  }
}

/*
 * Initial State
 */

const initialState = {}

/*
 * Reducer
 */

const level = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return action.level
    case UPDATE_LEVEL:
      if (!state.hasKey && samePlace(state.key, action.player)) {
        return {...state, hasKey: true}
      } else if (state.hasKey && samePlace(state.door, action.player)) {
        return {...state, hasWon: true}
      } else {
        return state
      }
    default:
      return state
  }
}

function samePlace(v1, v2) {
  return v1.x === v2.x && v1.y === v2.y
}

export default level
