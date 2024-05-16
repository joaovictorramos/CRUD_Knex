import { Knex } from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('course', table =>{
        table.increments('id').primary();
        table.string('name', 55).notNullable();
        table.string('description', 255);
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('course')
}