import mapReducer from "./mapReducer"
import cameraReducer from "./cameraReducer"
import inputsReducer from "./inputsReducer"
import entitiesReducer from "./entitiesReducer"
import playerInputReducer from "./playerInputReducer"

import { inputCleared } from "lib/Input"

const initialState = {
  map: {
    source: null,
    size: [0, 0],
    tiles: []
  },
  camera: {
    position: [window.innerWidth / 2, window.innerHeight / 2]
  },
  inputs: [],
  entities: [],
  playerInput: inputCleared()
}

export default (state, action) => {
  if (typeof state === "undefined") { return initialState }

  return {
    map: mapReducer(state.map, action),
    camera: cameraReducer(state.camera, action),
    inputs: inputsReducer(state.inputs, action),
    entities: entitiesReducer(state.entities, action),
    playerInput: playerInputReducer(state.playerInput, action)
  }
}
