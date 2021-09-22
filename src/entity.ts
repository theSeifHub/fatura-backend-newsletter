import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

abstract class BaseEntityAttributes {
  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
  })
  public createdAt!: number;

  @UpdateDateColumn({
    name: "updated_at",
    type: "datetime",
  })
  public updatedAt!: number;
}
// ==================================

@Entity({
  schema: "NewsLetter", name: "SubscriptionType",
})
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
// ==================================

@Entity({
  schema: "NewsLetter", name: "Subscriber",
})
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
    type: "bit",
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
// ==================================

@Entity({
  schema: "NewsLetter", name: "Issue",
})
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
