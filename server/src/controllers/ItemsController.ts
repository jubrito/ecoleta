import knex from '../database/connection'; // importar a conexão com o banco de dados

import { Request, Response } from 'express';

class ItemsController {

    /* ~ Listar Itens ~ */
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*'); // SELECT * FROM items
    
        // SERIALIZAÇÃO: transformar os dados em um formato mais acessível para quem está requisitando as informações (front-end, cliente)
        const serializedItems = items.map(item => {
            // MAP: percorre os itens e retorna da maneira que você quiser
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            };
        });
    
        return response.json(serializedItems);
    }
}

export default ItemsController;