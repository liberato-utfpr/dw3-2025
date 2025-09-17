import fastify from "fastify";
import { contatoRoutes } from "./modules/contato/contato.route.js";

const server = fastify();
const port = 3001;

server.register(contatoRoutes, { prefix: "/contatos" });

// server.listen({ port }).then((error) => {
//   if (error) {
//     console.error("Erro ao iniciar o servidor:", error);
//     // process.exit(1)
//   }
//   console.log("HTTP server running on port", port);  
// });


const start = async () => {
  try {
    // Escuta em todas as interfaces de rede (bom para desenvolvimento e contêineres)
    // ou use '127.0.0.1' para escutar apenas localmente
    console.log("HTTP server running on port", port);
    await server.listen({ port: 3001, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();