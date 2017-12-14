import * as dotenv from "dotenv";
dotenv.config();

import Server from "./Server";

let port: number = 8080;

if (process.env.PORT != undefined) {
    port = parseInt(process.env.PORT);
}

if(process.env.NODE_ENV == undefined) {
    throw "Please define NODE_ENV before running the start command.";
}

let app: Server = new Server(port);