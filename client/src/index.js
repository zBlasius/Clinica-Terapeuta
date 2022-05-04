import "./index.scss"
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Agenda from "./Agenda"

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Agenda/>
  </React.StrictMode>,
  document.getElementById("root")
);
