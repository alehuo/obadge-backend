exports.up = function (knex, Promise) {
    return knex.schema.createTable('badgeImages', function (t) {
        t.increments('id').unsigned().primary();
        t.string('imageType').notNull();
        t.blob('imageData').notNull();
        t.integer('badgeId').references('id').inTable('badges');
    });
};

exports.down = function (knex, Promise) {
    if (process.env.NODE_ENV == 'production') {
        throw "Can't drop anything on production environment.";
    }
    return knex.schema.dropTable('badgeImages');
};