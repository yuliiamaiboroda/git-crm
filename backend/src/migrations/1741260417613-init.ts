import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1741260417613 implements MigrationInterface {
  name = 'Init1741260417613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying, "avatar_url" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "owner_id" integer NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "stars" integer NOT NULL, "forks" integer NOT NULL, "issues" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_d40afe32d1d771bea7a5f468185" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_d40afe32d1d771bea7a5f468185"`,
    );
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
