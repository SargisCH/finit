import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateValuationTables1765960240803 implements MigrationInterface {
    name = 'CreateValuationTables1765960240803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "valuation_wip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currentStep" character varying NOT NULL, "status" character varying NOT NULL, "data" jsonb NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_241dce351413798efec6cb00ec1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "valuations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "annualRevenue" character varying NOT NULL, "developerSalaries" character varying NOT NULL, "otherDirectCost" character varying NOT NULL, "grossProfit" character varying NOT NULL, "operatingExpenses" character varying NOT NULL, "ebidta" character varying NOT NULL, "ebidtaPercentage" character varying NOT NULL, "tax" character varying NOT NULL, "netProfit" character varying NOT NULL, "profitMarginPercentage" character varying NOT NULL, "mrr" character varying NOT NULL, "clientConcentration" character varying NOT NULL, "valuation" character varying NOT NULL, "pMultiple" character varying NOT NULL, "fteCorrection" character varying NOT NULL, "rcrCorrection" character varying NOT NULL, "pFinal" character varying NOT NULL, "rMultiple" character varying NOT NULL, "rFteCorrection" character varying NOT NULL, "rRcrCorrection" character varying NOT NULL, "rFinal" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "wipId" uuid, CONSTRAINT "REL_5b756dc8fd13bc418cd64210ae" UNIQUE ("wipId"), CONSTRAINT "PK_f7d29c688fe21ae296643cf8c3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD CONSTRAINT "FK_5b756dc8fd13bc418cd64210aee" FOREIGN KEY ("wipId") REFERENCES "valuation_wip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "valuations" DROP CONSTRAINT "FK_5b756dc8fd13bc418cd64210aee"`);
        await queryRunner.query(`DROP TABLE "valuations"`);
        await queryRunner.query(`DROP TABLE "valuation_wip"`);
    }

}
