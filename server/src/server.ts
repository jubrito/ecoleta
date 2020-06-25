import express from 'express'; 
import cors from 'cors';
import routes from './routes'; //arquivo da aplicação na mesma pasta do server (./)
import path from 'path';

const app = express();

// CORS: Define na API quais endereços externos (URL web) vão ter acesso a aplicação.
/* Em ambiente de produção, seria cors({
    // especificar o dominio
    origin: 'www.'
}) 
   Em ambiente de desenvolvimento, permite que todas as URL acessem: */
app.use(cors());
app.use(express.json()); 
app.use(routes);

// STATIC: funcao para servir arquivos estaticos (downloads de imagem, pdf, word)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);


