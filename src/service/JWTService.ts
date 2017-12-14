/**
 * Service for generating JSON web tokens.
 */
import User from "../model/User";
import * as jwt from "jsonwebtoken";

/**
 * Generates a JSON Web token.
 * @param userData User data
 */
let generate = (userData: User): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            data: JSON.stringify(userData)
        }, process.env.JWT_SECRET, (err, payload) => {
            if (err == null) {
                resolve(payload);
            } else {
                reject(err);
            }
        });
    });
}

export default generate;