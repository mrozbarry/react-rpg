import { mapLoad } from "lib/Maps"

export const mapReplace = (map) => {
  return {
    type: "mapReplace",
    map: map
  }
}

export const mapFetch = (mapUrl) => {
  return (dispatch) => {
    mapLoad(mapUrl, {
      failure: (result) => {
        console.error("unable to load map", mapUrl, result)
      },
      success: (nextMap) => {
        dispatch(mapReplace(nextMap))
      }
    })
  }
}

export const cameraSet = (position) => {
  return {
    type: "cameraSet",
    position
  }
}

export const inputsClear = () => {
  return {
    type: "inputsClear"
  }
}

export const inputsPush = (entityId, binding, pressed) => {
  return {
    type: "inputsPush",
    entityId,
    binding,
    pressed
  }
}

export const playerInputKeyDown = (what) => {
  return {
    type: "playerInputKeyDown",
    what
  }
}

export const playerInputKeyUp = (what) => {
  return {
    type: "playerInputKeyUp",
    what
  }
}

export const playerInputClear = () => {
  return {
    type: "playerInputClear"
  }
}
