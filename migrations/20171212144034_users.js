exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (t) {
        t.increments('id').unsigned().primary();
        t.string('email').notNull().unique();
        t.string('password').notNull();
    });
};

exports.down = function (knex, Promise) {
    if (process.env.NODE_ENV == 'production') {
        throw "Can't drop anything on production environment.";
    }
    return knex.schema.dropTable('users');
};