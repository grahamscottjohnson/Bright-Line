import React from 'react';
import {connect} from 'react-redux';

const Switch = ({x, y, size}) => {
  return (
    <circle
      cx={x}
      cy={-y}
      r={size / 60}
      fill="none"
      stroke="pink"
      strokeWidth="3"
    />
  );
};

const mapState = state => {
  return {
    size: state.size
  };
};

export default connect(mapState)(Switch);
