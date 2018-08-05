import React from 'react';
import {connect} from 'react-redux';

const Door = ({x, y, doorSize}) => {
  return (
    <rect
      x={x - doorSize / 2}
      y={-y - doorSize / 2}
      width={doorSize}
      height={doorSize}
      fill="brown"
    />
  );
};

const mapState = state => {
  const unitLength = state.size / (2 * state.bound * state.bound);
  return {
    doorSize: unitLength
  };
};

export default connect(mapState)(Door);
