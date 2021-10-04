import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntityAttributes extends BaseEntity {
  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  public createdAt!: number;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
  })
  public updatedAt!: number;
}
