const express = require('express')
const app = express()
const port = 3000
const initializeApp = require('firebase/app');
const { getAuth, onAuthStateChanged } = require('firebase/auth');
const firebaseApp = initializeApp({
  apiKey: "AIzaSyC7QyTu5CxHDDNS0zkILZNJIytF4LfFD8Y",
  authDomain: "psicodevelicos.firebaseapp.com",
  projectId: "psicodevelicos",
  storageBucket: "psicodevelicos.appspot.com",
  messagingSenderId: "318941583719",
  appId: "1:318941583719:web:0ee31d87c17a4e42c4f7c2",
  measurementId: "G-JYSNCPGLKL"
})
const auth = getAuth(firebaseApp);

// Detect auth store
onAuthStateChanged(auth, user=>{
  if(user != null){
    console.log('logged in');
  } else {
    console.log('no user');
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', (req, res) => {
  let teste = this.teste()
  res.json({ok:true})
});

app.post('/user', (req, res) => {
  res.send('Inserir um usuário');
});

app.put('/user/:id', (req, res) => {
  res.send(`Editar um usuário com o id ${req.params.id}`);
});

app.delete('/user/:id', (req, res) => {
  res.send(`Excluir um usuário com o id ${req.params.id}`);
});

function teste(){
  return {nothing:true}
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
  