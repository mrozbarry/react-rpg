export const inputKeyValidMappings = [
  "up",
  "down",
  "left",
  "right"
]

export const inputKeyMapping = {
  up: ["ArrowUp", "w"],
  down: ["ArrowDown", "s"],
  left: ["ArrowLeft", "a"],
  right: ["ArrowRight", "d"]
}

export const inputCleared = () => {
  return Object.assign(
    {},
    inputKeyValidMappings.reduce((memo, key) => {
      return Object.assign({}, memo, { [key]: false })
    }, {}),
    {
      mouse: [-1, -1]
    }
  )
}

export const inputKeyGetMapping = (e) => {
  return inputKeyValidMappings.find((mapping) => {
    return inputKeyMapping[mapping].indexOf(e.key) >= 0
  })
}
