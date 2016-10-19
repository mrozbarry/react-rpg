require("./CharacterProfile.sass")

import React, { createClass, PropTypes } from "react"

import PercentageBar from "components/PercentageBar"

const { shape, string, number } = PropTypes

export default createClass({
  displayName: "CharacterProfile",

  propTypes: {
    name: string,
    avatar: string,
    health: shape({ amount: number, maximum: number })
  },

  getInitialState () {
    return {
      health: 100,
      energy: 100,
      experience: 0
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
      energy: this.randomValueFrom(this.state.energy, 25),
      experience: (this.state.experience + (Math.random() * 20)) % 100
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
    const { health, energy, experience } = this.state

    return (
      <div className="character-profile">
        <div className="character-profile__image" />
        <div className="character-profile__data">
          <h3 className="character-profile__data-name">Name</h3>

          <div className="character-profile__data-spacer" />

          <div className="character-profile__data-bar"><PercentageBar name="Health" value={health} maximum={100} colour="red" /></div>
          <div className="character-profile__data-bar"><PercentageBar name="Energy" value={energy} maximum={100} colour="blue" /></div>
          <div className="character-profile__data-bar"><PercentageBar name="Experience" value={experience} maximum={100} colour="#D9BE00" /></div>
        </div>
      </div>
    )
  }
})


