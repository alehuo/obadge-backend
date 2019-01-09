import Knex from "knex";
import * as path from "path";
const knexfile = require(path.resolve(__dirname, "..", "knexfile"));

export function connect(): Knex {
  if (process.env.NODE_ENV === undefined) {
    throw new Error("NODE_ENV is not defined!");
  }
  const knexConfig = knexfile[process.env.NODE_ENV];
  // @ts-ignore
  return Knex(knexConfig);
}
