/**
 * Authentication service.
 * @author alehuo
 */
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import Message from "../interface/Message";
import User from "../model/User";

/**
 * Generates a JSON Web token.
 * @param userData User data
 */
const generate = (userData: User) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        exp:
          Math.floor(Date.now() / 1000) +
          60 * 60 * parseInt(process.env.JWT_EXPIRY, 10),
        data: JSON.stringify(userData),
      },
      process.env.JWT_SECRET,
      (err, payload: string) => {
        !err ? resolve(payload) : reject(err);
      },
    );
  });
};

/**
 * Verifies a JWT.
 * @param token JWT
 */
const verify = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded: User) =>
      !err ? resolve(decoded) : reject(err),
    );
  });
};

/**
 * Authentication middleware to be used with Express.
 * @param options Options.
 */
const AuthMiddleware = async (req: any, res: Response, next: NextFunction) => {
  if (req.session.userId === undefined || req.session.userId == null) {
    res.status(401);
    let msg = {} as Message;
    msg = {
      success: false,
      message: "Authentication failure",
    };
    res.json(msg);
  } else {
    if (!isNaN(req.session.userId)) {
      next();
    }
  }
};

export { AuthMiddleware, generate, verify };
