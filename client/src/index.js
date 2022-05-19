import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import Agenda from "./components/Agenda";
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    
    <Agenda/>
  </React.StrictMode>,
  document.getElementById("root")
);
