import React from 'react';
import {connect} from 'react-redux';

const Block = ({x, y, blockSize}) => {
  return (
    <rect
      x={x - blockSize / 2}
      y={-y - blockSize / 2}
      width={blockSize}
      height={blockSize}
      fill="black"
    />
  );
};
const mapState = state => {
  const unitLength = state.size / (2 * state.bound * state.bound);
  return {
    blockSize: 2 * unitLength - 2
  };
};

export default connect(mapState)(Block);
