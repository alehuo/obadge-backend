import Controller from "../interface/Controller";
import { Router, Request, Response, NextFunction } from "express";
import Message from "../interface/Message";

class AuthController extends Controller {
    public routes(): Router {
        // Authentication endpoint
        this.router.post('/', (req: Request, res: Response, next: NextFunction) => {
            let msg: Message = {
                success: true,
                message: "Authentication successful",
                payload: {
                    token: "JWT_TOKEN"
                }
            }
            res.status(200);
            res.json(msg);
        });
        return this.router;
    }
}

export default new AuthController().routes();