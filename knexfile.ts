import path from 'path'

module.exports = {
    client: 'pg',
    connection: {
        host : 'localhost',
        user : 'postgres',
        password : 'root',
        database : 'crud_knex'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true
}
