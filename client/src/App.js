import "./App.css";
import GoogleButton from "react-google-button";

function App() {
  return (
    <div className="App">
      <GoogleButton
        type={"light"}
        onClick={() => {
          console.log("Google button clicked");
        }}
      />
    </div>
  );
}

export default App;
