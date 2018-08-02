/*
 * Action Types
 */

const SET_BLOCKS = 'SET_BLOCKS'

/*
 * Action Creators
 */

const setBlocks = blocks => {
  return {
    type: SET_BLOCKS,
    blocks
  }
}

/*
 * Initial State
 */

const initialState = []
//blocks are {x: __, y: __}

/*
 * Reducer
 */

const blocks = (state = initialState, action) => {
  switch (action.type) {
    case SET_BLOCKS:
      return action.blocks
    default:
      return state
  }
}

export default blocks
