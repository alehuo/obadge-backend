
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('email').notNull().unique();
        t.dateTime('password').notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
