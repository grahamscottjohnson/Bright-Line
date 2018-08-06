import React from 'react';
import {connect} from 'react-redux';

//webGL
//3.js - library

const Key = ({x, y, keySize}) => {
  return (
    // <rect
    //   x={x - keySize / 2}
    //   y={-y - keySize / 4}
    //   width={keySize}
    //   height={keySize / 2}
    //   fill="pink"
    // />
    <g>
      <circle
        cx={x - keySize / 3}
        cy={-y}
        r={keySize / 6}
        fill="none"
        stroke="pink"
        strokeWidth="4"
      />
      <polyline
        points={[
          [x - keySize / 6, -y],
          [x + keySize / 3, -y],
          [x + keySize / 3, -y + keySize / 6],
          [x + keySize / 3, -y],
          [x + keySize / 2, -y],
          [x + keySize / 2, -y + keySize / 6]
        ]}
        fill="none"
        stroke="pink"
        strokeWidth="4"
      />
    </g>
  );
};

const mapState = state => {
  const unitLength = state.size / (2 * state.bound * state.bound);
  return {
    keySize: unitLength
  };
};

export default connect(mapState)(Key);
