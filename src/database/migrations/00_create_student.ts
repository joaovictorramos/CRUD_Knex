import { Knex } from 'knex'

export async function up(knex: Knex){
    await knex.schema.createTable('student', table =>{
        table.increments('id').primary().defaultTo(knex.raw('UUID()'));
        table.string('name', 55).notNullable();
        table.string('registration', 5).notNullable();
    })
}

export async function down(knex: Knex){
    await knex.schema.dropTable('student')
}