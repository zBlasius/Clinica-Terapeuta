import "./App.css";
import React, { useEffect, useState } from "react";
import api from '../api/api'
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
    
    api.post('update', { user: user?.email, kind: 'Agendamentos', id: 'r6Nl5kbUuPIc3LIsq0jl', params: { name: 'atualizou', opa: 2, age: 301111111, school: 'graSDFSDFDSFSDFdueted' } })
      .then(res => {
        console.log("CAIU NO IF", res)
      })
      .catch(err => {
        console.log('err', err)
    })

    onAuthStateChanged(auth, user => {

      if (user != null) {
        setUser({...user})
      } else {
        signInWithRedirect(auth, provider);
      }
    });

  }, [])

  return (
    <div className="App">
      <Agenda user={user}/>
    </div>
  );
}

export default App;
