import React from 'react'
import {connect} from 'react-redux'

const Player = ({x, y, size}) => {
  return (
    <circle className="player" cx={x} cy={-y} r={size / 60} fill="yellow" />
  )
}

const mapState = state => {
  return {
    size: state.size
  }
}

export default connect(mapState)(Player)
