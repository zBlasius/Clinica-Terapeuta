const express = require('express');
const cors = require('cors')
const router = express();
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const { initializeApp } = require('firebase/app');
const { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult } = require('firebase/auth');
const provider = new GoogleAuthProvider();
const config = require('./config.json');

const firebaseApp = initializeApp(config.appCredentials)
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const port = 8000;

router.use(express.json());
router.use(cors());

getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
  }).catch((error) => {
    alert(error)
});

router.get('/teste', (req, res) => {
    res.json({ titulo: 'teste' })
})

router.get('/get', (req, res) => {
    let data = req.query;
    console.log("teste", data)
    console.log("query", req)
    get(data).then((resp)=>{
        res.json(resp)
    }).catch(err=>res.status(400).json({err:true}))
})

function get(entity) {
    const citiesCol = collection(db, entity);
    return getDocs(citiesCol).then(resp => {
        const cityList = resp.docs.map(doc => doc.data());
        console.log("teste", resp)
        return cityList
    });
}

router.listen(port, () => {
    console.log("servidor rodando na porta 8000 !! ")
})