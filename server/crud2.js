
/**
    * Função destinada a pegar dados de uma coleção a partir do ID
    * 
    * @param   {String} entity    Nome da entitade a ser pesquisada
    * @param   {Object} filter    ???
    * @returns {Array} Entidades filtradas do banco de dados
*/
function getById(entity, filter){ // filtro do bando
    const citiesCol = collection(db, entity);
    return getDocs(citiesCol).then(resp => {
        const returnList = resp.docs.map(doc => doc.data());
        return returnList;
    });
}

/**
    * Função destinada a pegar dados de uma coleção a partir do ID
    * 
    * @param   {String} entity    Nome da entitade a ser pesquisada
    * @param   {Object} filter    ???
    * @returns {Array} Entidades filtradas do banco de dados
*/
function getAll(user, kind){
    const postCol = collection(db, `psicodevlicos/${user}/${kind}`);
    return getDocs(postCol).then(resp => {
        const returnList = resp.docs.map(doc => { return { id: doc.id, ...doc.data() } });
        return returnList;
    });
}

function upcreate(data){
    const {user, kind, params} = data;

    if (params.id) {
        return update(user, kind, params.id, params);
    }
    return post(user, kind, params);
}

function remove(user, kind, id){
    const removeItem = doc(db, `psicodevlicos`, user, kind, id)
    return removeDoc(removeItem).then(resp => {
        return { ...resp }
    });
}

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

export default {
    getById,
    getAll,
    upcreate,
    remove
}