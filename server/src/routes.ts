import express from 'express';
import multer from 'multer'; // biblioteca de upload
import multerConfig from './config/multer'; // configuração da biblioteca de upload


import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router(); // desacoplar as rotas do arquivo principal (ao inves de app.get, usar routes.get)

const upload = multer(multerConfig); 

const pointsController = new PointsController();
const itemsController = new ItemsController();

/* Listar Itens */
routes.get('/items', itemsController.index);


/* Listar Pontos de Coleta (Filtro por Estado/Cidade/items) */
routes.get('/points', pointsController.index);      // query param

/* Listar Ponto de Coleta específico */
routes.get('/points/:id', pointsController.show);   // request param

/* UPLOAD DE IMAGENS
 Antes de chamar o método create do controller, passamos o upload.single() ou seja recebemos um único arquivo*/

/* Criar Pontos de Coleta */
routes.post('/points', upload.single('image'), pointsController.create);    // request body

/* DESACOPLAMENTO (Patterns)
    Controllers: abstrair o conteúdo dentro de rotas. Um controller para cada entidade/recurso
        - INDEX: listagem 
        - SHOW: exibir um único registro
        - CREATE, UPDATE, DELETE 

    Melhorias:
    - Service Pattern: Abstrair lógica dentro dos Controllers
    - Repository Patter (Data Mapper): Abstrair lógica do banco de dados
*/

export default routes;