import React from 'react';

const ArrowPresentation = ({
  x,
  y,
  color = 'orange',
  name = 'i',
  size,
  handleDown,
  handleUp
}) => {
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
        r={size / 96}
        style={{fill: color}}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
      />
    </React.Fragment>
  );
};

export default ArrowPresentation;
