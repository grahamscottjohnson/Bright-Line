/*
 * Action Types
 */

const ADD_LEVEL = 'ADD_LEVEL'

/*
 * Action Creators
 */

export const addLevel = () => {
  return {
    type: ADD_LEVEL
  }
}

/*
 * Initial State
 */

const initialState = 0

/*
 * Reducer
 */

const unlocked = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LEVEL:
      return state + 1
    default:
      return state
  }
}

export default unlocked
