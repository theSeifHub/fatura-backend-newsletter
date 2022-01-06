import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityAttributes } from "./BaseEntityAttributes";
import { Subscriber } from "./Subscriber";
import { SubscriptionTier } from "./SubscriptionTier";

@Entity({ name: "Issue" })
export class Issue extends BaseEntityAttributes {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "issue_id",
  })
  public issueID!: number;

  @Column({
    type: "varchar",
    name: "title",
  })
  public title!: string;
  
  
  @Column({
    type: "varchar",
    name: "body",
  })
  public body!: string;
  
  @ManyToOne(() => SubscriptionTier, subscriptionTier => subscriptionTier.issues)
  @JoinColumn({
    name: "subscription_tier_id"
  })
  public subscriptionTier!: SubscriptionTier;

  @ManyToMany(() => Subscriber, subscriber => subscriber.seenIssues)
  public readSubscribers!: Subscriber[];
}
