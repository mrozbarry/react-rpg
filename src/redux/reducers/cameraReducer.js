const cameraSet = (camera, action) => {
  return Object.assign(
    {},
    camera,
    {
      position: [0, 1].map((idx) => action.position[idx] || 0),
    }
  )
}

export default (camera, action) => {
  switch (action.type) {
  case "cameraSet":
    return cameraSet(camera, action)
  default:
    return camera
  }
}
