import crud from './Crud/crud'
const express = require('express');
const cors = require('cors')
const router = express();

const port = 8000;
router.use(express.json());
router.use(cors());

router.get('/teste', (req, res) => {
    res.json({ titulo: 'teste' }) 
})

router.get('/get', (req, res) => {
    let data = req.query;
    let filter = data.filter;
    crud.get(data.collection, {}).then((resp)=>{
        res.json(resp)
    }).catch(err=>res.status(400).json({err:true}))
})

router.get('/get_by_id', (req, res) => {
    let data = req.query;
    crud.get(data.collection, {}).then((resp)=>{
        res.json(resp)
    }).catch(err=>res.status(400).json({err:true}))
})

router.post('/post', (req,res)=>{
    let data = req.body;
    crud.post(data.collection, data).then((resp)=>{
        res.json(resp)
    }).catch(err=>res.status(400).json({err:true}))
})

router.listen(port, () => {
    console.log("servidor rodando na porta 8000 !! ")
})