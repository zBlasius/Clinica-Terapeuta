import 'firebase/firestore';

import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
//import {config} from '../config.json';


const firebaseApp = initializeApp({
    apiKey: "AIzaSyC7QyTu5CxHDDNS0zkILZNJIytF4LfFD8Y",
    authDomain: "psicodevelicos.firebaseapp.com",
    projectId: "psicodevelicos",
    storageBucket: "psicodevelicos.appspot.com",
    messagingSenderId: "318941583719",
    appId: "1:318941583719:web:0ee31d87c17a4e42c4f7c2",
    measurementId: "G-JYSNCPGLKL"
});

const db = getFirestore(firebaseApp);

const crud = {

    /**
        * Função destinada a pegar dados de uma coleção a partir do ID
        * 
         * @param   {Any} Any    Any
         * @param   {Any} Any    Any
         * @param   {Any} Any    Any
         * @returns {Any}
    */
    getById: (entity, filter) => {
        const citiesCol = collection(db, entity);
        return getDocs(citiesCol).then(resp => {
            const returnList = resp.docs.map(doc => doc.data());
            return returnList;
        });
    },

    /**
         * Função destinada a pegar todos os dados de uma coleção
         * 
         * @param   {Any} Any    Any
         * @param   {Any} Any    Any
         * @param   {Any} Any    Any
         * @returns {Any}
    */
    getAll: (entity, filter) => {
        const citiesCol = collection(db, entity);
        return getDocs(citiesCol).then(resp => {
            const returnList = resp.docs.map(doc => doc.data());
            return returnList;
        });
    },

    /**
         * Função destinada a enviar dados ao firebase
         * 
         * @param   {String} user    Usuário a ser requeridos os dados 
         * @param   {String} kind    Coleção a ser pesquisada
         * @param   {Object} data    Dados que serão inseridos
         * @returns {Array}
    */
    post: (user, kind, data) => {
        //const userNamespace = db.collection('psicodevlicos').doc('joel_marcos@gmail.com');
        const agendamentos = collection(db, `psicodevlicos/${user}/${kind}`)
        return addDoc(agendamentos, data);
    }
}

export default crud;

//module.exports = crud;