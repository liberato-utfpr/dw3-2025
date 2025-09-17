import { ContatoController } from "./contato.controller.js";


// 1. O arquivo de rotas importa todas as suas dependências.
import { ContatoRepository } from '../repositories/contato.repository.js';
import { ContatoService } from '../services/contato.service.js';
import { ContatoController } from '../controllers/contato.controller.js';

// 2. A "linha de montagem" para o módulo de contatos acontece aqui.
const contatoRepository = new ContatoRepository();
const contatoService = new ContatoService(contatoRepository);
const contatoController = new ContatoController(contatoService);

export async function contatoRoutes(app){
  
  app.get('/', (request, reply) => contatoController.findAll(request, reply));
  app.get('/:id', (request, reply) => contatoController.findById(request, reply));
  app.post('/', (request, reply) => contatoController.create(request, reply));
  app.put('/:id', (request, reply) => contatoController.update(request, reply));
  app.delete('/:id', (request, reply) => contatoController.delete(request, reply));
}
