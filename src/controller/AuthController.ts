import { Router } from "express";
import UserDao from "../dao/UserDao";
import Controller from "../interface/Controller";
import Message from "../interface/Message";
import User from "../model/User";
import { generate, verify } from "./../service/AuthService";

/**
 * Authentication controller.
 */
class AuthController extends Controller {
  constructor(private userDao: UserDao) {
    super();
  }

  public routes(): Router {
    // Authentication endpoint
    this.router.post("/", async (req, res, next) => {
      const userData: UserAuthenticationData = req.body;
      try {
        const user: User = await this.userDao.findByEmailAndPassword(
          userData.email,
          userData.password,
        );
        let msg = {} as Message;
        if (user[0] === undefined) {
          res.status(401);
          msg = {
            success: false,
            message: "Authentication failure",
          };
        } else {
          res.status(200);

          const jwt = await generate(user);

          msg = {
            success: true,
            message: "Authentication successful",
            payload: {
              token: jwt,
            },
          };
          req.session.userId = user[0].id;
        }

        res.json(msg);
      } catch (err) {
        res.status(401);
        res.json({
          success: false,
          message: "Authentication failure",
        });
      }
    });

    // Returns user data if session is set and JWT is valid.
    this.router.get("/", async (req, res, next) => {
      let msg = {} as Message;
      if (req.session.secret != null) {
        try {
          const userData = await verify(req.session.secret);
          res.status(200);
          msg = {
            message: "Authentication successful",
            success: true,
            payload: userData,
          };
        } catch (err) {
          res.status(401);
          msg = {
            message: "Authentication failure",
            success: false,
          };
        }
      } else {
        res.status(401);
        msg = {
          message: "Authentication failure",
          success: false,
        };
      }
      res.json(msg);
    });

    return this.router;
  }
}

interface UserAuthenticationData {
  email: string;
  password: string;
}

export default new AuthController(new UserDao()).routes();
