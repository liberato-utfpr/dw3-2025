// Não precisamos mais de uma conexão com banco de dados externo.
import { randomUUID } from 'node:crypto';


// A classe ContatoModel funciona como um "Service Object" ou um "Manager". É um agrupamento lógico de funções que operam na coleção de usuários.
  
export class ContatoModel {
  // Usamos um Array estático e privado para simular nosso banco de dados em memória.
  // Ele será compartilhado por todas as instâncias da classe.
  #contatos = new Array();

  // Método para buscar todos os contatos (Acesso a Dados)
  async findAll() {    
    return this.#contatos;
  }

  // Método para buscar um contato por ID (Acesso a Dados)
  async findById(id) {
    // Busca o contato pela chave (ID) no Array.
    const contato = this.#contatos.find(contato => contato.id === id);
    if (!contato) {
      return null;
    }
    return contato;
  }

  // Método para criar um novo contato (Lógica de Negócio + Acesso a Dados)
  async create(contatoData) {
    const { nome, email, telefone } = contatoData;

    // --- Início da Regra de Negócio (Misturada) ---

    // 1. Validação de formato do e-mail
    if (!email.includes('@')) {
      throw new Error('Formato de e-mail inválido.');
    }

    // 2. Verificar se o e-mail já existe (agora iterando sobre os dados em memória)
    const existingContato = this.#contatos.find(contato => contato.email === email);

    if (existingContato) {
      throw new Error('Este e-mail já está em uso.');
    }
    // --- Fim da regra de Negócio ---


    // --- Início do Acesso a Dados ---

    const contatoId = randomUUID();
    const newContato = {
      id: contatoId,
      nome,
      telefone,
      email,      
    };

    // "Insere" o novo contato no nosso Array.
    this.#contatos.push(newContato);

    // --- Fim do Acesso a Dados ---

    return newContato;
  }

  async update(id, contatoData) {
    const contatoIndex = this.#contatos.findIndex(contato => contato.id === id);
    if (contatoIndex === -1) {
      throw new Error('Contato não encontrado.');
    }

    // Atualiza os dados do contato
    this.#contatos[contatoIndex] = { id, ...contatoData };
    return this.#contatos[contatoIndex];
  }

  async delete(id) {
    const contatoIndex = this.#contatos.findIndex(contato => contato.id === id);
    if (contatoIndex === -1) {
      throw new Error('Contato não encontrado.');
    }

    // Remove o contato do Array
    const deletedContato = this.#contatos.splice(contatoIndex, 1);
    return deletedContato;
  }
}
