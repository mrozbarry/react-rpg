require("./Renderer.sass")

import React, { createClass, PropTypes } from "react"

import Layer from "engine/Layer"

import _ from "lodash"

const { object, shape, array } = PropTypes

export default createClass({
  displayName: "Map",

  propTypes: {
    map: object.isRequired,
    camera: shape({
      position: array.isRequired
    }).isRequired
  },

  getInitialState () {
    const windowSize = this._calculateWindowSize()

    return {
      windowSize: windowSize,
      tileCache: {}
    }
  },

  componentWillMount () {
    window.addEventListener("resize", this._windowResize)
    this.buffers = undefined
  },

  componentDidMount () {
    this._windowResize()
    this.compositer.addEventListener("mousemove", this._mouseMove)
  },

  componentWillUnmount () {
    window.removeEventListener("resize", this._windowResize)
    this.compositer.removeEventListener("mousemove", this._mouseMove)
    this.buffers = undefined
  },

  componentWillReceiveProps (nextProps) {
    const { map, camera } = this.props

    if (camera.position.some((axis, idx) => axis != nextProps.camera.position[idx])) {
      this._updateCanvasBuffers(nextProps)
    }

    if (map.source != nextProps.map.source || map.size.join("-") != nextProps.map.size.join("-")) {
      this._handleMapChange(nextProps)
    }
  },

  registerBuffer (name, canvas) {
    this.buffers = this.buffers || {}

    const ctx = canvas.getContext("2d")
    this.buffers[name] = {
      canvas: canvas,
      ctx
    }
    return ctx
  },

  getBuffer (name) {
    return (this.buffers || {})[name]
  },

  _handleMapChange (nextProps) {
    this.buffers = {
      map: this._createCanvasBufferForMap(nextProps.map),
      mask: this._createCanvasBufferForMap(nextProps.map)
    }

    const tileIds = _.uniq(_.flatten(nextProps.map.tiles))
    this.setState({
      tileCache: tileIds.reduce((nextTileCache, tileId) => {
        if (tileId !== null && !nextTileCache[tileId]) {
          return Object.assign(
            {},
            nextTileCache,
            {
              [tileId]: this._loadTile(tileId)
            }
          )
        }

        return nextTileCache
      }, this.state.tileCache)
    })
  },

  _loadTile (tileId) {
    const img = new Image()
    img.src = `assets/images/Tiles/tile_${tileId}.png`
    img.onload = () => {
      this._updateCanvasBuffers(this.props)
    }

    img.onerror = () => {
      this.setState({
        tileCache: Object.assign({
          [tileId]: undefined
        })
      })
    }

    return img
  },

  _createCanvasBufferForMap ({ size }) {
    if (size.some((axis) => axis === 0)) { return }

    const canvas = document.createElement("canvas")
    canvas.width = size[0] * 32
    canvas.height = size[1] * 32

    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)

    return {
      canvas,
      ctx: context
    }
  },

  _updateCanvasBuffers (props) {
    if (!this.buffers) { return }

    this._updateMap(props.map, this.buffers.map)

    const [w, h] = this.state.windowSize
    const ctx = this.compositer.getContext("2d")

    const { camera } = props
    const p = [
      camera.position[0] - (w / 2),
      camera.position[1] - (h / 2)
    ]

    ctx.clearRect(0, 0, w + 1, h + 1)
    ctx.drawImage(this.buffers.map.canvas, p[0], p[1], w, h, 0, 0, w, h)
    ctx.drawImage(this.buffers.mask.canvas, p[0], p[1], w, h, 0, 0, w, h)
  },

  _updateMap (map, { canvas, ctx }) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    Array.from("y".repeat(map.size[1])).forEach((y, row) => {
      Array.from("x".repeat(map.size[0])).forEach((x, col) => {
        const tileId = map.tiles[row][col]
        if (tileId) {
          const source = this.state.tileCache[tileId]
          if (source) {
            ctx.drawImage(source, col * 32, row * 32, 32, 32)
          } else {
            ctx.filleStyle = "#f0f"
            ctx.fillRect(col * 32, row * 32, 32, 32)
          }
        } else {
          ctx.strokeStyle = "white"
          ctx.strokeRect(col * 32, row * 32, 32, 32)
        }
      })
    })
  },

  _calculateWindowSize () {
    return [
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    ]
  },

  _windowResize () {
    this.setState({
      windowSize: this._calculateWindowSize()
    }, () => {
      this._updateCanvasBuffers(this.props)
    })
  },

  _mouseMove (e) {
    //this.props.playerInputMotion([e.clientX, e.clientY])
  },

  render () {
    const { windowSize } = this.state

    return (
      <Layer name="renderer" className="renderer">
        <canvas className="renderer__composite" ref={(self) => this.compositer = self} width={windowSize[0]} height={windowSize[1]}>
          Your platform does not support canvas. That's probably the least of your problems, while trying to run this game.
        </canvas>
      </Layer>
    )
  }
})
