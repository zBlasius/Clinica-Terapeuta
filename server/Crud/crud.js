const FireSQL = require('firesql');
import firebase from 'firebase/app';
import 'firebase/firestore';

const { getFirestore, collection, getDocs, doc, setDoc } = require('firebase/firestore/lite');
const { initializeApp } = require('firebase/app');
const config = require('../config.json');


const firebaseApp = initializeApp(config.appCredentials);
const db = getFirestore(firebaseApp);
const fireSQL = new FireSQL(firebase.firestore());

export default function crud() {

    get = (entity, filter)=> {
    
        const cidades = fireSQL.query(`
            SELECT  nome as cidade, uf, populacao
            FROM cidades
            Where uf = 'pr' and populacao > 10000
        `);
    
        return cidades.then(resp => {
            //const returnList = resp.docs.map(doc => doc.data());
            console.log("teste resp", resp) 
            return resp;
        });
    };
    
    getById = (entity, filter) => {
        const citiesCol = collection(db, entity);
        return getDocs(citiesCol).then(resp => {
            const returnList = resp.docs.map(doc => doc.data());
            return returnList;
        });
    };
    
    post = (entity, filter) => {
        const dataPost = collection(db, entity);
        return setDoc(doc(dataPost, "INFO"), {
            name: "Jaragua", state: "SC", country: "BRASIL",
            capital: false, population: 1000
        }
        );
    };
}