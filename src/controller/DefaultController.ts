import Controller from "../interface/Controller";
import { Router } from "express";

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
