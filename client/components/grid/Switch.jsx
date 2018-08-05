import React from 'react'
import {connect} from 'react-redux'

const Switch = ({x, y, size}) => {
  return <circle cx={x} cy={-y} r={size / 60} fill="purple" />
}

const mapState = state => {
  return {
    size: state.size
  }
}

export default connect(mapState)(Switch)
