/**
 * Service for generating JSON web tokens.
 */
import User from "../model/User";
import * as jwt from "jsonwebtoken";
import Message from "../interface/Message";
import { Request, Response, NextFunction } from "express";

/**
 * Generates a JSON Web token.
 * @param userData User data
 */
let generate = (userData: User): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * parseInt(process.env.JWT_EXPIRY)),
            data: JSON.stringify(userData)
        }, process.env.JWT_SECRET, (err, payload: string) => {
            (err == null) ? resolve(payload) : reject(err);
        });
    });
};

/**
 * Verifies a JWT.
 * @param token JWT
 */
let verify = (token: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded: User) {
            (err == null) ? resolve(decoded) : reject(err);
        });
    });
};

/**
 * Authentication middleware to be used with Express.
 * @param options Options.
 */
let AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.secret == undefined || req.session.secret == null) {
        res.status(401);
        let msg = {} as Message;
        msg = {
            success: false,
            message: "Authentication failure"
        }
        res.json(msg);
    } else {
        try {
            let userData: User = await verify(req.session.secret);
            next();
        } catch (err) {
            res.status(401);
            let msg = {} as Message;
            msg = {
                success: false,
                message: "Authentication failure"
            }
            res.json(msg);
        }
    }
}
export { AuthMiddleware, generate, verify };