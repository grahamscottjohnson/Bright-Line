import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import i from './i'
import j from './j'
import player from './player'
import level, {setLevel} from './level'
import size from './size'
import unlocked from './unlocked'
import bound from './bound'

const reducer = combineReducers({i, j, player, level, size, unlocked, bound})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const makeStore = gameLevel => {
  const store = createStore(reducer, middleware)
  store.dispatch(setLevel(gameLevel))
  return store
}

export default makeStore
export * from './user'
