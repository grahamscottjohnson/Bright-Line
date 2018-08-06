import React, {Component, Fragment} from 'react';
import {Provider, connect} from 'react-redux';
import {setLevel, dispatchWithUpdateLevel} from '../store/level';

export default class GamePage extends Component {
  componentDidMount() {
    this.focusDiv();
  }
  focusDiv() {
    ReactDOM.findDOMNode(this.refs.theDiv).focus();
  }

  render() {
    return (
      <Fragment>
        <Provider store={this.props.game}>
          <div
            tabIndex="0"
            onKeyDown={event => {
              this.movePlayer(event, this.props.game);
            }}
            autoFocus
          >
            <Board level={this.state.levels[this.state.level]} />
          </div>
        </Provider>
        <button className="backToMenu" onClick={() => this.handleClickToMenu()}>
          Back to Menu
        </button>
      </Fragment>
    );
  }
}
