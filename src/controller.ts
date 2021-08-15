import {
  Request, Response, NextFunction,
} from "express";
import * as services from "./service";

export const mainPage = (req: Request, res: Response, next: NextFunction) => {
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

export const subscribeToNewsletter = (req: Request, res: Response, next: NextFunction) => {
  const {
    body: {
      email,
      subType: subscriptionType,
      method: paymentMethod,
    },
  } = req;

  const { result } = services.makeSubscription(email, subscriptionType, paymentMethod);
  console.log("result", result);
  return res.status(201).json({
    code: 201,
    message: result,
  });
}