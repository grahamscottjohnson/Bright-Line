import React from 'react';
import {connect} from 'react-redux';

const Key = ({x, y, keySize}) => {
  return (
    <rect
      x={x - keySize / 2}
      y={-y - keySize / 4}
      width={keySize}
      height={keySize / 2}
      fill="pink"
    />
  );
};

const mapState = state => {
  const unitLength = state.size / (2 * state.bound * state.bound);
  return {
    keySize: unitLength
  };
};

export default connect(mapState)(Key);
