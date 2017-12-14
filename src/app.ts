import Server from "./Server";

let port: number = 8080;

if (process.env.PORT != undefined) {
    port = parseInt(process.env.PORT);
}

let app: Server = new Server(port);