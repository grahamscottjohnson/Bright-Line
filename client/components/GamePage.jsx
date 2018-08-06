import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import Board from './grid/Board';

export default class GamePage extends Component {
  componentDidMount() {
    document.getElementById('board-container').focus();
  }

  render() {
    const {game, movePlayer, backToMenu, level} = this.props;
    return (
      <Fragment>
        <h3 className="center">
          Level {level.stage + 1}
          {level.stage === 0 && ': Use W, A, S, D to move'}
          {level.stage === 3 && ': Drag the arrows'}
          {level.stage === 6 && ': Fill the Hole'}
        </h3>
        <Provider store={game}>
          <div
            tabIndex="0"
            onKeyDown={event => {
              movePlayer(event, game);
            }}
            id="board-container"
          >
            <Board level={level} />
          </div>
        </Provider>
        <button className="levelButton center" onClick={backToMenu}>
          Back to Menu
        </button>
      </Fragment>
    );
  }
}

GamePage.propTypes = {
  game: PropTypes.object.isRequired,
  movePlayer: PropTypes.func.isRequired,
  backToMenu: PropTypes.func.isRequired,
  level: PropTypes.object
};
