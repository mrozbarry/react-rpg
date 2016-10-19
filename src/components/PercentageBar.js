require("./PercentageBar.sass")

import React, { createClass, PropTypes } from "react"

const { string, number } = PropTypes

export default createClass({
  displayName: "PercentageBar",

  propTypes: {
    name: string,
    colour: string.isRequired,
    value: number.isRequired,
    maximum: number.isRequired
  },

  render () {
    const { name, colour, value, maximum } = this.props

    const percent = value / maximum * 100.0

    return (
      <div className="percentage-bar" style={{ borderLeft: `1px ${colour} solid` }}>
        <div className="percentage-bar__bar" style={{ width: `${percent}%`, backgroundColor: colour }} />
        {this.renderText(name)}
      </div>
    )
  },

  renderText (text) {
    if (!text || text === "") { return null }

    return (
      <div className="percentage-bar__text">
        {text}
      </div>
    )

  }
})


