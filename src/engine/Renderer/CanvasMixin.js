export default {
  getInitialState () {
    return {
      images: {}
    }
  },

  _createCanvasBuffer (size) {
    if (size.some((axis) => axis === 0)) { return }

    const canvas = document.createElement("canvas")
    canvas.width = size[0]
    canvas.height = size[1]

    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)

    return canvas
  }
}
