import React from 'react'

const Block = ({x, y, size}) => {
  return (
    <rect
      x={x - size / 2}
      y={-y + size / 2}
      width={size}
      height={size}
      fill="gray"
    />
  )
}

export default Block
