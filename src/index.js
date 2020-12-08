import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "antd/dist/antd.css";

import { Provider } from "react-redux";
import { createStore } from "redux";

const reducer = (
  state = {
    count: 0,
  },
  { type, payload }
) => {
  if (type === "GET_DATA")
    return { ...state, data: [...state.data, ...payload] };
  if (type === "FILE_UPLOAD") return { ...state, file: payload };
  if (type === "ADD_COUNT") return { ...state, count: state.count + 1 };
  return state;
};

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
