import { Knex } from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('student_course', table =>{
        table.increments('id').primary();
        table.string('student_id').notNullable().references('id').inTable('student');
        table.string('course_id').notNullable().references('id').inTable('course');
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('student_course')
}