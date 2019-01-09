import { Router } from "express";
import Controller from "../interface/Controller";
import Message from "../interface/Message";
import Badge from "../model/Badge";
import { AuthMiddleware } from "../service/AuthService";
import BadgeDao from "./../dao/BadgeDao";

import * as jwt from "jsonwebtoken";

/**
 * Badge controller.
 */
class BadgeController extends Controller {
  constructor(private badgeDao: BadgeDao) {
    super();
  }

  public routes(): Router {
    // Get badges
    this.router.get("/", AuthMiddleware, async (req, res, next) => {
      const badges: Badge[] = await this.badgeDao.findAll();
      res.json(badges);
      res.status(200);
    });
    // Get single badge
    this.router.get("/:id", AuthMiddleware, async (req, res, next) => {
      const badge: Badge = await this.badgeDao.findOne(req.params.id);
      res.json(badge[0]);
      res.status(200);
    });
    // Add badge
    this.router.post("/", AuthMiddleware, async (req, res, next) => {
      const user: any = jwt.decode(req.session.secret);

      const badge: Badge = {
        title: req.body.title,
        description: req.body.description,
        pricePerUnit: req.body.pricePerUnit,
        stock: req.body.stock,
        userId: req.session.userId,
      };

      try {
        const badgeId: number[] = await this.badgeDao.save(badge);
        badge.id = badgeId[0];

        const message: Message = {
          success: true,
          message: "New badge inserted",
          payload: badge,
        };
        res.status(201);
        res.json(message);
      } catch (exception) {
        const message: Message = {
          success: false,
          message: "Error adding new badge",
        };
        res.status(503);
        res.json(message);
      }
    });
    return this.router;
  }
}

export default new BadgeController(new BadgeDao()).routes();
