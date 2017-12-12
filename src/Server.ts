import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { Router } from 'express';
import Controller from './interface/Controller';
import defaultController from './controller/DefaultController';
import userController from './controller/UserController';

export default class Server {

    private app: Express.Application;

    constructor(serverPort: number) {
        this.app = Express();

        this.initRoutes();
        this.middleware();

        this.app.listen(serverPort, (cb: any) => {
            console.log('Listening on %d', serverPort);
        });
    }

    private initRoutes() {
        this.app.use('/', defaultController);
        this.app.use('/users', userController);
    }

    private middleware() {
        // Body parser
        this.app.use(bodyParser.json());

        // Use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // Use cookie parser middleware
        this.app.use(cookieParser("SECRET_GOES_HERE"));
    }
}