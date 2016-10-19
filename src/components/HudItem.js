require("./HudItem.sass")

import React, { createClass, PropTypes } from "react"

const { number, oneOf, node } = PropTypes

export default createClass({
  displayName: "HudItem",

  propTypes: {
    x: number.isRequired,
    y: number.isRequired,
    colour: oneOf(["grey", "blue", "red"]),
    children: node
  },

  calculateStyles ({x, y}) {
    const rotateY = 10 - (x / 100 * 20)
    const rotateX = (y / 100 * 20) - 10

    const positionX = {
      [x > 50 ? "right": "left"]: `${(x > 50 ? 100 - x : x)}%`
    }

    const positionY = {
      [y > 50 ? "bottom": "top"]: `${(y > 50 ? 100 - y : y)}%`
    }

    return Object.assign({}, {
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }, positionX, positionY)
  },

  render () {
    const modifier = `hud-item--${this.props.colour}`

    return (
      <div className={`hud-item ${modifier}`} style={this.calculateStyles(this.props)}>
        {this.props.children}
      </div>
    )
  }
})

