import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeopleTable1703326716546 implements MigrationInterface {
  name = 'CreatePeopleTable1703326716546';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "people" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "people" ADD CONSTRAINT "UQ_e7ec00b080e693706a6eaa6d317" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "people" DROP CONSTRAINT "UQ_e7ec00b080e693706a6eaa6d317"`,
    );
    await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "name"`);
  }
}
