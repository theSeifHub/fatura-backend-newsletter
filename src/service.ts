import { PaymentMethod, SubscriptionType } from "./model";

const doesEmailExist = (email: string) => {
  // TODO query
  return false;
}

const createSubscriptionData = (email: string, subscriptionType: SubscriptionType, balance: number) => {
  // TODO query
}

export const makeSubscription = (email: string, subscriptionType: SubscriptionType, paymentMethod: PaymentMethod) => {
  if (!doesEmailExist(email)) {
    let balance = 0;
    while (balance < 50) {
      balance = Math.floor(Math.random() * 500);
    };
    console.log(">>>>", balance);
    createSubscriptionData(email, subscriptionType, balance);

    return {
      result: "Subscription success",
    };
  } else {
    return {
      result: "Email already subscribed",
    }
  }
}
