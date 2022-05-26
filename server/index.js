import crud from './crud.js'
import express from 'express';
import cors from 'cors';
const router = express();

const port = 8000;
router.use(express.json());
router.use(cors());

router.get('/teste', (req, res) => {
    res.json({ titulo: 'teste' }) 
})

router.get('/get_all', (req, res) => { // -> https://firebase.google.com/docs/firestore/query-data/get-data
    const data = req.query;
    const filter = data.filter;
    crud.get(data.collection, {}).then((resp)=>{
        res.json(resp)
    }).catch(err=>res.status(400).json({err:true}))
})

router.get('/get_by_id', (req, res) => {
    const data = req.query;
    crud.getById(data.collection, {}).then((resp)=>{
        res.json(resp)
    }).catch(err=>res.status(400).json({err:true}))
})

router.post('/post', (req,res)=>{
    const data = req.body;
    const user = data.user;
    const kind = data.kind;
    const params = data.params
    
    crud.post(user, kind, params).then((resp)=>{
        res.json(resp)
    }).catch(err=>res.status(400).json({err:true}))
})

router.listen(port, () => {
    console.log("servidor rodando na porta 8000 !! ")
})