import "./App.css";
import GoogleButton from "react-google-button";
import React from 'react';

function App() {


  
  return (
    <div className="App">
      {/* <GoogleButton
        type={"light"}
        onClick={() => {
          console.log("Google button clicked");
        }}
      /> */}
      <ReactAgenda/>
    </div>
  );
}

export default App;
