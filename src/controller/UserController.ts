import { Router } from "express";
import Controller from "../interface/Controller";
import Message from "../interface/Message";
import User from "../model/User";
import { AuthMiddleware } from "../service/AuthService";
import UserDao from "./../dao/UserDao";

/**
 * User controller.
 */
class UserController extends Controller {
  constructor(private userDao: UserDao) {
    super();
  }

  public routes(): Router {
    // Get users
    this.router.get("/", AuthMiddleware, async (req, res, next) => {
      const users = await this.userDao.findAll();
      res.json(users);
      res.status(200);
    });
    // Get single
    this.router.get("/:id", AuthMiddleware, async (req, res, next) => {
      const user = await this.userDao.findOne(req.params.id);
      res.json(user[0]);
      res.status(200);
    });
    // Add user
    this.router.post("/", async (req, res, next) => {
      const user: User = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        admin: 0,
      };
      try {
        const userId = await this.userDao.save(user);
        user.id = userId[0];

        const message: Message = {
          success: true,
          message: "New user inserted",
          payload: user,
        };
        res.status(201);
        res.json(message);
      } catch (exception) {
        const message: Message = {
          success: false,
          message: "Error adding new user",
        };
        res.status(503);
        res.json(message);
      }
    });
    return this.router;
  }
}

export default new UserController(new UserDao()).routes();
