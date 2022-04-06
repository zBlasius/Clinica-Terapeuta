import "./App.css";
import GoogleButton from "react-google-button";
import React from 'react';
import Agenda from "./Schedule";

function App() {


  
  return (
    <div className="App">
      {/* <GoogleButton
        type={"light"}
        onClick={() => {
          console.log("Google button clicked");
        }}
      /> */}
      <Agenda/>
    </div>
  );
}

export default App;
