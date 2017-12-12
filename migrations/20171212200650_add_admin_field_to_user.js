
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.integer('admin').notNull().defaultTo(0);
    });
};

exports.down = function(knex, Promise) {
    if (process.env.NODE_ENV == 'production') {
        throw "Can't drop anything on production environment.";
    }
    return knex.schema.table('users', function(t) {
        t.dropColumn('admin');
    });
};