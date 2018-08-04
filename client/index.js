import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {moveIBackwards, moveI, moveJ, moveJBackwards} from './store/player'

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
      store.dispatch(moveJ(i, j))
      break
    case 68:
      store.dispatch(moveI(i, j))
      break
    case 83:
      store.dispatch(moveJBackwards(i, j))
      break
    case 65:
      store.dispatch(moveIBackwards(i, j))
      break
    default:
      break
  }
}) //prolly not here, hopefully on some canvas/svg object
