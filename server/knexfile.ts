// Configurações que a conexão com o banco não tem + (arquivo conection + Migrações) 

import path from 'path';
// mesmo sendo um arquivo TypeScript, o knex não suporta o export default
module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
};