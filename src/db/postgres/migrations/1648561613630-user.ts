import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1648561613630 implements MigrationInterface {
  name = 'user1648561613630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone_number" character varying, "email" character varying NOT NULL, "password" character varying, CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_b575dd3c21fb0831013c909e7fe"`,
    );
    await queryRunner.query(`DROP TABLE "refresh_token"`);
  }
}
