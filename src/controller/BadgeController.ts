import Controller from "../interface/Controller";
import { Router, Request, Response, NextFunction } from "express";
import BadgeDao from "./../dao/BadgeDao";
import User from "../model/User";
import Message from "../interface/Message";
import { AuthMiddleware } from "../service/AuthService";
import Badge from "../model/Badge";

import * as jwt from "jsonwebtoken";

/**
 * Badge controller.
 */
class BadgeController extends Controller {

    constructor(private badgeDao: BadgeDao) {
        super();
    }

    routes(): Router {
        // Get badges
        this.router.get('/', AuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
            let badges: Badge[] = await this.badgeDao.findAll();
            res.json(badges);
            res.status(200);
        });
        // Get single badge
        this.router.get('/:id', AuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
            let badge: Badge = await this.badgeDao.findOne(req.params.id);
            res.json(badge[0]);
            res.status(200);
        });
        // Add badge
        this.router.post('/', AuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {

            let user: any = jwt.decode(req.session.secret);

            let badge: Badge = {
                title: req.body.title,
                description: req.body.description,
                pricePerUnit: req.body.pricePerUnit,
                stock: req.body.stock,
                userId: req.session.userId
            }

            try {
                let badgeId: number[] = await this.badgeDao.save(badge);
                badge.id = badgeId[0];

                let message: Message = {
                    success: true,
                    message: "New badge inserted",
                    payload: badge
                }
                res.status(201);
                res.json(message);

            } catch (exception) {
                let message: Message = {
                    success: false,
                    message: "Error adding new badge"
                }
                res.status(503);
                res.json(message);
            }
        })
        return this.router;
    }
}

export default new BadgeController(new BadgeDao()).routes();