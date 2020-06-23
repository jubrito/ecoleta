import express from 'express'; 
import routes from './routes'; //arquivo da aplicação na mesma pasta do server (./)
import path from 'path';

const app = express();

app.use(express.json()); 
app.use(routes);

// STATIC: funcao para servir arquivos estaticos (downloads de imagem, pdf, word)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);


