import React from 'react'

const GridSquare = ({origin = [0, 0], i, j}) => {
  return (
    <polyline
      points={[
        [0, 0],
        [i.x, -i.y], //negative because cartesian points y up but svg points down
        [i.x + j.x, -(i.y + j.y)],
        [j.x, -j.y],
        [0, 0]
      ]}
      style={{fill: 'red', stroke: 'black', strokeWidth: 1}}
      transform={`translate(${origin[0]} ${-1 * origin[1]})`}
    />
  )
}

export default GridSquare
