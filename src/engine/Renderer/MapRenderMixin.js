import { TILE_SIZE } from "./_const"

import _ from "lodash"

export default {
  componentWillUnmount () {
    this.registerBuffer("map", null)
  },

  _mapChanged (nextMap) {
  },

  _mapChangedMapTiles (nextMap) {
    const tileIds = _.reject(_.uniq(_.flatten(nextMap.tiles)), (id) => id === null || id === undefined)

    const nextMapTiles = tileIds.reduce((mapTiles, tileId) => {

    }, {})
  },

  mapCreateBuffer (map) {
    const buffer = this._createCanvasBuffer(map.size.map((sz) => {
      return sz * TILE_SIZE
    }))

    this.registerBuffer("map", buffer)
  },

  mapRender (map) {
    const { ctx } = this.getBuffer("map")

    Array.from("y".repeat(map.size[1])).forEach((y, row) => {
      Array.from("x".repeat(map.size[0])).forEach((x, col) => {
        const tileId = map.tiles[row][col]
        const source = this.state.tileCache[tileId]
        if (tileId && source) {
          ctx.drawImage(source, col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
        } else {
          ctx.clearRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
        }
      })
    })
  }
}
