import {randomUUID} from "crypto"

import contatos from "../model/contatoModel.js";


function getContatos(req, res) {
    res.status(200).json(contatos)
}




function getContatoById(req, res) {

    // const id = req.params["id"]
    // const id = req.params.id
    const { id } = req.params

    // const contato = contatos.find((elemento)=>{
    //     if (elemento.id == id){
    //         return true
    //     } else {
    //         return false
    //     }
    // })

    const contato = contatos.find((elemento)=>elemento.id == id)

    if (!contato) {
        res.status(404).json({message:'Contato não encontrado'})
        return
    }

    res.status(200).json(contato)
}

function createContato(req, res) {
    // const nome = req.body.nome
    // const email = req.body.email
    // const telefone = req.body.telefone

    const { nome, email, telefone } = req.body

    contatos.push({
        id: randomUUID(),
        nome,
        email,
        telefone
    })
    res.status(201).json({message:'Contato criado com sucesso'})
}

function updateContato(req, res) {
    const { id } = req.params
    const { nome, email, telefone } = req.body

    const contato = contatos.find((elemento)=>elemento.id == id)

    if (!contato) {
        res.status(404).json({message:'Contato não encontrado'})
        return
    }

    contato.nome = nome
    contato.email = email
    contato.telefone = telefone

    res.status(200).json({message:'Contato atualizado com sucesso'})    
}

function deleteContato(req, res) {
    const { id } = req.params

    const index = contatos.findIndex((elemento)=>elemento.id == id)
    if (index === -1) {
        res.status(404).json({message:'Contato não encontrado'})
        return
    }
    contatos.splice(index, 1)
    res.status(200).json({message:'Contato deletado com sucesso'})
    

}


export {
    getContatos,
    getContatoById,
    createContato,
    updateContato,
    deleteContato
}