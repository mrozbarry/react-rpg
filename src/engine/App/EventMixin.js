import { inputKeyGetMapping } from "lib/Input"

export default {
  componentWillMount () {
    document.addEventListener("keydown", this._keyDown)
    document.addEventListener("keyup", this._keyUp)
  },

  componentWillUnmount () {
    document.removeEventListener("keydown", this._keyDown)
    document.removeEventListener("keyup", this._keyUp)
  },

  _keyDown (e) {
    const mapping = inputKeyGetMapping(e)

    if (mapping && !this.props.state.playerInput[mapping]) {
      this.props.actions.playerInputKeyDown(mapping)
    }
  },

  _keyUp (e) {
    const mapping = inputKeyGetMapping(e)

    if (mapping && this.props.state.playerInput[mapping]) {
      this.props.actions.playerInputKeyUp(mapping)
    }
  }
}
