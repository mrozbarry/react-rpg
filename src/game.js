import React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import App from "./redux/containers/App"
import reducer from "./redux/reducers"

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <App components={["map", "hud"]} />
    </Provider>,
    document.getElementById("react-app")
  )
})
