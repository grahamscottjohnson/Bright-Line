/*
 * Action Types
 */

export const SET_I = 'SET_I'

/*
 * Action Creators
 */

export const setI = (x, y) => {
  return {
    type: SET_I,
    x,
    y
  }
}

/*
 * Initial State
 */

const initialState = {x: 50, y: 0}

/*
 * Reducer
 */

const i = (state = initialState, action) => {
  switch (action.type) {
    case SET_I:
      return {x: action.x, y: action.y}
    default:
      return state
  }
}

export default i
