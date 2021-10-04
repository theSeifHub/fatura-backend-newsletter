import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDB1633340666888 implements MigrationInterface {
    name = 'CreateDB1633340666888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SubscriptionType" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "subscription_type_id" SERIAL NOT NULL, "type" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_29eaf33ff5acfb3b6038550556c" PRIMARY KEY ("subscription_type_id"))`);
        await queryRunner.query(`CREATE TABLE "Subscriber" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "subscriber_id" SERIAL NOT NULL, "email" character varying NOT NULL, "still_subscribed" boolean NOT NULL DEFAULT true, "balance" integer NOT NULL, "subscription_type_id" integer, CONSTRAINT "PK_2e41cd9c9069b2807adf3cfe373" PRIMARY KEY ("subscriber_id"))`);
        await queryRunner.query(`CREATE TABLE "Issue" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "issue_id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "subscription_type_id" integer, CONSTRAINT "PK_e25b9a399abc2952e14f5996411" PRIMARY KEY ("issue_id"))`);
        await queryRunner.query(`CREATE TABLE "seenIssues" ("subscriber_id" integer NOT NULL, "issue_id" integer NOT NULL, CONSTRAINT "PK_22b2ab37311ef2fb0da850411ab" PRIMARY KEY ("subscriber_id", "issue_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_814d414df496fe28b4da2d8ef2" ON "seenIssues" ("subscriber_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_947c7f890d337a16c3cdd037f5" ON "seenIssues" ("issue_id") `);
        await queryRunner.query(`ALTER TABLE "Subscriber" ADD CONSTRAINT "FK_b7c71e443e5d0ff734c8236ba96" FOREIGN KEY ("subscription_type_id") REFERENCES "SubscriptionType"("subscription_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Issue" ADD CONSTRAINT "FK_ca4ca7ec60adfc3f33cbf419364" FOREIGN KEY ("subscription_type_id") REFERENCES "SubscriptionType"("subscription_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seenIssues" ADD CONSTRAINT "FK_814d414df496fe28b4da2d8ef29" FOREIGN KEY ("subscriber_id") REFERENCES "Subscriber"("subscriber_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "seenIssues" ADD CONSTRAINT "FK_947c7f890d337a16c3cdd037f5b" FOREIGN KEY ("issue_id") REFERENCES "Issue"("issue_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seenIssues" DROP CONSTRAINT "FK_947c7f890d337a16c3cdd037f5b"`);
        await queryRunner.query(`ALTER TABLE "seenIssues" DROP CONSTRAINT "FK_814d414df496fe28b4da2d8ef29"`);
        await queryRunner.query(`ALTER TABLE "Issue" DROP CONSTRAINT "FK_ca4ca7ec60adfc3f33cbf419364"`);
        await queryRunner.query(`ALTER TABLE "Subscriber" DROP CONSTRAINT "FK_b7c71e443e5d0ff734c8236ba96"`);
        await queryRunner.query(`DROP INDEX "IDX_947c7f890d337a16c3cdd037f5"`);
        await queryRunner.query(`DROP INDEX "IDX_814d414df496fe28b4da2d8ef2"`);
        await queryRunner.query(`DROP TABLE "seenIssues"`);
        await queryRunner.query(`DROP TABLE "Issue"`);
        await queryRunner.query(`DROP TABLE "Subscriber"`);
        await queryRunner.query(`DROP TABLE "SubscriptionType"`);
    }

}
