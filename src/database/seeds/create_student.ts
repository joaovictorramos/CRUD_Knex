import { Knex } from 'knex'

export async function seed(knex: Knex){
    await knex('student').insert([
        { name: 'João Ramos', registration: '200' }
    ])
}