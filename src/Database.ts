import * as Promise from 'bluebird';
import * as Knex from 'knex';
const knexfile = require('./../knexfile');

export default function connect(): Knex {
    if (process.env.NODE_ENV === undefined) {
        throw new Error('NODE_ENV is not defined!');
    }
    const knexConfig = knexfile[process.env.NODE_ENV!];
    return Knex(knexConfig);
}