// MIGRATIONS: Histórico ou controle de versão do banco de dados

import Knex from 'knex'; // Knex com k maiusculo porque queremos nos referenciar ao tipo do knex e usarmos o knex com typescript

// UP Realizar as alterações no banco
export async function up(knex: Knex) { //knex: Knex, falamos que a variável é uma instância do knex
    //  Parâmetros:
    //  - nome da tabela
    //  - funçaõ que recebe como parâmetro a referencia para a tabela (para poder criar os campos)

    return knex.schema.createTable('points', table => {
        table.increments('id').primary(); // chave primária
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // sempre tem 2 caracteres
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('points');

}
// DOWN: desfazer o que o UP fez (se up criou tabela, down remove tabela)