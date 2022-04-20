import "./App.css";
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
      {/* <ReactAgenda/> */}

      // TODO Importar index.js dos server dentro do client. Como fazer isso ?
      <script type='module' src='../../server/index.js'></script>
    </div>
  );
}

export default App;
