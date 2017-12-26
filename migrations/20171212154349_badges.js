exports.up = function (knex, Promise) {
    return knex.schema.createTable('badges', function (t) {
        t.increments('id').unsigned().primary();
        t.string('title').notNull();
        t.string('description').notNull();
        t.integer('userId').references('id').inTable('users');
        t.decimal('pricePerUnit').default(1.00);
        t.integer('stock');
    });
};

exports.down = function (knex, Promise) {
    if (process.env.NODE_ENV == 'production') {
        throw "Can't drop anything on production environment.";
    }
    return knex.schema.dropTable('badges');
};