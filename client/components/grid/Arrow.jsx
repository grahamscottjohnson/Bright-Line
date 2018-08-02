import React from 'react'

const Arrow = ({x, y, color = 'orange'}) => {
  return (
    <polyline
      points={[
        [0, 0],
        [x, -y] //more points for tip but later
      ]}
      style={{fill: color, stroke: color, strokeWidth: 3}}
    />
  )
}

export default Arrow
