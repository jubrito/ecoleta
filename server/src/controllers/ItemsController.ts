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
                // Para rodarmos na nossa máquina
                // image_url: `http://localhost:3333/uploads/${item.image}`,
                // Para rodarmos no Expo (Mobile), pegamos o link gerado no localhost:19002 do expo (exp://192.168.15.15:19000)
                image_url: `http://192.168.15.15:3333/uploads/${item.image}`,
            };
        });
    
        return response.json(serializedItems);
    }
}

export default ItemsController;