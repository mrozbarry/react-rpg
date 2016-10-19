import { inputCleared } from "lib/Input"

export const playerInputKeyDown = (playerInput, action) => {
  return Object.assign({}, playerInput, { [action.what]: true })
}

export const playerInputKeyUp = (playerInput, action) => {
  return Object.assign({}, playerInput, { [action.what]: false })
}

export const playerInputMotion = (playerInput, action) => {
  return Object.assign({}, playerInput, { mouse: action.mouse })
}

export default (playerInput, action) => {
  switch (action.type) {
  case "playerInputKeyDown":
    return playerInputKeyDown(playerInput, action)

  case "playerInputKeyUp":
    return playerInputKeyUp(playerInput, action)

  case "playerInputClear":
    return inputCleared()

  case "playerInputMotion":
    return playerInputMotion(playerInput, action)

  default:
    return playerInput
  }
}
