import { Router } from "express";
import Controller from "../interface/Controller";

/**
 * Default controller.
 */
class DefaultController extends Controller {
  public routes(): Router {
    // Index
    this.router.get("/", (req, res, next) => {
      res.send("Hello world. Visit the API at /api.");
    });
    return this.router;
  }
}

export default new DefaultController().routes();
