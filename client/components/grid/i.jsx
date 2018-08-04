import React from 'react'
import {connect} from 'react-redux'
import Arrow from './Arrow'

const mapState = state => {
  return {}
}

export default connect(mapState, mapDispatch)(Arrow)
