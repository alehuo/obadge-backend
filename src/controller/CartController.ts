import Controller from "../interface/Controller";
import { Router, Request, Response, NextFunction } from "express";
import Message from "../interface/Message";
import UserDao from "../dao/UserDao";
import User from "../model/User";
import { generate, verify } from "./../service/AuthService";

/**
 * Shopping cart controller.
 */
class CartController extends Controller {

    constructor() {
        super();
    }

    public routes(): Router {
        // Remove item(s) from cart
        this.router.post('/remove', async (req: Request, res: Response, next: NextFunction) => {

        });

        // Add item(s) to cart
        this.router.post('/add', async (req: Request, res: Response, next: NextFunction) => {

        });

        return this.router;
    }
}

export default new CartController().routes();