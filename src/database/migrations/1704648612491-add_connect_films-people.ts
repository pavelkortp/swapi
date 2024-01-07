import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConnectFilmsPeople1704648612491 implements MigrationInterface {
    name = 'AddConnectFilmsPeople1704648612491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people_films" ("peopleId" integer NOT NULL, "filmsId" integer NOT NULL, CONSTRAINT "PK_b62d2638a5ad3384e19eec2db0c" PRIMARY KEY ("peopleId", "filmsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f9d0038e205e511024d88b4c44" ON "people_films" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a6ae8e23d835bdbc6b9fe43823" ON "people_films" ("filmsId") `);
        await queryRunner.query(`ALTER TABLE "people_films" ADD CONSTRAINT "FK_f9d0038e205e511024d88b4c441" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_films" ADD CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people_films" DROP CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f"`);
        await queryRunner.query(`ALTER TABLE "people_films" DROP CONSTRAINT "FK_f9d0038e205e511024d88b4c441"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6ae8e23d835bdbc6b9fe43823"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f9d0038e205e511024d88b4c44"`);
        await queryRunner.query(`DROP TABLE "people_films"`);
    }

}
