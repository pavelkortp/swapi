import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConnectFilmsPeople1704642876973 implements MigrationInterface {
    name = 'AddConnectFilmsPeople1704642876973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people_films_films" ("peopleId" integer NOT NULL, "filmsId" integer NOT NULL, CONSTRAINT "PK_a42b8c227444fd500c1b78979da" PRIMARY KEY ("peopleId", "filmsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be3d4bf0a2a829c091594359de" ON "people_films_films" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_80ce66926f5e215472c235a3a6" ON "people_films_films" ("filmsId") `);
        await queryRunner.query(`CREATE TABLE "films_characters_people" ("filmsId" integer NOT NULL, "peopleId" integer NOT NULL, CONSTRAINT "PK_13beaa853a90e105eb6b704530a" PRIMARY KEY ("filmsId", "peopleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca23a410c5afe74468664fc093" ON "films_characters_people" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f835d0e20d5e12a9d1eff662f" ON "films_characters_people" ("peopleId") `);
        await queryRunner.query(`ALTER TABLE "people_films_films" ADD CONSTRAINT "FK_be3d4bf0a2a829c091594359de7" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_films_films" ADD CONSTRAINT "FK_80ce66926f5e215472c235a3a61" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_characters_people" ADD CONSTRAINT "FK_ca23a410c5afe74468664fc0936" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_characters_people" ADD CONSTRAINT "FK_8f835d0e20d5e12a9d1eff662fd" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "films_characters_people" DROP CONSTRAINT "FK_8f835d0e20d5e12a9d1eff662fd"`);
        await queryRunner.query(`ALTER TABLE "films_characters_people" DROP CONSTRAINT "FK_ca23a410c5afe74468664fc0936"`);
        await queryRunner.query(`ALTER TABLE "people_films_films" DROP CONSTRAINT "FK_80ce66926f5e215472c235a3a61"`);
        await queryRunner.query(`ALTER TABLE "people_films_films" DROP CONSTRAINT "FK_be3d4bf0a2a829c091594359de7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f835d0e20d5e12a9d1eff662f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca23a410c5afe74468664fc093"`);
        await queryRunner.query(`DROP TABLE "films_characters_people"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80ce66926f5e215472c235a3a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be3d4bf0a2a829c091594359de"`);
        await queryRunner.query(`DROP TABLE "people_films_films"`);
    }

}
