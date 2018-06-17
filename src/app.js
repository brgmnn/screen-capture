import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./store/reducers";
import defaultState from "./store/default-state";
import sagas from "./store/sagas";
import Window from "./ui/window";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  defaultState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <Window />
  </Provider>,
  document.getElementById("app")
);
