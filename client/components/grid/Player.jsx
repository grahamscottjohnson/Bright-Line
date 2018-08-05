import React from 'react';
import {connect} from 'react-redux';

const Player = ({x, y, playerSize}) => {
  return (
    <circle className="player" cx={x} cy={-y} r={playerSize} fill="yellow" />
  );
};

const mapState = state => {
  const unitLength = state.size / (2 * state.bound * state.bound);
  return {
    playerSize: unitLength / 3
  };
};

export default connect(mapState)(Player);
