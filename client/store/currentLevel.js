/*
 * Action Types
 */

const SET_CURRENT_LEVEL = 'SET_CURRENT_LEVEL'

/*
 * Action Creators
 */

export const setCurrentLevel = () => {
  return {
    type: SET_CURRENT_LEVEL
  }
}

/*
 * Initial State
 */

const initialState = 0

/*
 * Reducer
 */

const currentLevel = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_LEVEL:
      return state + 1
    default:
      return state
  }
}

export default currentLevel
