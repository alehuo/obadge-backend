import cookieParser from "cookie-parser";
import cors from "cors";
import Express from "express";
import bearerToken = require("express-bearer-token");
import session from "express-session";
import authController from "./controller/AuthController";
import badgeController from "./controller/BadgeController";
import defaultController from "./controller/DefaultController";
import userController from "./controller/UserController";

const app = Express();

// CORS
app.use(cors());

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// Knex session store
const store = require("connect-session-knex")(session);

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new store(),
  }),
);

// Use cookie parser middleware
app.use(cookieParser(process.env.COOKIE_SECRET));

// Bearer token
app.use(bearerToken());

app.use("/", defaultController);
app.use("/api/users", userController);
app.use("/api/badges", badgeController);
app.use("/api/authentication", authController);

export default app;
