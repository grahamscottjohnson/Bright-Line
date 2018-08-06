import React from 'react';

const PlayerPresentation = ({size}) => {
  return (
    // <svg viewBox="0 0 100 100">
    <svg height="100" width="100">
      <g transform="translate(50 50)">
        <circle
          cx={0}
          cy={0}
          r={49}
          fill="none"
          stroke="yellow"
          className="ring1"
        />
        <circle
          cx={0}
          cy={0}
          r={49}
          fill="none"
          stroke="yellow"
          className="ring2"
        />
        <circle
          cx={0}
          cy={0}
          r={49}
          fill="none"
          stroke="yellow"
          className="ring3"
        />
        <circle cx={0} cy={0} r={35} fill="yellow" />
      </g>
    </svg>
  );
};

export default PlayerPresentation;
