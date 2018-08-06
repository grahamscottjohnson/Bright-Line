import React, {Component, Fragment} from 'react';
import Board from './grid/Board';
import axios from 'axios';
import {setLevel, dispatchWithUpdateLevel} from '../store/level';
import {Provider, connect} from 'react-redux';
import makeStore from '../store';
import {moveIBackwards, moveI, moveJ, moveJBackwards} from '../store/player';
import PlayerPresentation from './grid/PlayerPresentation';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inGame: false,
      level: 0,
      game: {},
      //unsubscriber
      levels: [],
      isFetching: true
    };
  }

  async componentDidMount() {
    const numLevels = 8;
    const levelNums = [];
    for (let i = 0; i <= numLevels; i += 1) {
      levelNums.push(i);
    }
    const responses = await Promise.all(
      levelNums.map(num => axios(`/levels/${num}.json`))
    );
    const levels = responses.map(response => response.data);
    const state = this.state;
    this.setState({...state, levels, isFetching: false});
  }

  handleClickToGame(num) {
    const state = this.state;
    const game = makeStore(state.levels[num]);
    const unsubscriber = game.subscribe(() => {
      if (game.getState().level.hasWon) {
        unsubscriber();
        this.setState({
          inGame: false,
          levels: state.levels,
          level: 0,
          isFetching: false
        });
      }
    });
    this.setState({
      inGame: true,
      game,
      unsubscriber,
      level: num
    });
  }
  handleClickToMenu() {
    this.setState({...this.state, inGame: false, game: {}, level: 0});
  }
  movePlayer(event, store) {
    const {i, j, level, bound} = store.getState();
    switch (event.which) {
      case 87:
        store.dispatch(
          dispatchWithUpdateLevel(moveJ(i, j, level.blocks, bound), i, j)
        );
        break;
      case 68:
        store.dispatch(
          dispatchWithUpdateLevel(moveI(i, j, level.blocks, bound), i, j)
        );
        break;
      case 83:
        store.dispatch(
          dispatchWithUpdateLevel(
            moveJBackwards(i, j, level.blocks, bound),
            i,
            j
          )
        );
        break;
      case 65:
        store.dispatch(
          dispatchWithUpdateLevel(
            moveIBackwards(i, j, level.blocks, bound),
            i,
            j
          )
        );
        break;
      default:
        break;
    }
  }

  render() {
    const numLevels = 8;
    const levelNums = [];
    for (let i = 0; i <= numLevels; i += 1) {
      levelNums.push(i);
    }
    const titlePage = (
      <div>
        <h1 className="center">Bright Line</h1>
        <div className="center">
          <PlayerPresentation />
        </div>
        <p className="center">Levels</p>
        <div className="levelButton-container">
          {levelNums.map(num => {
            return (
              <button
                className="levelButton"
                onClick={() => this.handleClickToGame(num)}
                key={num}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    );
    const gamePage = (
      <Fragment>
        <Provider store={this.state.game}>
          <div
            tabIndex="0"
            onKeyDown={event => {
              this.movePlayer(event, this.state.game);
            }}
          >
            <Board level={this.state.levels[this.state.level]} />
          </div>
        </Provider>
        <button className="center" onClick={() => this.handleClickToMenu()}>
          Back to Menu
        </button>
      </Fragment>
    );
    return <div>{this.state.inGame ? gamePage : titlePage}</div>;
  }
}

export default MainPage;
