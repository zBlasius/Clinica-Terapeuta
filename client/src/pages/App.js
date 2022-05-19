// import "./App.css";
// import React, { useEffect } from "react";
// import api from '../api/api'
// import config from '../config.json'

// const { initializeApp } = require("firebase/app");
// const {
//   getAuth,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithRedirect
// } = require("firebase/auth");

// const provider = new GoogleAuthProvider();
// const firebaseApp = initializeApp(config.appConfig);
// const auth = getAuth(firebaseApp);

// onAuthStateChanged(auth, user => {
//   if (user != null) {
//     console.log("logged in");
//   } else {
//     signInWithRedirect(auth, provider);
//   }
// });

// function App() {
//   useEffect(() => {
//     api.post('post', {params:{collection:'blasius'}}).then(res=>{
//       console.log("teste res", res)
//     })
//   }, [])

//   return (
//     <div className="App">
//       <span> teste </span>
//     </div>
//   );
// }

// export default App;
