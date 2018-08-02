import React from 'react'

const Door = ({x, y, size}) => {
  return (
    <rect
      x={x - size / 2}
      y={-y + size / 2}
      width={size}
      height={size}
      fill="brown"
    />
  )
}

export default Door
