require("./Layer.sass")

import React, { createClass, PropTypes } from "react"

const { string, object, node } = PropTypes

export default createClass({
  displayName: "Layer",

  propTypes: {
    name: string,
    className: string,
    style: object,
    children: node
  },

  classNames ({className}) {
    return ["layer"].concat((className || "").split(" ")).join(" ")
  },

  render () {
    return (
      <div className={this.classNames(this.props)} style={this.props.style} data-name={`layer-${this.props.name || "unnamed"}`}>
        {this.props.children}
      </div>
    )
  }
})

