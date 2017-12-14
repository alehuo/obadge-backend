module.exports = {
    test: {
        client: 'sqlite3',
        connection: {
            filename: "./test-database.sqlite"
        }
    },
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