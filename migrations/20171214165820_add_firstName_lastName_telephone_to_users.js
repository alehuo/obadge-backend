exports.up = function (knex, Promise) {
    return knex.schema.table('users', function (t) {
        t.string('firstName');
        t.string('lastName');
        t.string('telephone');
    });
};

exports.down = function (knex, Promise) {
    if (process.env.NODE_ENV == 'production') {
        throw "Can't drop anything on production environment.";
    }
    return knex.schema.table('users', function (t) {
        t.dropColumn('firstName');
        t.dropColumn('lastName');
        t.dropColumn('telephone');
    });
};