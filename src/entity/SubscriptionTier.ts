import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityAttributes } from "./BaseEntityAttributes";
import { Issue } from "./Issue";
import { Subscriber } from "./Subscriber";
import { SubscriptionType } from "../model";


@Entity({ name: "SubscriptionTier" })
export class SubscriptionTier extends BaseEntityAttributes {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "subscription_tier_id",
  })
  public subscriptionTierID!: number;

  @Column({
    type: "varchar",
    name: "name",
    unique: true,
    enum: ["daily", "weekly", "monthly"],
  })
  public name!: SubscriptionType;

  @Column({
    type: "int",
    name: "price_per_issue",
  })
  public pricePerIssue!: number;

  @OneToMany(() => Subscriber, subscriber => subscriber.subscriptionTier)
  public subscribers!: Subscriber[];

  @OneToMany(() => Issue, issue => issue.subscriptionTier)
  public issues!: Issue[];
}