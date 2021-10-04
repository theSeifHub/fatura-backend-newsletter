import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntityAttributes } from "./BaseEntityAttributes";
import { Issue } from "./Issue";
import { Subscriber } from "./Subscriber";


@Entity({ name: "SubscriptionType" })
export class SubscriptionType extends BaseEntityAttributes {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "subscription_type_id",
  })
  public subscriptionTypeID!: number;

  @Column({
    type: "varchar",
    name: "type",
  })
  public type!: string;

  @Column({
    type: "int",
    name: "price",
  })
  public price!: number;

  @OneToMany(() => Subscriber, subscriber => subscriber.subscriptionType)
  public subscribers!: Subscriber[];

  @OneToMany(() => Issue, issue => issue.subscriptionType)
  public issues!: Issue[];
}