import React from 'react'
import {connect} from 'react-redux'

const Key = ({x, y, size}) => {
  return (
    <rect
      x={x - size / 2}
      y={-y - size / 4}
      width={size}
      height={size / 2}
      fill="pink"
    />
  )
}

const mapState = state => {
  return {
    size: state.size / 20
  }
}

export default connect(mapState)(Key)
