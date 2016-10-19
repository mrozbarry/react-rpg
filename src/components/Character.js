import { createClass, PropTypes } from "react"

const { shape, array, any } = PropTypes

export default createClass({
  displayName: "Character",

  propTypes: {
    camera: shape({
      position: array.isRequired
    }).isRequired,
    canvasContext: any.isRequired
  },

  componentWillReceiveProps (nextProps) {
  },

  render () {
    return null
  }
})
