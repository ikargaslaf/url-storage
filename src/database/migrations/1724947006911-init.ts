import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1724947006911 implements MigrationInterface {
    name = 'Init1724947006911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "url" ("createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7421088122ee64b55556dfc3a91" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "url"`);
    }

}
