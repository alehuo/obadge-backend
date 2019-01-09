import Controller from "../interface/Controller";
import { Router } from "express";

/**
 * Shopping cart controller.
 */
class CartController extends Controller {
  constructor() {
    super();
  }

  public routes(): Router {
    // Remove item(s) from cart
    this.router.post("/remove", async (req, res, next) => {});

    // Add item(s) to cart
    this.router.post("/add", async (req, res, next) => {});

    return this.router;
  }
}

export default new CartController().routes();
