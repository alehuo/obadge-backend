import { Router } from "express";
import Controller from "../interface/Controller";

/**
 * Shopping cart controller.
 */
class CartController extends Controller {
  constructor() {
    super();
  }

  public routes(): Router {
    // Remove item(s) from cart
    this.router.post("/remove", (req, res, next) => {
      res.status(200).send("Not implemented");
    });

    // Add item(s) to cart
    this.router.post("/add", (req, res, next) => {res.status(200).send("Not implemented"); });

    return this.router;
  }
}

export default new CartController().routes();
