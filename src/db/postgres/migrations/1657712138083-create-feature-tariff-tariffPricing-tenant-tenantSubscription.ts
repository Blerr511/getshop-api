import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFeatureTariffTariffPricingTenantTenantSubscription1657712138083
  implements MigrationInterface
{
  name =
    'createFeatureTariffTariffPricingTenantTenantSubscription1657712138083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "feature" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "uniqueFeatureName" UNIQUE ("name"), CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tenant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "uniqueTenantName" UNIQUE ("name"), CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tenant_subscription" ("id" SERIAL NOT NULL, "active_from" TIMESTAMP NOT NULL, "active_until" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tenant_id" integer, "tariff_id" integer, CONSTRAINT "REL_a300c9bff7b5bb7cd6d3ed00e7" UNIQUE ("tenant_id"), CONSTRAINT "PK_d91b66c187ed664d890944a9776" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tariff_pricing" ("id" SERIAL NOT NULL, "days" integer NOT NULL, "price" integer NOT NULL, "sale_price" integer NOT NULL, "tariff_id" integer, CONSTRAINT "PK_3af69322deb5a8a8345bbe48de5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tariff" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "uniqueTariffName" UNIQUE ("name"), CONSTRAINT "PK_bbeac9df199ea1c22c6dea75c2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "feature_tariff_tariff" ("feature_id" integer NOT NULL, "tariff_id" integer NOT NULL, CONSTRAINT "PK_c78ec2d53591f106b3b4a5793df" PRIMARY KEY ("feature_id", "tariff_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d19302780ce779734a86370f6" ON "feature_tariff_tariff" ("feature_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_43f8571596b1d852386272b548" ON "feature_tariff_tariff" ("tariff_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_subscription" ADD CONSTRAINT "FK_a300c9bff7b5bb7cd6d3ed00e7a" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_subscription" ADD CONSTRAINT "FK_d11b5c0199b1b785423b78dc95b" FOREIGN KEY ("tariff_id") REFERENCES "tariff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tariff_pricing" ADD CONSTRAINT "FK_9036d52af8cc734c40a7d52a471" FOREIGN KEY ("tariff_id") REFERENCES "tariff"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "feature_tariff_tariff" ADD CONSTRAINT "FK_3d19302780ce779734a86370f65" FOREIGN KEY ("feature_id") REFERENCES "feature"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "feature_tariff_tariff" ADD CONSTRAINT "FK_43f8571596b1d852386272b5487" FOREIGN KEY ("tariff_id") REFERENCES "tariff"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "feature_tariff_tariff" DROP CONSTRAINT "FK_43f8571596b1d852386272b5487"`,
    );
    await queryRunner.query(
      `ALTER TABLE "feature_tariff_tariff" DROP CONSTRAINT "FK_3d19302780ce779734a86370f65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tariff_pricing" DROP CONSTRAINT "FK_9036d52af8cc734c40a7d52a471"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_subscription" DROP CONSTRAINT "FK_d11b5c0199b1b785423b78dc95b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_subscription" DROP CONSTRAINT "FK_a300c9bff7b5bb7cd6d3ed00e7a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_43f8571596b1d852386272b548"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d19302780ce779734a86370f6"`,
    );
    await queryRunner.query(`DROP TABLE "feature_tariff_tariff"`);
    await queryRunner.query(`DROP TABLE "tariff"`);
    await queryRunner.query(`DROP TABLE "tariff_pricing"`);
    await queryRunner.query(`DROP TABLE "tenant_subscription"`);
    await queryRunner.query(`DROP TABLE "tenant"`);
    await queryRunner.query(`DROP TABLE "feature"`);
  }
}
