// Importa a função para gerar UUIDs aleatórios
import { randomUUID } from 'node:crypto';
// Importa o pool de conexões com o banco de dados
import dbPool from '../../infra/database.js'; // Importamos nosso pool de conexão


// Classe responsável por acessar e manipular os dados da tabela de contatos no banco de dados
export class ContatoRepository {
  
  // O construtor recebe o pool de conexões e armazena na instância
  constructor() {
    this.db = dbPool;
  }

  // Retorna todos os contatos ordenados por nome
  async findAll() {
    const result = await this.db.query('SELECT * FROM contatos ORDER BY nome ASC');
    return result.rows;
  }

  // Busca um contato pelo id
  async findById(id) {
    const result = await this.db.query('SELECT * FROM contatos WHERE id = $1', [id]);
    // Se não encontrar, retorna null
    return result.rows[0] || null;
  }

  // Cria um novo contato no banco de dados
  async create(contatoData) {
    console.log('ContatoRepository.create chamado com:', contatoData); // Log para depuração
    const { nome, email, telefone } = contatoData;
    // Gera um id único para o novo contato
    const id = randomUUID();
    
    // Monta a query SQL para inserir o contato
    const sql = 'INSERT INTO contatos (id, nome, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [id, nome, email, telefone];
    
    // Executa a query e retorna o contato criado
    const result = await this.db.query(sql, values);
    return result.rows[0];
  }

  // Atualiza um contato existente pelo id
  async update(id, contatoData) {
    const { nome, email, telefone } = contatoData;

    // Monta a query SQL para atualizar o contato
    const sql = 'UPDATE contatos SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *';
    const values = [nome, email, telefone, id];

    // Executa a query e retorna o contato atualizado (ou null se não existir)
    const result = await this.db.query(sql, values);
    return result.rows[0] || null;
  }

  // Remove um contato pelo id
  async remove(id) {
    // O .query retorna um objeto de resultado. rowCount informa quantas linhas foram afetadas.
    const result = await this.db.query('DELETE FROM contatos WHERE id = $1', [id]);
    // Retorna true se algum contato foi removido, false caso contrário
    return result.rowCount > 0;
  }

  // Busca um contato pelo email
  async findByEmail(email) {
    const result = await this.db.query('SELECT * FROM contatos WHERE email = $1', [email]);
    // Retorna o contato encontrado ou null
    return result.rows[0] || null;
  }
}