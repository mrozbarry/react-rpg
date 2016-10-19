import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as ActionCreators from "redux/actions"
import App from "engine/App"

const mapStateToProps = (state) => {
  return { state: state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
