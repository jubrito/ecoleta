// UPLOAD DE IMAGENS

import multer from 'multer';
import path from 'path';
import crypto from 'crypto'; // hash aleatório de dados para criar um arquivo unico, poderiamos usar tbm o timestamp

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), // DESTINATION: onde vão os arquivos que o usuário fez upload
        /* FILENAME: função (pode ser arrow function mas funcionaria como filename(){}) 
            Gera o nome do arquivo único (se usassemos o nome do arquivo enviado pelo usuário, poderiamos ter duplicatas etc)
            - request: recebe as informações da requisição do front-end (igual aos do controller) 
            - file: dados do arquivo
            - callback: função que chamamos quando terminamos de processar o filename (nome que damos pro arquivo)*/
        filename: (request, file, callback) => {
            const hash = crypto.randomBytes(6).toString('hex'); // gera um hash aleatório de 6 bytes e converte em string hexadecimal
            
            const fileName = `${hash}-${file.originalname}`;// nome único que damos para o arquivo

            callback(null, fileName); // passamos erro como nulo pq nao tem chances de dar erro
        } 
    })
};