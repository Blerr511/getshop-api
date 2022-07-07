import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRefreshToken1649426711749 implements MigrationInterface {
  name = 'userRefreshToken1649426711749';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying, "phone_number" character varying, "email" character varying NOT NULL, "password" character varying, "sub" character varying, CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_3641ff83ff7c23b2760b3df56d4" UNIQUE ("sub"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "expire_date" TIMESTAMP NOT NULL, "token" character varying NOT NULL, CONSTRAINT "REFRESH_TOKEN_EACH_USER" UNIQUE ("user_id"), CONSTRAINT "REL_b575dd3c21fb0831013c909e7f" UNIQUE ("id"), CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_b575dd3c21fb0831013c909e7fe" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_b575dd3c21fb0831013c909e7fe"`,
    );
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
