import { getRepository } from "typeorm";
import {
  Subscriber,
  SubscriptionTier,
} from "./entity";
import { SubscriptionType } from "./model";

export const hasEmailSubscribedBefore = async (email: string) => {
  const subscriberData = await getRepository(Subscriber).findOne({
    where: { email },
  });
  return !!subscriberData;
}

export const createNewSubscription = async (email: string, subscriptionType: SubscriptionType, balance: number) => {
  const subTier = await getRepository(SubscriptionTier).findOne({
    where: { name: subscriptionType },
  });

  const subscriberRepo = getRepository(Subscriber);
  const newSubscriber = await subscriberRepo.create({
    email,
    balance,
    subscriptionTier: subTier,
  });
  await subscriberRepo.save(newSubscriber);
}
