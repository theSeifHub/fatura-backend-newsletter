import { PaymentMethod, SubscriptionType } from "./model";

const doesEmailExist = (email: string) => {
  // TODO query
  return false;
}

const createSubscriptionData = (email: string, subscriptionType: SubscriptionType, balance: number) => {
  // TODO query
}

export const addNewSubscription = (email: string, subscriptionType: SubscriptionType) => {
  if (!doesEmailExist(email)) {
    let balance = 0;
    while (balance < 50) {
      balance = Math.floor(Math.random() * 500);
    };

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

const getSubscriberData = (subscriberId: number) => {
  // TODO query
  return { // ! Mock data
    email: "creed@off.ice",
    balance: 300,
    subscriptionType: SubscriptionType.Monthly,
    subscriptionPrice: 100,
  };
}

const subtractCashAmountFromBalance = (subscriberId: number, price: number) => {
  // TODO query
}

const hasValidBankApprovalToPay = (cardNo: number) => {
  const randomNo = Math.random();
  return (randomNo > 0.5);
}

export const getLatestIssues = (subscriberId: number, paymentMethod: PaymentMethod, cardNo?: number) => {
  const subscriberData = getSubscriberData(subscriberId);
  if (paymentMethod === PaymentMethod.Cash && subscriberData.balance >= subscriberData.subscriptionPrice) {
    subtractCashAmountFromBalance(subscriberId, subscriberData.subscriptionPrice);
  } else if (paymentMethod === PaymentMethod.CreditCard && cardNo && hasValidBankApprovalToPay(cardNo)) {

  }
}
