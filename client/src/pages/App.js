import "./App.css";
import React, { useEffect, useState } from "react";
import api from '../api/api'
import config from '../config.json'

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

      api.post('post', {user: user.email, kind:'Agendamentos', params:{ name:'joel',age:30,school:'formado' }})
        .then(res => {
        console.log("teste res", res)
      })

      if (user != null) {
        setUser(user)
      } else {
        signInWithRedirect(auth, provider);
      }
    });



  }, [])

  return (
    <div className="App">
      <span> teste </span>
    </div>
  );
}

export default App;
