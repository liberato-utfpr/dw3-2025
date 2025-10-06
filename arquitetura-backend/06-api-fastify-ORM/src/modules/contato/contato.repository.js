import { randomUUID } from 'node:crypto';
import db from '../../infra/database.js'; // Importamos nosso pool de conexão

export class ContatoRepository {
  
  constructor() {
    this.db = db;
  }

  async findAll() {
    const result = await this.db.query('SELECT * FROM contatos ORDER BY nome ASC');
    return result.rows;
  }

  async findById(id) {
    const result = await this.db.query('SELECT * FROM contatos WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async findByEmail(email) {
    const result = await this.db.query('SELECT * FROM contatos WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  async create(contatoData) {
    const { nome, email, telefone } = contatoData;
    const id = randomUUID();
    
    const sql = 'INSERT INTO contatos (id, nome, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [id, nome, email, telefone];
    
    const result = await this.db.query(sql, values);
    return result.rows[0];
  }

  async update(id, contatoData) {
    const { nome, email, telefone } = contatoData;

    const sql = 'UPDATE contatos SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *';
    const values = [nome, email, telefone, id];

    const result = await this.db.query(sql, values);
    return result.rows[0] || null;
  }

  async remove(id) {
    // O .query retorna um objeto de resultado. rowCount informa quantas linhas foram afetadas.
    const result = await this.db.query('DELETE FROM contatos WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}