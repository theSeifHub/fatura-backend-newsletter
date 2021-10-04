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
import { SubscriptionType } from "./SubscriptionType";

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

  @ManyToOne(() => SubscriptionType, subscriptionType => subscriptionType.subscribers)
  @JoinColumn({
    name: "subscription_type_id"
  })
  public subscriptionType!: SubscriptionType;

  @ManyToMany(() => Issue, issue => issue.readSubscribers)
  @JoinTable({
    name: "seenIssues",
    joinColumn: {
      name: "subscriber_id",
    },
    inverseJoinColumn: {
      name: "issue_id",
    },
  })
  public seenIssues!: Issue[];
}