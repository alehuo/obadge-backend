import cookieParser from "cookie-parser";
import cors from "cors";
import Express from "express";
import bearerToken = require("express-bearer-token");
import session from "express-session";
import authController from "./controller/AuthController";
import badgeController from "./controller/BadgeController";
import defaultController from "./controller/DefaultController";
import userController from "./controller/UserController";

/**
 * Server.
 */
export default class Server {
  /**
   * Express application instance.
   */
  public app: Express.Application;

  constructor(private readonly serverPort: number) {
    this.app = Express();

    // Initialize middlewares
    this.middleware();

    // Initialize routes
    this.initRoutes();
  }

  public start() {
    this.app.listen(this.serverPort, (cb) => {
      console.log("Listening on %d", this.serverPort);
    });
  }

  /**
   * Initializes the application's routes.
   */
  private initRoutes() {
    this.app.use("/", defaultController);
    this.app.use("/api/users", userController);
    this.app.use("/api/badges", badgeController);
    this.app.use("/api/authentication", authController);
  }

  private middleware() {
    // CORS
    this.app.use(cors());

    this.app.use(Express.json());
    this.app.use(Express.urlencoded({ extended: true }));

    // Knex session store
    const store = require("connect-session-knex")(session);

    // Session
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        store: new store(),
      }),
    );

    // Use cookie parser middleware
    this.app.use(cookieParser(process.env.COOKIE_SECRET));

    // Bearer token
    this.app.use(bearerToken());
  }
}
