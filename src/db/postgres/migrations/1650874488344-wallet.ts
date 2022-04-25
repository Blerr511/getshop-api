import { MigrationInterface, QueryRunner } from 'typeorm';

export class wallet1650874488344 implements MigrationInterface {
  name = 'wallet1650874488344';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_b575dd3c21fb0831013c909e7fe"`,
    );
    await queryRunner.query(
      `CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "wallet_json" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_e898b49109556b9cefe322a2e64" UNIQUE ("password"), CONSTRAINT "UQ_ff80cbe857fd8dc18c8e756e7e8" UNIQUE ("wallet_json"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "wallet" ADD CONSTRAINT "FK_72548a47ac4a996cd254b082522" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wallet" DROP CONSTRAINT "FK_72548a47ac4a996cd254b082522"`,
    );
    await queryRunner.query(`DROP TABLE "wallet"`);
    await queryRunner.query(
      `ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_b575dd3c21fb0831013c909e7fe" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
