// const express = require('express')
import express from 'express'
import contatoRoutes from './routes/contato.route.js'


const server = express()
const port = 3000


server.use(express.json())
server.use('/contatos',contatoRoutes)




// server.get('/', (req, res) => {
//     res.send("API")
// })

server.listen(port, () => {
    console.log(`Servidor na porta ${port}`)
})
