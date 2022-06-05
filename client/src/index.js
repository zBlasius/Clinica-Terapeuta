import React from "react";
import ReactDOM from "react-dom";
import Agenda from "./components/Agenda";
import App from './pages/App'
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    
    <Agenda/>
  </React.StrictMode>,
  document.getElementById("root")
);
