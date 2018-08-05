/*
 * Action Types
 */

const SET_SIZE = 'SET_SIZE'

/*
 * Action Creators
 */

export const setSize = size => {
  return {
    type: SET_SIZE,
    size
  }
}

/*
 * Initial State
 */

const initialState = 240

/*
 * Reducer
 */

const size = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIZE:
      return action.size
    default:
      return state
  }
}

export default size