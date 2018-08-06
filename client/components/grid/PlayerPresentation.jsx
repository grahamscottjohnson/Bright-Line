import React from 'react';

const PlayerPresentation = ({x = 0, y = 0, size}) => {
  return (
    // <svg viewBox="0 0 size size`> transform={`translate(${x})`} // overlap this viewbox with the big outside svg viewbox
    <svg height={size} width={size}>
      <g transform={`translate(${size / 2} ${size / 2})`}>
        <circle
          cx={0}
          cy={0}
          r={size / 2 - 1}
          fill="none"
          stroke="yellow"
          className="ring1"
        />
        <circle
          cx={0}
          cy={0}
          r={size / 2 - 1}
          fill="none"
          stroke="yellow"
          className="ring2"
        />
        <circle
          cx={0}
          cy={0}
          r={size / 2 - 1}
          fill="none"
          stroke="yellow"
          className="ring3"
        />
        <circle cx={0} cy={0} r={3 / 8 * size} fill="yellow" />
      </g>
    </svg>
  );
};

export default PlayerPresentation;
