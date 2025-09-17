import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

// O Pool gerencia múltiplas conexões com o banco de forma eficiente.
const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default dbPool;