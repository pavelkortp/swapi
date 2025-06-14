import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConnectPlanetsPeoplePlanetsFilms1704665003409
  implements MigrationInterface
{
  name = 'AddConnectPlanetsPeoplePlanetsFilms1704665003409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "people_films" DROP CONSTRAINT "FK_f9d0038e205e511024d88b4c441"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_films" DROP CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f"`,
    );
    await queryRunner.query(
      `CREATE TABLE "planets" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "name" character varying NOT NULL, "rotation_period" integer NOT NULL, "orbital_period" integer NOT NULL, "diameter" integer NOT NULL, "climate" character varying NOT NULL, "gravity" character varying NOT NULL, "terrain" character varying NOT NULL, "surface_water" integer NOT NULL, "population" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d5fbc2513a6d4909fe31938b0fd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "planets_films" ("planetsId" integer NOT NULL, "filmsId" integer NOT NULL, CONSTRAINT "PK_ebb5b8558f8bfce84617c6d860c" PRIMARY KEY ("planetsId", "filmsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1b9e498a7b6714398614766c24" ON "planets_films" ("planetsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d7f4d68dc596fce125db571c77" ON "planets_films" ("filmsId") `,
    );
    await queryRunner.query(`ALTER TABLE "people" ADD "homeworldId" integer`);
    await queryRunner.query(
      `ALTER TABLE "people" ADD CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "planets_films" ADD CONSTRAINT "FK_1b9e498a7b6714398614766c245" FOREIGN KEY ("planetsId") REFERENCES "planets"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "planets_films" ADD CONSTRAINT "FK_d7f4d68dc596fce125db571c771" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_films" ADD CONSTRAINT "FK_f9d0038e205e511024d88b4c441" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_films" ADD CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "people_films" DROP CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_films" DROP CONSTRAINT "FK_f9d0038e205e511024d88b4c441"`,
    );
    await queryRunner.query(
      `ALTER TABLE "planets_films" DROP CONSTRAINT "FK_d7f4d68dc596fce125db571c771"`,
    );
    await queryRunner.query(
      `ALTER TABLE "planets_films" DROP CONSTRAINT "FK_1b9e498a7b6714398614766c245"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people" DROP CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6"`,
    );
    await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "homeworldId"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d7f4d68dc596fce125db571c77"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1b9e498a7b6714398614766c24"`,
    );
    await queryRunner.query(`DROP TABLE "planets_films"`);
    await queryRunner.query(`DROP TABLE "planets"`);
    await queryRunner.query(
      `ALTER TABLE "people_films" ADD CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "people_films" ADD CONSTRAINT "FK_f9d0038e205e511024d88b4c441" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
