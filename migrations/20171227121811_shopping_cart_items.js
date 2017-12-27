exports.up = function (knex, Promise) {
    return knex.schema.createTable('shoppingCartItem', function (t) {
        t.increments('id').unsigned().primary();
        t.integer('userId').references('id').inTable('users');
        t.integer('badgeId').references('id').inTable('badges');
        t.integer('amount').default(1);
    });
};

exports.down = function (knex, Promise) {
    if (process.env.NODE_ENV == 'production') {
        throw "Can't drop anything on production environment.";
    }
    return knex.schema.dropTable('shoppingCartItem');
};