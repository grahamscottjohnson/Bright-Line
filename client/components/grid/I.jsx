import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArrowPresentation from './ArrowPresentation';

class I extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleDown = this.handleDown.bind(this);
  }

  handleDown(event) {
    // this(the vector point thing).addEventListener('mousemove', () => {
    //     set the i value to clientX or something
    // })
  }
  handleUp(event) {
    //handle
  }
  render() {
    const {x, y, color, size} = this.props;
    return (
      <ArrowPresentation
        x={x}
        y={y}
        name="i"
        color={color}
        size={size}
        handleDown={this.handleDown}
        handleUp={this.handleUp}
      />
    );
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
