import axios from 'axios'

/*
 * Action Types
 */

const SET_LEVEL = 'SET_LEVEL'

/*
 * Action Creators
 */

export const setLevel = level => {
  return {
    type: SET_LEVEL,
    level
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

/*
 * Initial State
 */

const initialState = {}

/*
 * Reducer
 */

const player = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return action.level
    default:
      return state
  }
}

export default player
