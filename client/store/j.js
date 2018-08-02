/*
 * Action Types
 */

export const SET_J = 'SET_J'

/*
 * Action Creators
 */

export const setJ = (x, y) => {
  return {
    type: SET_J,
    x,
    y
  }
}

/*
 * Initial State
 */

const initialState = {x: 0, y: 50}

/*
 * Reducer
 */

const j = (state = initialState, action) => {
  switch (action.type) {
    case SET_J:
      return {x: action.x, y: action.y}
    default:
      return state
  }
}

export default j
