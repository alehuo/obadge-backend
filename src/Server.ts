import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as cors from 'cors';
import { Router } from 'express';
import Controller from './interface/Controller';
import defaultController from './controller/DefaultController';
import userController from './controller/UserController';
import authController from './controller/AuthController';
import connect from './Database';

export default class Server {

    app: Express.Application;

    constructor(serverPort: number) {
        this.app = Express();

        this.middleware();

        this.initRoutes();

        this.app.listen(serverPort, (cb: any) => {
            //console.log('Listening on %d', serverPort);
        });
    }

    private initRoutes() {
        this.app.use('/', defaultController);
        this.app.use('/api/users', userController);
        this.app.use('/api/authentication', authController);
    }

    private middleware() {
        // Body parser
        this.app.use(bodyParser.json());

        // CORS
        this.app.use(cors());

        // Use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        var store = require('connect-session-knex')(session);

        // Session
        this.app.use(session({
            secret: process.env.SESSION_SECRET,
            store: new store
        }));

        // Use cookie parser middleware
        this.app.use(cookieParser(process.env.COOKIE_SECRET));
    }
}