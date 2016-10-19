export default (state, action) => {
  switch (action.type) {
  case "mapReplace":
    return action.map

  default:
    return state
  }
}
