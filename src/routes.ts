import express, {
  Router as ExpressRouter,
} from "express";
import * as controller from "./controller"

const Router: ExpressRouter = express.Router();

Router.route("/")
  .get(
    controller.mainPage,
  );

Router.route("/subscriptions")
  .post(
    controller.subscribeToNewsletter,
  );

export default Router;