import { MigrationInterface, QueryRunner } from "typeorm";

export class ValuationNumberFileds1766148967918 implements MigrationInterface {
    name = 'ValuationNumberFileds1766148967918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "annualRevenue"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "annualRevenue" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "developerSalaries"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "developerSalaries" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "otherDirectCost"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "otherDirectCost" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "grossProfit"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "grossProfit" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "operatingExpenses"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "operatingExpenses" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "ebidta"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "ebidta" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "ebidtaPercentage"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "ebidtaPercentage" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "tax"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "tax" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "netProfit"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "netProfit" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "profitMarginPercentage"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "profitMarginPercentage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "mrr"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "mrr" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "clientConcentration"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "clientConcentration" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "valuation"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "valuation" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "pMultiple"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "pMultiple" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "fteCorrection"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "fteCorrection" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "rcrCorrection"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "rcrCorrection" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "pFinal"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "pFinal" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "rMultiple"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "rMultiple" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "rFteCorrection"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "rFteCorrection" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "rRcrCorrection"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "rRcrCorrection" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "rFinal"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "rFinal" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "rFinal"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "rFinal" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "rRcrCorrection"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "rRcrCorrection" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "rFteCorrection"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "rFteCorrection" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "rMultiple"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "rMultiple" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "pFinal"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "pFinal" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "rcrCorrection"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "rcrCorrection" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "fteCorrection"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "fteCorrection" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "pMultiple"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "pMultiple" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "valuation"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "valuation" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "clientConcentration"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "clientConcentration" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "mrr"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "mrr" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "profitMarginPercentage"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "profitMarginPercentage" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "netProfit"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "netProfit" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "tax"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "tax" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "ebidtaPercentage"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "ebidtaPercentage" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "ebidta"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "ebidta" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "operatingExpenses"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "operatingExpenses" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "grossProfit"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "grossProfit" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "otherDirectCost"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "otherDirectCost" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "developerSalaries"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "developerSalaries" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "valuations" DROP COLUMN "annualRevenue"`);
        await queryRunner.query(`ALTER TABLE "valuations" ADD "annualRevenue" character varying NOT NULL`);
    }

}
