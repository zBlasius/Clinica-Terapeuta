import 'firebase/firestore';

import { getFirestore, collection, setDoc, deleteDoc, getDocs, doc, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


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

function post(user, kind, data) {
    const _post = collection(db, `psicodevlicos/${user}/${kind}`)
    return addDoc(_post, data).then(resp => {
        return { ...data, id: resp.id }
    })
}

function update(user, kind, id, data){
    const _post = doc(db, `psicodevlicos`, user, kind, id)
    return setDoc(_post, data)
}


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
         * @param   {String} user    Usuário em que será feito o get
         * @param   {String} kind    Coleção requisitada
         * @returns {Array} É retornado um array de objetos
    */
    getAll: (user, kind) => {
        const postCol = collection(db, `psicodevlicos/${user}/${kind}`);
        return getDocs(postCol).then(resp => {
            const returnList = resp.docs.map(doc => { return { id: doc.id, ...doc.data() } });
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
    upcreate: (data) => {
        const {user, kind, params} = data;

        if (params.id) {
            return update(user, kind, params.id, params);
        }

        return post(user, kind, params);
    },


    /**
         * Função destinada a enviar dados ao firebase
         * 
         * @param   {String} user    Usuário a ser requeridos os dados 
         * @param   {String} kind    Coleção a ser pesquisada
         * @param   {Object} data    Dados que serão inseridos
         * @returns {Array}
    */
    post,


    /**
         * Função destinada a atualizar dados ao firebase
         * 
         * @param   {String} user    Usuário a ser requeridos os dados 
         * @param   {String} kind    Coleção a ser pesquisada
         * @param   {Object} id      id do documento a ser atualizado
         * @param   {Object} data    Dados que serão atualizados
         * @returns {Array}
    */
    update,


    /**
        * Função destinada a deletar dados do firebase
        * 
        * @param   {String} user    Usuário a ser requeridos os dados 
        * @param   {String} kind    Coleção a ser pesquisada
        * @param   {Object} id      id do documento a ser deletado
        * @returns {Array}
   */
    delete: (user, kind, id) => {
        const _delete = doc(db, `psicodevlicos`, user, kind, id)
        return deleteDoc(_delete).then(resp => {
            return { ...resp }
        });
    }
}

//TODO LIST:
// 1 - função de delete - ok
// 2 - listagem de pacientes - ok
// 3 - middleware user - loading
// 4 - Juntar info de pacientes nos agendamentos - 

export default crud;