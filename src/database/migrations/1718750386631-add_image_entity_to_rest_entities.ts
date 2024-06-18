import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageEntityToRestEntities1718750386631 implements MigrationInterface {
    name = 'AddImageEntityToRestEntities1718750386631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "species_people" DROP CONSTRAINT "FK_8019a9b0a4e75b66f02bc76a7c1"`);
        await queryRunner.query(`ALTER TABLE "species_people" DROP CONSTRAINT "FK_3fcb52d51b8b93c9707ac164d8a"`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" DROP CONSTRAINT "FK_dddb9d7b6f97f1c21e8df59fe5a"`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" DROP CONSTRAINT "FK_50a5438d9a92e490f0a72772060"`);
        await queryRunner.query(`ALTER TABLE "starships_people" DROP CONSTRAINT "FK_26d0aa1855752c3b47b6703a69e"`);
        await queryRunner.query(`ALTER TABLE "starships_people" DROP CONSTRAINT "FK_917a4f5268f5c608fc22bb5f110"`);
        await queryRunner.query(`ALTER TABLE "people_films" DROP CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f"`);
        await queryRunner.query(`ALTER TABLE "people_films" DROP CONSTRAINT "FK_f9d0038e205e511024d88b4c441"`);
        await queryRunner.query(`ALTER TABLE "planets_films" DROP CONSTRAINT "FK_d7f4d68dc596fce125db571c771"`);
        await queryRunner.query(`ALTER TABLE "planets_films" DROP CONSTRAINT "FK_1b9e498a7b6714398614766c245"`);
        await queryRunner.query(`ALTER TABLE "starships_films" DROP CONSTRAINT "FK_eec7368a97fd52db1abdce959cb"`);
        await queryRunner.query(`ALTER TABLE "starships_films" DROP CONSTRAINT "FK_93b7fe60939bacb7164b891808a"`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" DROP CONSTRAINT "FK_de82f01b798a6cef935912973bf"`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" DROP CONSTRAINT "FK_c357b000f6771bf8bc35ef2ed55"`);
        await queryRunner.query(`ALTER TABLE "species_films" DROP CONSTRAINT "FK_c39d2aecfd9c301a9cd5bc3aef7"`);
        await queryRunner.query(`ALTER TABLE "species_films" DROP CONSTRAINT "FK_80755b97f28bfae4f163d389609"`);
        await queryRunner.query(`CREATE TABLE "species_images" ("speciesId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_b980dce820ff462528a5fb999b4" PRIMARY KEY ("speciesId", "imageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf6be92eb6716cc451c736badb" ON "species_images" ("speciesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce92b6f888f5caacc491d83dfd" ON "species_images" ("imageId") `);
        await queryRunner.query(`CREATE TABLE "starships_images" ("starshipsId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_dd716705c82a82fa26c0f2c1fdd" PRIMARY KEY ("starshipsId", "imageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f39e54f4f7ffb89f9390af040b" ON "starships_images" ("starshipsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7299b9a0302b0ab2b5d0aff51" ON "starships_images" ("imageId") `);
        await queryRunner.query(`CREATE TABLE "vehicles_images" ("vehiclesId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_e19ae61c3e6f732b42b5a772378" PRIMARY KEY ("vehiclesId", "imageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_309ef35d2399a0c937bc321b76" ON "vehicles_images" ("vehiclesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_11af6e8b1e75b65cde96635e74" ON "vehicles_images" ("imageId") `);
        await queryRunner.query(`CREATE TABLE "films_images" ("filmsId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_54567eceeeba0bbcfacc3e247a4" PRIMARY KEY ("filmsId", "imageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f2dbab9701b53b2215856d2be8" ON "films_images" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_329125a1694a819e4dc12376f0" ON "films_images" ("imageId") `);
        await queryRunner.query(`ALTER TABLE "planets_films" ADD CONSTRAINT "FK_1b9e498a7b6714398614766c245" FOREIGN KEY ("planetsId") REFERENCES "planets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "planets_films" ADD CONSTRAINT "FK_d7f4d68dc596fce125db571c771" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species_people" ADD CONSTRAINT "FK_3fcb52d51b8b93c9707ac164d8a" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species_people" ADD CONSTRAINT "FK_8019a9b0a4e75b66f02bc76a7c1" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species_films" ADD CONSTRAINT "FK_80755b97f28bfae4f163d389609" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species_films" ADD CONSTRAINT "FK_c39d2aecfd9c301a9cd5bc3aef7" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species_images" ADD CONSTRAINT "FK_cf6be92eb6716cc451c736badb1" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species_images" ADD CONSTRAINT "FK_ce92b6f888f5caacc491d83dfd0" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starships_people" ADD CONSTRAINT "FK_917a4f5268f5c608fc22bb5f110" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starships_people" ADD CONSTRAINT "FK_26d0aa1855752c3b47b6703a69e" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "starships_films" ADD CONSTRAINT "FK_93b7fe60939bacb7164b891808a" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starships_films" ADD CONSTRAINT "FK_eec7368a97fd52db1abdce959cb" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "starships_images" ADD CONSTRAINT "FK_f39e54f4f7ffb89f9390af040bc" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starships_images" ADD CONSTRAINT "FK_c7299b9a0302b0ab2b5d0aff512" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" ADD CONSTRAINT "FK_50a5438d9a92e490f0a72772060" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" ADD CONSTRAINT "FK_dddb9d7b6f97f1c21e8df59fe5a" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" ADD CONSTRAINT "FK_c357b000f6771bf8bc35ef2ed55" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" ADD CONSTRAINT "FK_de82f01b798a6cef935912973bf" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_images" ADD CONSTRAINT "FK_309ef35d2399a0c937bc321b761" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_images" ADD CONSTRAINT "FK_11af6e8b1e75b65cde96635e741" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_films" ADD CONSTRAINT "FK_f9d0038e205e511024d88b4c441" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_films" ADD CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_images" ADD CONSTRAINT "FK_f2dbab9701b53b2215856d2be81" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_images" ADD CONSTRAINT "FK_329125a1694a819e4dc12376f09" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "films_images" DROP CONSTRAINT "FK_329125a1694a819e4dc12376f09"`);
        await queryRunner.query(`ALTER TABLE "films_images" DROP CONSTRAINT "FK_f2dbab9701b53b2215856d2be81"`);
        await queryRunner.query(`ALTER TABLE "people_films" DROP CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f"`);
        await queryRunner.query(`ALTER TABLE "people_films" DROP CONSTRAINT "FK_f9d0038e205e511024d88b4c441"`);
        await queryRunner.query(`ALTER TABLE "vehicles_images" DROP CONSTRAINT "FK_11af6e8b1e75b65cde96635e741"`);
        await queryRunner.query(`ALTER TABLE "vehicles_images" DROP CONSTRAINT "FK_309ef35d2399a0c937bc321b761"`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" DROP CONSTRAINT "FK_de82f01b798a6cef935912973bf"`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" DROP CONSTRAINT "FK_c357b000f6771bf8bc35ef2ed55"`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" DROP CONSTRAINT "FK_dddb9d7b6f97f1c21e8df59fe5a"`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" DROP CONSTRAINT "FK_50a5438d9a92e490f0a72772060"`);
        await queryRunner.query(`ALTER TABLE "starships_images" DROP CONSTRAINT "FK_c7299b9a0302b0ab2b5d0aff512"`);
        await queryRunner.query(`ALTER TABLE "starships_images" DROP CONSTRAINT "FK_f39e54f4f7ffb89f9390af040bc"`);
        await queryRunner.query(`ALTER TABLE "starships_films" DROP CONSTRAINT "FK_eec7368a97fd52db1abdce959cb"`);
        await queryRunner.query(`ALTER TABLE "starships_films" DROP CONSTRAINT "FK_93b7fe60939bacb7164b891808a"`);
        await queryRunner.query(`ALTER TABLE "starships_people" DROP CONSTRAINT "FK_26d0aa1855752c3b47b6703a69e"`);
        await queryRunner.query(`ALTER TABLE "starships_people" DROP CONSTRAINT "FK_917a4f5268f5c608fc22bb5f110"`);
        await queryRunner.query(`ALTER TABLE "species_images" DROP CONSTRAINT "FK_ce92b6f888f5caacc491d83dfd0"`);
        await queryRunner.query(`ALTER TABLE "species_images" DROP CONSTRAINT "FK_cf6be92eb6716cc451c736badb1"`);
        await queryRunner.query(`ALTER TABLE "species_films" DROP CONSTRAINT "FK_c39d2aecfd9c301a9cd5bc3aef7"`);
        await queryRunner.query(`ALTER TABLE "species_films" DROP CONSTRAINT "FK_80755b97f28bfae4f163d389609"`);
        await queryRunner.query(`ALTER TABLE "species_people" DROP CONSTRAINT "FK_8019a9b0a4e75b66f02bc76a7c1"`);
        await queryRunner.query(`ALTER TABLE "species_people" DROP CONSTRAINT "FK_3fcb52d51b8b93c9707ac164d8a"`);
        await queryRunner.query(`ALTER TABLE "planets_films" DROP CONSTRAINT "FK_d7f4d68dc596fce125db571c771"`);
        await queryRunner.query(`ALTER TABLE "planets_films" DROP CONSTRAINT "FK_1b9e498a7b6714398614766c245"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_329125a1694a819e4dc12376f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2dbab9701b53b2215856d2be8"`);
        await queryRunner.query(`DROP TABLE "films_images"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11af6e8b1e75b65cde96635e74"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_309ef35d2399a0c937bc321b76"`);
        await queryRunner.query(`DROP TABLE "vehicles_images"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c7299b9a0302b0ab2b5d0aff51"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f39e54f4f7ffb89f9390af040b"`);
        await queryRunner.query(`DROP TABLE "starships_images"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce92b6f888f5caacc491d83dfd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf6be92eb6716cc451c736badb"`);
        await queryRunner.query(`DROP TABLE "species_images"`);
        await queryRunner.query(`ALTER TABLE "species_films" ADD CONSTRAINT "FK_80755b97f28bfae4f163d389609" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species_films" ADD CONSTRAINT "FK_c39d2aecfd9c301a9cd5bc3aef7" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" ADD CONSTRAINT "FK_c357b000f6771bf8bc35ef2ed55" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" ADD CONSTRAINT "FK_de82f01b798a6cef935912973bf" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "starships_films" ADD CONSTRAINT "FK_93b7fe60939bacb7164b891808a" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starships_films" ADD CONSTRAINT "FK_eec7368a97fd52db1abdce959cb" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "planets_films" ADD CONSTRAINT "FK_1b9e498a7b6714398614766c245" FOREIGN KEY ("planetsId") REFERENCES "planets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "planets_films" ADD CONSTRAINT "FK_d7f4d68dc596fce125db571c771" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_films" ADD CONSTRAINT "FK_f9d0038e205e511024d88b4c441" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_films" ADD CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "starships_people" ADD CONSTRAINT "FK_917a4f5268f5c608fc22bb5f110" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starships_people" ADD CONSTRAINT "FK_26d0aa1855752c3b47b6703a69e" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" ADD CONSTRAINT "FK_50a5438d9a92e490f0a72772060" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" ADD CONSTRAINT "FK_dddb9d7b6f97f1c21e8df59fe5a" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species_people" ADD CONSTRAINT "FK_3fcb52d51b8b93c9707ac164d8a" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species_people" ADD CONSTRAINT "FK_8019a9b0a4e75b66f02bc76a7c1" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
