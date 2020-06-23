import express from 'express';

const routes = express.Router(); // desacoplar as rotas do arquivo principal (ao inves de app.get, usar routes.get)

routes.get('/', (request, response) => {
    return response.json({message: 'Hello World'});
});

export default routes;