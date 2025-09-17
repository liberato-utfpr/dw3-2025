import { ContatoRepository } from "./contato.repository.js";


export class ContatoService {
  constructor() {
    this.contatoRepository = new ContatoRepository();
  }

  async findAll() {
    console.log('ContatoService.findAll chamado');
    return this.contatoRepository.findAll();
  }

  async findById(id) {
    return this.contatoRepository.findById(id);
  }

  async create(contatoData) {
    
    // --- Início da Regra de Negócio ---

    // 1. Validação de formato do e-mail
    if (!contatoData.email || !contatoData.email.includes('@')) {
      throw new Error('Formato de e-mail inválido.');
    }

    // 2. Verificar se o e-mail já existe (agora iterando sobre os dados em memória)
    const existingContato = await this.contatoRepository.findByEmail(contatoData.email);
    
    if (existingContato) {
      throw new Error('Este e-mail já está em uso.');
    }
    // --- Fim da regra de Negócio ---

    // Delega a criação para o Model (Acesso a Dados)
    return this.contatoRepository.create(contatoData);
  }

  async update(id, contatoData) {
    const contatoIndex = await this.contatoRepository.findIndex(id);
    if (contatoIndex === -1) {
      throw new Error('Contato não encontrado.');
    }

    return this.contatoRepository.update(id, contatoData);
  }

  async delete(id) {
    const contatoIndex = await this.contatoRepository.findIndex(id);
    if (contatoIndex === -1) {
      throw new Error('Contato não encontrado.');
    }

    return this.contatoRepository.delete(id);
  }

  

}