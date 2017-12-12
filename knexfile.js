module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: "./database.sqlite"
        }
    },
    production: {
        client: 'pgsql'
    }
}