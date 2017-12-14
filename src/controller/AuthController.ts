import Controller from "../interface/Controller";
import { Router, Request, Response, NextFunction } from "express";
import Message from "../interface/Message";
import UserDao from "../dao/UserDao";
import User from "../model/User";
import generate from "./../service/JWTService";

class AuthController extends Controller {

    private userDao: UserDao;

    constructor() {
        super();
        this.userDao = new UserDao();
    }

    public routes(): Router {
        // Authentication endpoint
        this.router.post('/', async (req: Request, res: Response, next: NextFunction) => {
            let userData: UserAuthenticationData = req.body;
            let user: User = await this.userDao.findByEmailAndPassword(userData.email, userData.password);
            let msg = {} as Message;
            if (user[0] == undefined) {
                res.status(401);
                msg = {
                    success: false,
                    message: "Authentication failure",
                }
            } else {
                res.status(200);

                let jwt: string = await generate(user);

                msg = {
                    success: true,
                    message: "Authentication successful",
                    payload: {
                        token: jwt
                    }
                }
                req.session.secret = jwt;
            }

            res.json(msg);
        });

        // Return authentication status if session is set
        this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {

        });

        return this.router;
    }
}

interface UserAuthenticationData {
    email: string,
    password: string
}

export default new AuthController().routes();