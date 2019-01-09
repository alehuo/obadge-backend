import * as Knex from "knex";
import * as path from "path";
const knexfile = require(path.resolve(__dirname, "..", "knexfile"));

export default function connect(): Knex {
  if (process.env.NODE_ENV === undefined) {
    throw new Error("NODE_ENV is not defined!");
  }
  const knexConfig = knexfile[process.env.NODE_ENV];
  console.log("KNEX config", knexConfig);
  // @ts-ignore
  return Knex(knexConfig);
}
