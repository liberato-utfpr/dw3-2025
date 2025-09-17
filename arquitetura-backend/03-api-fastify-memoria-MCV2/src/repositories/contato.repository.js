// Não precisamos mais de uma conexão com banco de dados externo.
import { randomUUID } from 'node:crypto';


// A classe ContatoRepository funciona como um "Service Object" ou um "Manager". É um agrupamento lógico de funções que operam na coleção de usuários.
  
export class ContatoRepository {
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

    const contatoId = randomUUID();
    const newContato = {
      id: contatoId,
      nome,
      telefone,
      email,      
    };

    // "Insere" o novo contato no nosso Array.
    this.#contatos.push(newContato);

    return newContato;
  }

  async update(id, contatoData) {
    const contatoIndex = await this.findIndex(id);    
    this.#contatos[contatoIndex] = { id, ...contatoData };
    return this.#contatos[contatoIndex];
  }

  async delete(id) {
    const contatoIndex = await this.findIndex(id);

    // Remove o contato do Array
    const deletedContato = this.#contatos.splice(contatoIndex, 1);
    return deletedContato;
  }

  async findByEmail(email) {
    // Busca o contato pelo e-mail no Array.
    const contato = await this.#contatos.find(contato => contato.email === email);
    
    if (!contato) {      
      return null;
    }
    return contato;
  }

  async findIndex(id) {
    return this.#contatos.findIndex(contato => contato.id === id);
  }

}
