import { ContatoController } from "../controllers/contato.controller.js";


const contatoController = new ContatoController();

export async function contatoRoutes(app){
  
  app.get('/', (request, reply) => contatoController.findAll(request, reply));
  app.get('/:id', (request, reply) => contatoController.findById(request, reply));
  app.post('/', (request, reply) => contatoController.create(request, reply));
  app.put('/:id', (request, reply) => contatoController.update(request, reply));
  app.delete('/:id', (request, reply) => contatoController.delete(request, reply));
}
