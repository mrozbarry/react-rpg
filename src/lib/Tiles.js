import _ from "lodash"

export default {
  default: {
    floor: {
      O: [require("file!assets/images/tiles/tile_12.png"), {}],
    },
    lowerProp: {
      "U": [require("file!assets/images/tiles/tile_528.png"), {}],
      "(": [require("file!assets/images/tiles/tile_528.png"), { transformOrigin: "50% 50%", transform: "rotateZ(90deg)"}],
      "n": [require("file!assets/images/tiles/tile_528.png"), { transformOrigin: "50% 50%", transform: "rotateZ(180deg)"}],
      ")": [require("file!assets/images/tiles/tile_528.png"), { transformOrigin: "50% 50%", transform: "rotateZ(270deg)"}]
    },
    upperProp: {
      L: [require("file!assets/images/tiles/tile_132.png"), {}]
    },
    collision: {
      X: [require("file!assets/images/tiles/tile_358.png"), {}],

      B: [require("file!assets/images/tiles/tile_129.png"), {}],
      b: [require("file!assets/images/tiles/tile_130.png"), {}],
      U: [require("file!assets/images/tiles/tile_156.png"), {}],
      u: [require("file!assets/images/tiles/tile_157.png"), {}],
    }
  }
}

export const tilesFromString = (size, tiles) => {
  const [width, height] = size

  const rows = tiles.split("\n")

  return _.range(height).reduce((memo, rowIdx) => {
    const row = rows[rowIdx]
    if (!row) {
      return memo.concat(_.range(width).map(() => null))
    } else {
      return memo.concat(_.range(width).map((colIdx) => row[colIdx] || null))
    }
  }, [])
}
