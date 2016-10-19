import request from "superagent"

export const mapLoad = (filename, callbacks) => {
  request
    .get(filename)
    .end((err, result) => {
      if (err || !result.ok) {
        if (callbacks.failure) callbacks.failure(result)
      } else {
        const map = mapExpand(
          Object.assign(
            {},
            JSON.parse(result.text),
            { source: filename }
          )
        )
        if (callbacks.success) callbacks.success(map)
      }
    })
}

export const mapExpand = (map) => {
  const validTileRows = map.tiles.slice(0, map.size[1])
  const paddedTiles = validTileRows.concat(Array.from("x".repeat(map.size[1] - validTileRows.length)).map(() => []))

  return Object.assign(
    {},
    map,
    {
      tiles: paddedTiles.map((tileRow) => {
        const row = tileRow.slice(0, map.size[0])
        if (row.length < map.size[0]) {
          return row.concat(Array.from("x".repeat(map.size[0] - tileRow.length)).map(() => null))
        } else {
          return row
        }
      })
    }
  )
}

export const mapCompress = (map) => {
  const validTileRows = map.tiles.slice(0, map.size[1])

  return Object.assign(
    {},
    map,
    {
      tiles: arrayTrimRight(
        validTileRows.map((tileRow) => {
          return arrayTrimRight(tileRow.slice(0, map.size[0]))
        }),
        (e) => !e || e.length === 0
      )
    }
  )
}

const arrayTrimRight = (arr, fn) => {
  if (!arr || arr.length == 0) { return arr }

  const lastElement = arr[arr.length - 1]

  const shouldTrimMethod = fn || ((e) => e === null || e === undefined)

  if (shouldTrimMethod(lastElement)) {
    return arrayTrimRight(arr.slice(0, -1), shouldTrimMethod)
  }
  return arr
}
