import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemasImprovments1741282456935 implements MigrationInterface {
  name = 'SchemasImprovments1741282456935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar_url"`);
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "url" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "stars" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "forks" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "issues" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "issues" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "forks" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "stars" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "url" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatar_url" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying`);
  }
}
