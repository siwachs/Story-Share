import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./REDUX/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>
);
