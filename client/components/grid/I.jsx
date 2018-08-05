import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArrowPresentation from './ArrowPresentation';

class I extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {x, y, color} = this.props;
    return <ArrowPresentation x={x} y={y} name="i" color={color} />;
  }
}

const mapState = state => {
  return {
    size: state.size
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(I);
