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
import badgeController from './controller/BadgeController';
import connect from './Database';
import { AuthMiddleware } from './service/AuthService';
import bearerToken = require('express-bearer-token');

/**
 * Server.
 */
export default class Server {

    /**
     * Express application instance.
     */
    app: Express.Application;

    constructor(serverPort: number) {
        this.app = Express();

        // Initialize middlewares
        this.middleware();

        // Initialize routes
        this.initRoutes();

        this.app.listen(serverPort, (cb: any) => {
            console.log('Listening on %d', serverPort);
        });
    }

    /**
     * Initializes the application's routes.
     */
    private initRoutes() {
        this.app.use('/', defaultController);
        this.app.use('/api/users', userController);
        this.app.use('/api/badges', badgeController);
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

        // Knex session store
        var store = require('connect-session-knex')(session);

        // Session
        this.app.use(session({
            secret: process.env.SESSION_SECRET,
            store: new store
        }));

        // Use cookie parser middleware
        this.app.use(cookieParser(process.env.COOKIE_SECRET));

        // Bearer token
        this.app.use(bearerToken());
    }
}