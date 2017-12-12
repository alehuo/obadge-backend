import Controller from "../interface/Controller";
import { Router, Request, Response, NextFunction } from "express";

class UserController extends Controller {
    routes(): Router {
        // Get users
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.send('Endpoint for getting all users');
        });
        // Add user
        this.router.post('/',(req: Request, res: Response, next: NextFunction) => {
            res.send('Endpoint for adding a single user');
        })
        return this.router;
    }
}

export default new UserController().routes();