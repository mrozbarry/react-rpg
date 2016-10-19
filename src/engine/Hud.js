require("./Hud.sass")

import React, { createClass, PropTypes } from "react"

import Layer from "engine/Layer"
import HudItem from "components/HudItem"
import CharacterProfile from "components/CharacterProfile"

const { shape, string, number } = PropTypes

export default createClass({
  displayName: "Hud",

  propTypes: {
    name: string,
    avatar: string,
    health: shape({ amount: number, maximum: number })
  },

  getInitialState () {
    return {
      health: 100,
      energy: 100
    }
  },

  componentDidMount () {
    this.randomizeValues()
  },

  componentWillUnmount () {
    clearTimeout(this._updateTimer)
  },

  randomizeValues () {
    this.setState({
      health: this.randomValueFrom(this.state.health, 5),
      energy: this.randomValueFrom(this.state.energy, 25)
    }, () => {
      this._updateTimer = setTimeout(() => {
        this.randomizeValues()
      }, 1000)
    })
  },

  randomValueFrom (original, range) {
    return Math.min(Math.max(original + ((Math.random() * range) - (range / 2)), 0), 100)
  },

  render () {
    return (
      <Layer name="interface" className="hud">
        <HudItem x={2} y={98} colour="blue">
          <CharacterProfile />
        </HudItem>

        <HudItem x={20} y={98} colour="blue">
          <CharacterProfile />
        </HudItem>

        <HudItem x={98} y={98} colour="red">
          <CharacterProfile />
        </HudItem>
      </Layer>
    )
  }
})

