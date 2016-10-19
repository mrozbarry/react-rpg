require("./App.sass")

import React, { createClass, PropTypes } from "react"

import Layer from "engine/Layer"
import Map from "engine/Map"
import Hud from "engine/Hud"

import AppEventMixin from "engine/App/EventMixin"

const { object, array } = PropTypes

export default createClass({
  displayName: "App",

  mixins: [
    AppEventMixin
  ],

  propTypes: {
    actions: object.isRequired,
    state: object.isRequired,
    components: array.isRequired
  },

  componentDidMount () {
    this.props.actions.mapFetch("/assets/maps/demo.json")
  },


  render () {
    const { components } = this.props

    return (
      <Layer name="app" className="app">
        {this.renderComponents(components)}
      </Layer>
    )
  },

  renderComponents (components) {
    const { map, camera } = this.props.state

    return ["map", "editor", "hud"].reduce((memo, componentName) => {
      if (components.indexOf(componentName) === -1) { return memo }

      switch (componentName) {
      case "map":
        return memo.concat(<Map key="map" map={map} camera={camera} />)
      case "hud":
        return memo.concat(<Hud key="hud" />)
      }

      return memo
    }, [])
  }
})
