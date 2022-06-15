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
    const user = data.user;
    const kind = data.kind

    crud.getAll(user, kind).then((resp)=>{
        res.json(resp)
    }).catch(err=>res.status(400).json({err:true}))
})

router.post('/upcreate', (req, res)=>{
    const data = req.body;
    crud.upcreate(data).then((resp)=>{
        res.json(resp);
    }).catch((err)=>res.status(400).json({err:err}))
})

router.post('/delete', (req,res)=>{
    const data = req.body;
    crud.delete(data.user, data.kind, data.id).then((resp)=>{
        res.json(resp)
    }).catch(err=>res.status(400).json({err:err}))
})

router.listen(port, () => {
    console.log("servidor rodando na porta 8000 !! ") 
})