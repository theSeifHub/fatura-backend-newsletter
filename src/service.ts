import {
  PaymentMethod,
  SubscriptionType,
} from "./model";
import * as dbRepo from "./repository";

const generateBalance = () => {
  let balance = 0;
    while (balance < 100) {
      balance = Math.ceil(Math.random() * 500);
    };
  return balance;
}

export const addNewSubscription = async (email: string, subscriptionType: SubscriptionType) => {
  if (!await dbRepo.hasEmailSubscribedBefore(email)) {
    const balance = generateBalance();
    dbRepo.createNewSubscription(email, subscriptionType, balance);

    return {
      result: "Subscribed successfully",
      isCreated: true,
    };
  } else {
    return {
      result: "Email already subscribed",
      isCreated: false,
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
