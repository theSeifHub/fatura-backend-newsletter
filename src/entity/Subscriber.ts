import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityAttributes } from "./BaseEntityAttributes";
import { Issue } from "./Issue";
import { SubscriptionTier } from "./SubscriptionTier";

@Entity({ name: "Subscriber" })
export class Subscriber extends BaseEntityAttributes {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "subscriber_id",
  })
  public subscriberID!: number;

  @Column({
    type: "varchar",
    name: "email",
    unique: true,
  })
  public email!: string;

  @Column({
    type: "boolean",
    name: "still_subscribed",
    default: true,
  })
  public stillSubscribed!: boolean;

  @Column({
    type: "int",
    name: "balance",
  })
  public balance!: number;

  @ManyToOne(() => SubscriptionTier, subscriptionTier => subscriptionTier.subscribers)
  @JoinColumn({
    name: "subscription_tier_id"
  })
  public subscriptionTier!: SubscriptionTier;

  @ManyToMany(() => Issue, issue => issue.readSubscribers)
  @JoinTable({
    name: "SeenIssues",
    joinColumn: {
      name: "subscriber_id",
    },
    inverseJoinColumn: {
      name: "issue_id",
    },
  })
  public seenIssues!: Issue[];
}