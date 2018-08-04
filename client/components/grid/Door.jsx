import React from 'react'
import {connect} from 'react-redux'

const Door = ({x, y, size}) => {
  return (
    <rect
      x={x - size / 2}
      y={-y - size / 2}
      width={size}
      height={size}
      fill="brown"
    />
  )
}

const mapState = state => {
  return {
    size: state.size / 20
  }
}

export default connect(mapState)(Door)
