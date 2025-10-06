import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

// Definimos a tabela "contatos", espelhando a estrutura do nosso SQL
export const contatos = pgTable('contatos', {
  id: uuid('id').primaryKey(),
  nome: text('nome').notNull(),
  email: text('email').notNull().unique(),
  telefone: text('telefone'),
  cpf: text('cpf')
});

export const usuario = pgTable('usuario', {
  id: uuid('id').primaryKey(),
  nome: text('nome').notNull(),
  senha: text('senha').notNull(),  
});