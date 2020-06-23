import knex from 'knex';
import path from 'path'; // para unir caminhos de acordo com seu OS

/* -----------------------[ CONEXÃO COM O BANDO DE DADOS ]-------------------------
    objeto com as configurações do nosso bd
    arquivo que iremos armazenar o arquivo do bd
    __dirname: caminho pro diretorio do arquivo que ta executando ele */

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;