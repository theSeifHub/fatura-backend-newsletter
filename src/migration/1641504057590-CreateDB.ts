import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDB1641504057590 implements MigrationInterface {
    name = 'CreateDB1641504057590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SubscriptionTier" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "subscription_tier_id" SERIAL NOT NULL, "name" character varying NOT NULL, "price_per_issue" integer NOT NULL, CONSTRAINT "UQ_1d6a9ccf5b7558f11e6e297e9c3" UNIQUE ("name"), CONSTRAINT "PK_2b7111a57cde7132d75c4975bf8" PRIMARY KEY ("subscription_tier_id"))`);
        await queryRunner.query(`CREATE TABLE "Subscriber" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "subscriber_id" SERIAL NOT NULL, "email" character varying NOT NULL, "still_subscribed" boolean NOT NULL DEFAULT true, "balance" integer NOT NULL, "subscription_tier_id" integer, CONSTRAINT "UQ_7b88d73f350c1657fbe3e537caf" UNIQUE ("email"), CONSTRAINT "PK_2e41cd9c9069b2807adf3cfe373" PRIMARY KEY ("subscriber_id"))`);
        await queryRunner.query(`CREATE TABLE "Issue" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "issue_id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "subscription_tier_id" integer, CONSTRAINT "PK_e25b9a399abc2952e14f5996411" PRIMARY KEY ("issue_id"))`);
        await queryRunner.query(`CREATE TABLE "SeenIssues" ("subscriber_id" integer NOT NULL, "issue_id" integer NOT NULL, CONSTRAINT "PK_4a0f1038266a1150a2dc0b80f5c" PRIMARY KEY ("subscriber_id", "issue_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7e2c3de5ca75296b0d92404832" ON "SeenIssues" ("subscriber_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_da2f4de5a41bd79339e8458825" ON "SeenIssues" ("issue_id") `);
        await queryRunner.query(`ALTER TABLE "Subscriber" ADD CONSTRAINT "FK_7e0f10222adf869f20e7f607a86" FOREIGN KEY ("subscription_tier_id") REFERENCES "SubscriptionTier"("subscription_tier_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Issue" ADD CONSTRAINT "FK_77e882fd1562fce464fe407c071" FOREIGN KEY ("subscription_tier_id") REFERENCES "SubscriptionTier"("subscription_tier_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SeenIssues" ADD CONSTRAINT "FK_7e2c3de5ca75296b0d924048328" FOREIGN KEY ("subscriber_id") REFERENCES "Subscriber"("subscriber_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "SeenIssues" ADD CONSTRAINT "FK_da2f4de5a41bd79339e84588253" FOREIGN KEY ("issue_id") REFERENCES "Issue"("issue_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SeenIssues" DROP CONSTRAINT "FK_da2f4de5a41bd79339e84588253"`);
        await queryRunner.query(`ALTER TABLE "SeenIssues" DROP CONSTRAINT "FK_7e2c3de5ca75296b0d924048328"`);
        await queryRunner.query(`ALTER TABLE "Issue" DROP CONSTRAINT "FK_77e882fd1562fce464fe407c071"`);
        await queryRunner.query(`ALTER TABLE "Subscriber" DROP CONSTRAINT "FK_7e0f10222adf869f20e7f607a86"`);
        await queryRunner.query(`DROP INDEX "IDX_da2f4de5a41bd79339e8458825"`);
        await queryRunner.query(`DROP INDEX "IDX_7e2c3de5ca75296b0d92404832"`);
        await queryRunner.query(`DROP TABLE "SeenIssues"`);
        await queryRunner.query(`DROP TABLE "Issue"`);
        await queryRunner.query(`DROP TABLE "Subscriber"`);
        await queryRunner.query(`DROP TABLE "SubscriptionTier"`);
    }

}
