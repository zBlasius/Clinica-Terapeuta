import axios from  'axios'

export default axios.create({
    baseURL:'http://localhost:8000'
}) 

// ver como usar middle ware para pegar o USER antes de fazer a requisição