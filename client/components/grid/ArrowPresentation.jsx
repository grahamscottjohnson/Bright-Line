import React from 'react';

const Arrow = ({x, y, color = 'orange', name = 'i', size}) => {
  return (
    <React.Fragment>
      <polyline
        points={[
          [0, 0],
          [x, -y] //more points for tip but later
        ]}
        style={{fill: color, stroke: color, strokeWidth: 5}}
      />
      <circle
        className={`${name}-point`}
        cx={x}
        cy={-y}
        r={size / 60}
        style={{fill: color}}
      />
    </React.Fragment>
  );
};

export default Arrow;
