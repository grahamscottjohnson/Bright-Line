/*
 * Action Types
 */

const SET_BOUND = 'SET_BOUND'

/*
 * Action Creators
 */

export const setBound = bound => {
  return {
    type: SET_BOUND,
    bound
  }
}

/*
 * Initial State
 */

const initialState = 3

/*
 * Reducer
 */

const bound = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOUND:
      return action.bound
    default:
      return state
  }
}

export default bound
