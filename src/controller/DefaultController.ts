import Controller from "../interface/Controller";
import { Router, Request, Response, NextFunction } from "express";

/**
 * Default controller.
 */
class DefaultController extends Controller {
    public routes(): Router {
        // Index
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.send("Hello world. Visit the API at /api.");
        });
        return this.router;
    }
}

export default new DefaultController().routes();