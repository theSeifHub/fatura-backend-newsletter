import {
  Request, Response, NextFunction,
} from "express";
import { StatusCodes } from "http-status-codes";
import { PaymentMethod } from "./model";
import * as services from "./service";

export const runServer = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({
      code: 200,
      message: "Server Works! YAAAAY!",
    });
  } catch (err) {
    console.log(err);
    return next;
  }
}

export const subscribeToNewsletter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: {
        email,
        subType: subscriptionType,
        payMethod,
      },
    } = req;

    const { result, isCreated } = await services.addNewSubscription(email, subscriptionType);

    return res.status(
      isCreated ? StatusCodes.CREATED : StatusCodes.CONFLICT,
    ).json({
      message: result,
    });
  } catch (err) {
    console.log(err);
    return next;
  }
}

export const getLatestIssues = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        subscriberId,
      },
      body: {
        payMethod,
        cardNo,
      }
    } = req;

    const issues = services.getLatestIssues(+subscriberId, payMethod as PaymentMethod, +cardNo);
    console.log("result", issues);
    return res.status(200).json({
      code: 200,
      message: issues,
    });
  } catch (err) {
    console.log(err);
    return next;
  }
}

export const addNewIssueContent = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: content,
    } = req;

    console.log("new", content);
    return res.status(201).json({
      code: 201,
      message: "Content added successfully",
      data: content,
    });
  } catch (err) {
    console.log(err);
    return next;
  }
}
