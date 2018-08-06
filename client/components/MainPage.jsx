import React, {Component} from 'react';
import axios from 'axios';
import {dispatchWithUpdateLevel} from '../store/level';
import makeStore from '../store';
import {moveIBackwards, moveI, moveJ, moveJBackwards} from '../store/player';
import GamePage from './GamePage';
import TitlePage from './TitlePage';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inGame: false,
      level: 0,
      game: {},
      //unsubscriber
      levels: [],
      unlocked: +localStorage.getItem('unlocked') || 0
    };
    this.handleClickToGame = this.handleClickToGame.bind(this);
    this.handleClickToMenu = this.handleClickToMenu.bind(this);
  }

  async componentDidMount() {
    //load all the levels from the server
    const numLevels = 9;
    const state = this.state;
    const levelNums = [];
    for (let i = 0; i <= numLevels; i += 1) {
      levelNums.push(i);
    }
    const responses = await Promise.all(
      levelNums.map(num => axios(`/levels/${num}.json`))
    );
    const levels = responses.map(response => response.data);
    this.setState({...state, levels});
  }

  handleClickToGame(num) {
    const state = this.state;
    const game = makeStore(state.levels[num], 576);
    const unsubscriber = game.subscribe(() => {
      if (game.getState().level.hasWon) {
        unsubscriber();
        let newUnlocked = state.unlocked;
        console.log(num, state.unlocked);
        if (num === state.unlocked && state.unlocked < 9) {
          console.log(`passed if statement`);
          newUnlocked += 1;
          localStorage.setItem('unlocked', newUnlocked);
        }
        this.setState({
          ...state,
          inGame: false,
          unlocked: newUnlocked,
          game: {}
        });
      }
    });
    this.setState({
      ...state,
      inGame: true,
      game,
      unsubscriber,
      level: num
    });
  }
  handleClickToMenu() {
    this.setState({...this.state, inGame: false, game: {}});
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
    return (
      <div>
        {this.state.inGame ? (
          <GamePage
            game={this.state.game}
            backToMenu={this.handleClickToMenu}
            movePlayer={this.movePlayer}
            level={this.state.levels[this.state.level]}
          />
        ) : (
          <TitlePage
            numLevels={9}
            unlocked={this.state.unlocked}
            goToLevel={this.handleClickToGame}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
