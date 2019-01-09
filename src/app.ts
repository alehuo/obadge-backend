import dotenv from "dotenv";
dotenv.config();

import Server from "./Server";

const port = Number(process.env.PORT || 8080);

if (!process.env.NODE_ENV) {
  throw "Please define NODE_ENV before running the start command.";
}
new Server(port);
