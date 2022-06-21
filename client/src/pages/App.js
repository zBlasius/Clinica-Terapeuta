import "./App.css";
import React, { useEffect, useState } from "react";
import config from '../config.json'
import Agenda from "../components/Agenda";

const { initializeApp } = require("firebase/app");
const {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect
} = require("firebase/auth");

const provider = new GoogleAuthProvider();
const firebaseApp = initializeApp(config.appCredentials);
const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, user => {

      if (user != null) {
        setUser({ ...user })
      } else {
        signInWithRedirect(auth, provider);
      }
    });

  }, [])

  return (
    <div className="App">
      {user ?
        < Agenda user={user} />
      :undefined}
    </div>
  );
}

export default App;
