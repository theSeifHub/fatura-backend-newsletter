import express, {
	Router as ExpressRouter,
} from "express";
import * as controller from "./controller"

const Router: ExpressRouter = express.Router();

Router.route("/")
	.get(
		controller.runServer,
	);

Router.route("/subscriptions")
	.post(
		controller.subscribeToNewsletter,
	);

Router.route("/issues/:subscriberId")
	.get(
		controller.getLatestIssues,
	);

Router.route("/issues")
	.post(
		controller.addNewIssueContent,
	);

export default Router;
