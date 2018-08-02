import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {moveXBackwards, moveX, moveY, moveYBackwards} from './store/player'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

document.addEventListener('keydown', event => {
  const {i, j} = store.getState()
  switch (event.which) {
    case 87:
      store.dispatch(moveY(i, j))
      break
    case 68:
      store.dispatch(moveX(i, j))
      break
    case 83:
      store.dispatch(moveYBackwards(i, j))
      break
    case 65:
      store.dispatch(moveXBackwards(i, j))
      break
    default:
      break
  }
}) //prolly not here, hopefully on some canvas/svg object
