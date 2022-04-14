const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', (req, res) => {
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
  console.log("OLHA O TESTEEEEEEEEEE")
  return {nothing:true}
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
  