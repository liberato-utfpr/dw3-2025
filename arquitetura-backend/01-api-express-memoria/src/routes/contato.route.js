import express from 'express'
import { getContatos, getContatoById, createContato, updateContato, deleteContato } from '../controller/contatoController.js'

const router = express.Router()

// Definir as rotas

router.get('/', getContatos)
router.get('/:id', getContatoById)
router.post('/', createContato)
router.put('/:id', updateContato)
router.delete('/:id', deleteContato)


export default router