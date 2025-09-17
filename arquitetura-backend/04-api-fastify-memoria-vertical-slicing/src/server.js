import fastify from "fastify";
import { contatoRoutes } from "./modules/contato/contato.route.js";

const server = fastify();
const port = 3000;

server.register(contatoRoutes, { prefix: "/contatos" });

server.listen({ port }).then((error) => {
  if (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1)
  }
  console.log("HTTP server running on port", port);  
});
