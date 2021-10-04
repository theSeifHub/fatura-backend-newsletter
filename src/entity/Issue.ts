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
import { SubscriptionType } from "./SubscriptionType";

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
  
  @ManyToOne(() => SubscriptionType, subscriptionType => subscriptionType.issues)
  @JoinColumn({
    name: "subscription_type_id"
  })
  public subscriptionType!: SubscriptionType;

  @ManyToMany(() => Subscriber, subscriber => subscriber.seenIssues)
  public readSubscribers!: Subscriber[];
}
