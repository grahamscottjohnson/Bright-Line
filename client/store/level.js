import axios from 'axios';

/*
 * Action Types
 */

const SET_LEVEL = 'SET_LEVEL';
const UPDATE_LEVEL = 'UPDATE_LEVEL';

/*
 * Action Creators
 */

export const setLevel = level => {
  return {
    type: SET_LEVEL,
    level
  };
};

export const updateLevel = (player, i, j) => {
  return {
    type: UPDATE_LEVEL,
    player,
    i,
    j
  };
};

/*
 * Thunk Creators
 */

export const retrieveLevel = stage => {
  return async dispatch => {
    const response = await axios(`/levels/${stage}.json`);
    dispatch(setLevel(response.data));
  };
};

export const dispatchWithUpdateLevel = (action, i, j) => {
  return (dispatch, getState) => {
    dispatch(action);
    const player = getState().player; // getting the overall state here after we have combined reducers
    dispatch(updateLevel(player, i, j));
  };
};

/*
 * Initial State
 */

const initialState = {};

/*
 * Reducer
 */

const level = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return action.level;
    case UPDATE_LEVEL:
      if (state.winsWithSwitch) {
        const switchLocation = matrixMultiply(state.switch, action.i, action.j);
        const switchUnlocked = samePlace(switchLocation, state.socket);
        if (switchUnlocked && samePlace(state.door, action.player)) {
          return {...state, switchUnlocked, hasWon: true};
        } else {
          return {...state, switchUnlocked};
        }
      } else if (!state.hasKey && samePlace(state.key, action.player)) {
        return {...state, hasKey: true};
      } else if (state.hasKey && samePlace(state.door, action.player)) {
        return {...state, hasWon: true};
      } else {
        return state;
      }
    default:
      return state;
  }
};

function samePlace(v1, v2) {
  return v1.x === v2.x && v1.y === v2.y;
}

function scaleVector(vector, scalar) {
  if (!vector) return {};
  const newVector = {};
  Object.keys(vector).forEach(dimension => {
    newVector[dimension] = vector[dimension] * scalar;
  });
  return newVector;
}

function matrixMultiply(point, i, j) {
  if (!point) return {};
  const newI = scaleVector(i, point.i);
  const newJ = scaleVector(j, point.j);
  return {
    x: newI.x + newJ.x,
    y: newI.y + newJ.y
  };
}

export default level;
