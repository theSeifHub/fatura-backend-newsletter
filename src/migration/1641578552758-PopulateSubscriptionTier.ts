import {MigrationInterface, QueryRunner} from "typeorm";

export class PopulateSubscriptionTier1641578552758 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "SubscriptionTier" ("name", "price_per_issue")
            VALUES ('daily', 3), ('weekly', 10), ('monthly', 25);`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "SubscriptionTier" WHERE "name" IN ('daily', 'weekly', 'monthly');`);
    }

}
