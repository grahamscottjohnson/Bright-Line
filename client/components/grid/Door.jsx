import React from 'react';
import {connect} from 'react-redux';

const Door = ({x, y, doorSize, hasKey}) => {
  return (
    <g>
      <rect
        x={x - doorSize / 2}
        y={-y - doorSize / 2}
        width={doorSize}
        height={doorSize}
        fill="brown"
      />
      {!hasKey && (
        <g>
          <rect
            x={x - doorSize / 6}
            y={-y}
            width={doorSize / 3}
            height={doorSize / 3}
            fill="black"
          />
          <circle
            cx={x}
            cy={-y}
            r={doorSize / 6 - 1}
            fill="none"
            stroke="black"
          />
          <circle
            cx={x}
            cy={-y + doorSize / 6}
            r={doorSize / 18}
            fill="brown"
          />
        </g>
      )}
    </g>
  );
};

const mapState = state => {
  const unitLength = state.size / (2 * state.bound * state.bound);
  return {
    doorSize: unitLength
  };
};

export default connect(mapState)(Door);
