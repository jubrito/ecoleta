import express from 'express';

import multer from 'multer'; // biblioteca de upload
import multerConfig from './config/multer'; // configuração da biblioteca de upload
import { celebrate, Joi } from 'celebrate'; // validação dos campos

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

/* Criar Pontos de Coleta */
routes.post(
    '/points', 
    upload.single('image'), // UPLOAD DE IMAGENS: Antes de chamar o método create do controller, passamos o upload.single() ou seja recebemos um único arquivo
    /* MELHORIA: repassar essa parte pra um outro arquivo */
    celebrate({
        // validar tanto o REQUEST BODY: corpo da requisição (o que enviamos no POST de criação do ponto), os QUERY PARAMS da rota de Listagem de Pontos e os PARAMS que são os da rota (por exemplo na rota de Listar Ponto Específico o id em localhost.../points/9)
        /* Criação de pontos de coleta que agora enviamos através de Multipart (antes era JSON) */
        body: Joi.object().keys({
            name: Joi.string().required(), // string obrigatório
            email: Joi.string().required().email(), // string obrigatória em formato de email
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().regex(/^[\s,\d+!]+$/).required(), 
            /* REGEX: validação para receber numeros entre virgulas e espaços 
                / /: expressão regular
                ^: checa desde o inicio
                $: checa a partir do final
                \d: checa números
                +: o que vier imediatamente antes dele deve aparecer 1 ou mais vezes; o mesmo que {1,}
                ?: o que vier imediatamente antes dele deve aparecer 0 ou 1 vez na expressão.
                */
            //imagem não validamos pelo joi mas sim pelo file filter no multer
        })
    }, {
        abortEarly: false, // faz todas as validações ao mesmo tempo
    }),
    pointsController.create
);    // request body

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