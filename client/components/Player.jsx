import React from 'react'

const Player = ({x, y}) => {
  return <circle cx={x} cy={-y} r="10" fill="yellow" />
}

export default Player
