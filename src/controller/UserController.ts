import Controller from "../interface/Controller";
import { Router, Request, Response, NextFunction } from "express";
import UserDao from "./../dao/UserDao";
import User from "../model/User";
import Message from "../interface/Message";

class UserController extends Controller {

    private userDao: UserDao;

    constructor() {
        super();
        this.userDao = new UserDao();
    }

    routes(): Router {
        // Get users
        this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
            let users: User[] = await this.userDao.findAll();
            res.json(users);
            res.status(200);
        });
        // Get single
        this.router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
            let user: User = await this.userDao.findOne(req.params.id);
            res.json(user[0]);
            res.status(200);
        });
        // Add user
        this.router.post('/', async (req: Request, res: Response, next: NextFunction) => {
            let user: User = {
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                telephone: req.body.telephone,
                admin: 0
            }
            try {
                let userId: number[] = await this.userDao.save(user);
                user.id = userId[0];

                let message: Message = {
                    success: true,
                    message: "New user inserted",
                    payload: user
                }
                res.status(201);
                res.json(message);

            } catch (exception) {
                let message: Message = {
                    success: false,
                    message: "Error adding new user"
                }
                res.status(503);
                res.json(message);
            }
        })
        return this.router;
    }
}

export default new UserController().routes();