import knex from 'knex'

const connection = knex({
    client: 'pg',
    connection: {
        host : 'localhost',
        user : 'postgres',
        password : 'root',
        database : 'crud_knex'
    },
    useNullAsDefault: true
})

export default connection
