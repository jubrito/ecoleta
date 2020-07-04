import { Request, Response } from 'express';
import knex from '../database/connection';

/* Como tiramos isso do arquivo de rotas Não temos mais a identificação do formato do request e do response 
Parameter 'request' has any tipe: precisamos informar manualmente (importamos Request e Response e informamos que request: Request (request é do tipo request) */
class PointsController {

    /* ~ Listar Pontos de Coleta (Filtro por Cidade/Estado/items) ~ */ 
    async index (request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim())); // trim: remove espaçamento
        // Quando recebemos no query, fazemos um cast pra confirmar o formato que estamos recebendo String(a), Number(b)


        // JOIN: Filtro pra retornar os pontos que coletam itens específicos (join na tabela point_itens que possui essa relação)
        // WHEREIN: que tem pelo menos um item_id que esta dentro dos itens que estou recebendo no filtro (parsedItems)
        // DISTINCT: se coletar todos os itens não vai aparecer duplicado
        // SELECT('points.*'): quero buscar apenas todos os dados da tabela points, não da tabela que fiz join

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*') 

        // SERIALIZAÇÃO para permitir que o mobile acesse a imagem com o caminho 
        const serializedPoints = points.map(point => {
            // MAP: percorre os points e retorna da maneira que você quiser
            return {
                ...point, // retornar todos os dados do ponto
                // image_url: `http://192.168.15.15:3333/uploads/${point.image}`, //adicionar o campo image_url com o endereço correto pro mobile que precisa disso já que nao consegue usar apenas o nome da imagem salva em uploads que é um nome com hash
                image_url: `http://192.168.15.51:3333/uploads/${point.image}`, //adicionar o campo image_url com o endereço correto pro mobile que precisa disso já que nao consegue usar apenas o nome da imagem salva em uploads que é um nome com hash
            };
        });

        return response.json(serializedPoints);
    }


    /* ~ Listar Ponto de Coleta específico ~*/
    async show (request: Request, response: Response) {
        // const id = request.params.id desestruturado vira const { id } = request.params
        const { id } = request.params; // id do ponto de coleta especifico que vai ser exibido

        // first: como sabemos que o id é unico, o first retornará o primeiro (único), ao inves de considerar point um array
        const point = await knex('points').where('id', id). first();
    
        if (!point) {
            return response.status(400).json({ message: 'Point not found.'}); // status code que começa com 4 significa erro
        }

        // SERIALIZAÇÃO para permitir que o mobile acesse a imagem com o caminho 
        const serializedPoint = {
            ...point, // retornar todos os dados do ponto
            // image_url: `http://192.168.15.15:3333/uploads/${point.image}`, //adicionar o campo image_url com o endereço correto pro mobile (igual ao feito no método index)
            image_url: `http://192.168.15.51:3333/uploads/${point.image}`, //adicionar o campo image_url com o endereço correto pro mobile (igual ao feito no método index)
        };

        // No mobile quando listarmos um ponto de coleta, precisamos dos itens que ele coleta
        
        /* ~ Listar todos os itens relacionados a esse ponto de coleta ~ 
            
            Join de items com point_items (tabela que relaciona item com ponto)
            com o id do item  igual ao id do point items
            aonde o point_id da tabela de relacao seja igual ao id recebido la em cima
        */
        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id' )
        .where('point_items.point_id', id)
        .select('items.title');

        return response.json({ point: serializedPoint, items }); // por causa da serialização agora retornamos point como sendo serializedPoint
    }

    /* ~ Criar Pontos de Coleta ~ */
    async create (request: Request, response: Response) {
        // DESESTRUTURAÇÃO: Ao invés de fazer "const data = request.body", como sabemos o formato do body podemos colocar cada campo em uma variavel, quer dizer o mesmo que "const name = request.body.name" para cada campo 
        // colocamos os items pois serão mostrados em "itens de coleta"
        const {
            name,
            email, 
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
        // items não é um campo da tabela points, será criado posteriormente
        
        // TRANSACTION: se acontecer um problema na segunda inserção, a primeira não deve executar, fazendo rollback da primeira query. Para isso substituimos knex por trx, (ou seja knex('points') vira trx('points')), mudar em ambas
        const trx = await knex.transaction(); 
    
        // SHORT SYNTAX: ao inves de fazer email: email, como o nome da variavel é igual ao nome da propriedade do objeto, podemos omitir
        // retorna os ids dos dados inseridos
        // (1.) INSERÇÃO DOS PONTOS
        const point = {
            // image: request.file.filename, // pegamos o arquivo recebido no upload pelo multer
            image: request.file.filename, // pegamos o arquivo recebido no upload pelo multer
            name,
            email, 
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const insertedIds = await trx('points').insert(point);
    
        /* RELACIONAMENTO COM A TABELA DE ITENS ------------------
            items é um array de numeros equivalente a cada item
            item_id virou (item_id: number) pq o typescript reclamou que o item_id nao tinha tipo pre definido 
            
            Ao invés de apenas "const pointItems = items.map((item_id: number )=> {"
            agora que convertemos a criaçãod o ponto no insomnia de JSON para Multipart para aceitar arquivos,
            fazemos um split e um map+trim para remover virgulas e espaços 
            ao inves de Number na hora de converter pra numero poderia ser parseInt ou apenas colocarmos
            (item: string )=> +item.trim()) tbm converteria pra numero*/
        const point_id = insertedIds[0];
        const pointItems = items
            .split(',')
            .map((item: string )=> Number(item.trim()))
            .map((item_id: number )=> {
            return {
                item_id,
                point_id,
            };
        })
    
        // (2.) INSERÇÃO NA TABELA DE RELAÇÃO ENTRE POINTS E ITENS
        await trx('point_items').insert(pointItems);
        //-----------------------
    
        await trx.commit(); // faz de fato os inserts na base de dados

        // SPREAD: com os ... você pega o conteúdo de um objeto (point) e retorna dentro de outro (o do return)
        // retorna dados do ponto de coleta criado e o id
        return response.json({
            id: point_id,
            ... point,
        });
    }
}

export default PointsController;