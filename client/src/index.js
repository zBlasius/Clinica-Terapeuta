import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import Agenda from "./components/Agenda";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Agenda />
  </React.StrictMode>,
  document.getElementById("root")
);
