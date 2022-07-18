const firebaseApp = initializeApp({ // TODO -> passar isso para uma variável de ambiente
    apiKey: "AIzaSyC7QyTu5CxHDDNS0zkILZNJIytF4LfFD8Y",
    authDomain: "psicodevelicos.firebaseapp.com",
    projectId: "psicodevelicos",
    storageBucket: "psicodevelicos.appspot.com",
    messagingSenderId: "318941583719",
    appId: "1:318941583719:web:0ee31d87c17a4e42c4f7c2",
    measurementId: "G-JYSNCPGLKL"
});

const db = getFirestore(firebaseApp);

/**
    * Função destinada a pegar dados de uma coleção a partir do ID
    * 
    * @param   {String} entity    Nome da entitade a ser pesquisada
    * @returns {Array} Entidades filtradas do banco de dados
*/
function getById(entity){ // filtro do bando
    const citiesCol = collection(db, entity);
    return getDocs(citiesCol).then(resp => {
        const returnList = resp.docs.map(doc => doc.data());
        return returnList;
    });
}

/**
    * Função destinada a pegar dados de uma coleção a partir do ID
    * 
    * @param   {String} user    Usuário a ser pesquisado no firestore
    * @param   {Object} kind    Nome do Kind para fazer a listagem
    * @returns {Array} Entidades Presentes no Kind informado
*/
function getAll(user, kind){
    const postCol = collection(db, `psicodevlicos/${user}/${kind}`);
    return getDocs(postCol).then(resp => {
        const returnList = resp.docs.map(doc => { return { id: doc.id, ...doc.data() } });
        return returnList;
    });
}

/**
    * Função destinada a atualizar informações no banco de dados
    * 
    * @param   {String} user    Usuário a ser pesquisado no firestore
    * @param   {Object} kind    Nome do Kind para fazer a listagem
    * @returns {Array} Entidades salvas no banco de dados
*/
function upcreate(data){
    const {user, kind, params} = data;

    if (params.id) {
        return update(user, kind, params.id, params);
    }
    return post(user, kind, params);
}

/**
    * Função destinada a remover informações no banco de dados
    * 
    * @param   {String} user    Usuário a ser pesquisado no firestore
    * @param   {Object} kind    Nome do Kind que terá o item removido
    * @param   {String} id    Nome do id que terá
    * @returns {Boolean} Booleano:   True == Sucesso, False == Erro
*/
function remove(user, kind, id){
    const removeItem = doc(db, `psicodevlicos`, user, kind, id)
    return removeDoc(removeItem).then(resp => {
        return { ...resp }
    });
}

/**
    * Função destinada a enviar informações ao banco de dados
    * 
    * @param   {String} user    Usuário a ser pesquisado no firestore
    * @param   {Object} kind    Nome do Kind em que a informação será inserida|
    * @param   {Object} data    Dados para serem inseridos
    * @returns {Array} Dados salvos no banco de dados
*/
function post(user, kind, data) {
    const _post = collection(db, `psicodevlicos/${user}/${kind}`)
    return addDoc(_post, data).then(resp => {
        return { ...data, id: resp.id }
    })
}

/**
    * Função destinada a atualizar informações no banco de dados
    * 
    * @param   {String} user    Usuário a ser pesquisado no firestore
    * @param   {Object} kind    Nome do Kind para fazer a listagem
    * @returns {Array} Entidades filtradas do banco de dados
*/
function update(user, kind, id, data){
    const _post = doc(db, `psicodevlicos`, user, kind, id)
    return setDoc(_post, data)
}

export default {
    getById,
    getAll,
    upcreate,
    remove
}