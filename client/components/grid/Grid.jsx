import React, {Component, Fragment} from 'react'
import GridSquare from './GridSquare'
import PropTypes from 'prop-types'

export default class Grid extends Component {
  makeAxis(numAxis) {
    // Example: 2 --> [-2,1,0,1] //so that it's symmetric
    const result = []
    for (let i = -1 * numAxis; i < numAxis; i += 1) {
      result.push(i)
    }
    return result
  }
  render() {
    const axis = this.makeAxis(3)
    const i = this.props.i
    const j = this.props.j
    return (
      <Fragment>
        {axis.map(x => {
          return axis.map(y => {
            const origin = [i.x * x + j.x * y, i.y * x + j.y * y]
            return (
              <GridSquare key={[x, y].toString()} origin={origin} i={i} j={j} />
            )
          })
        })}
      </Fragment>
    )
  }
}

Grid.defaultProps = {
  i: {x: 50, y: 0},
  j: {x: 0, y: 50}
}

Grid.propTypes = {
  i: PropTypes.object,
  j: PropTypes.object
}
