import Knex from 'knex';

export async function up(knex: Knex) {

    /* CHAVE ESTRANGEIRA o campo point_id cria uma chave estrangeira na tabela points no campo id 
        (Todo point_id precisa ser um id valido na tabela points */

    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary(); // chave primária

        // CHAVE ESTRANGEIRA
        table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('points');

        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('point_items');
}
