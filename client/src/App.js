import "./App.css";
import React, { useEffect } from 'react';

const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const { initializeApp } = require('firebase/app');
const { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult } = require('firebase/auth');
const provider = new GoogleAuthProvider();

// TODO isolar código de autenticação em uma outra pasta, e apenas importar dentro deste aquivo (app.js)

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCB4tJiWBcHOdsmE2pzbm80xfd1zCNv8Dc",
  authDomain: "boxwood-chalice-339814.firebaseapp.com",
  databaseURL: "https://boxwood-chalice-339814-default-rtdb.firebaseio.com",
  projectId: "boxwood-chalice-339814",
  storageBucket: "boxwood-chalice-339814.appspot.com",
  messagingSenderId: "77685519438",
  appId: "1:77685519438:web:6a47db9f8088883451ff1f",
  measurementId: "G-40HP4GZ066"
})

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log('logged in');
  } else {
    signInWithRedirect(auth, provider);
  }
})

getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

  const db = getFirestore(firebaseApp);

function App() {

  useEffect(()=>{
    getCities(db)
  },[])

  // Get a list of cities from your database
  async function getCities(db) {
    console.log("teste ____")
    const citiesCol = collection(db, 'agendamentos');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log("cityList", cityList)
    return cityList;
  }

  return (
    <div className="App">
      <span> teste </span>
    </div>
  );
}

export default App;