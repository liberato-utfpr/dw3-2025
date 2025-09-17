// Importamos o Model para que o Controller possa interagir com ele.
import { ContatoModel } from '../models/contato.model.js';

export class ContatoController {

  constructor() {
    this.contatoModel = new ContatoModel();
  }

  // Método para lidar com a busca de todos os contatos
  async findAll(request, reply) {
    try {
      const contatos = await this.contatoModel.findAll();
      return reply.status(200).send(contatos);
    } catch (error) {
      // Tratamento de erro genérico
      console.error(error);
      return reply.status(500).send({ message: 'Erro interno no servidor.' });
    }
  }

  // Método para lidar com a busca de um usuário por ID
  async findById(request, reply) {
    try {
      const { id } = request.params;
      const contato = await this.contatoModel.findById(id);

      if (!contato) {
        return reply.status(404).send({ message: 'Usuário não encontrado.' });
      }

      return reply.status(200).send(contato);
    
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: 'Erro interno no servidor.' });
    }
  }

  // Método para lidar com a criação de um novo contato
  async create(request, reply) {
    try {
      const { nome, email, telefone } = request.body;

      // Validação básica de entrada no controller
      if (!nome || !email || !telefone) {
        return reply.status(400).send({ message: 'Nome e email são obrigatórios.' });
      }

      // Delega a criação e as regras de negócio para o Model
      const newContato = await this.contatoModel.create({ nome, email, telefone });

      return reply.status(201).send(newContato);
    } catch (error) {
      // Captura os erros de negócio lançados pelo Model
      if (error.message.includes('e-mail já está em uso') || error.message.includes('inválido')) {
        // Retorna um erro 400 (Bad Request) para erros de validação
        return reply.status(400).send({ message: error.message });
      }

      // Se for outro tipo de erro, trata como um erro genérico
      console.error(error);
      return reply.status(500).send({ message: 'Erro interno no servidor.' });
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;
      const { nome, email, telefone } = request.body;

      // Validação básica de entrada no controller
      if (!nome || !email || !telefone) {
        return reply.status(400).send({ message: 'Nome, email e telefone são obrigatórios.' });
      }

      const updatedContato = await this.contatoModel.update(id, { nome, email, telefone });

      return reply.status(200).send(updatedContato);
    } catch (error) {
      if (error.message === 'Contato não encontrado.') {
        return reply.status(404).send({ message: error.message });
      }
      if (error.message.includes('e-mail já está em uso') || error.message.includes('inválido')) {
        return reply.status(400).send({ message: error.message });
      }

      console.error(error);
      return reply.status(500).send({ message: 'Erro interno no servidor.' });
    }

  }

  async delete(request, reply) {
    try {
      const { id } = request.params;
      await this.contatoModel.delete(id);

      // Status 204 (No Content) é a resposta padrão para uma exclusão bem-sucedida.
      return reply.status(204).send();
      
    } catch (error) {
      if (error.message === 'Contato não encontrado.') {
        return reply.status(404).send({ message: error.message });
      }

      console.error(error);
      return reply.status(500).send({ message: 'Erro interno no servidor.' });
    }

  }
}