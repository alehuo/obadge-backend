module.exports = {
    test: {
        client: 'sqlite3',
        connection: {
            filename: "./test-database.sqlite"
        },
        useNullAsDefault: false
    },
    development: {
        client: 'sqlite3',
        connection: {
            filename: "./database.sqlite"
        },
        useNullAsDefault: false
    },
    production: {
        client: 'pgsql'
    }
}