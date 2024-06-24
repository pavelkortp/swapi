import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeSpeciesHomeworld1719232986633 implements MigrationInterface {
    name = 'ChangeSpeciesHomeworld1719232986633'

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
        await queryRunner.query(`ALTER TABLE "planets_films" ADD CONSTRAINT "FK_1b9e498a7b6714398614766c245" FOREIGN KEY ("planetsId") REFERENCES "planets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "planets_films" ADD CONSTRAINT "FK_d7f4d68dc596fce125db571c771" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species_people" ADD CONSTRAINT "FK_3fcb52d51b8b93c9707ac164d8a" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species_people" ADD CONSTRAINT "FK_8019a9b0a4e75b66f02bc76a7c1" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species_films" ADD CONSTRAINT "FK_80755b97f28bfae4f163d389609" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species_films" ADD CONSTRAINT "FK_c39d2aecfd9c301a9cd5bc3aef7" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "starships_people" ADD CONSTRAINT "FK_917a4f5268f5c608fc22bb5f110" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starships_people" ADD CONSTRAINT "FK_26d0aa1855752c3b47b6703a69e" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "starships_films" ADD CONSTRAINT "FK_93b7fe60939bacb7164b891808a" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starships_films" ADD CONSTRAINT "FK_eec7368a97fd52db1abdce959cb" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" ADD CONSTRAINT "FK_50a5438d9a92e490f0a72772060" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" ADD CONSTRAINT "FK_dddb9d7b6f97f1c21e8df59fe5a" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" ADD CONSTRAINT "FK_c357b000f6771bf8bc35ef2ed55" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" ADD CONSTRAINT "FK_de82f01b798a6cef935912973bf" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_films" ADD CONSTRAINT "FK_f9d0038e205e511024d88b4c441" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_films" ADD CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people_films" DROP CONSTRAINT "FK_a6ae8e23d835bdbc6b9fe43823f"`);
        await queryRunner.query(`ALTER TABLE "people_films" DROP CONSTRAINT "FK_f9d0038e205e511024d88b4c441"`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" DROP CONSTRAINT "FK_de82f01b798a6cef935912973bf"`);
        await queryRunner.query(`ALTER TABLE "vehicles_films" DROP CONSTRAINT "FK_c357b000f6771bf8bc35ef2ed55"`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" DROP CONSTRAINT "FK_dddb9d7b6f97f1c21e8df59fe5a"`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" DROP CONSTRAINT "FK_50a5438d9a92e490f0a72772060"`);
        await queryRunner.query(`ALTER TABLE "starships_films" DROP CONSTRAINT "FK_eec7368a97fd52db1abdce959cb"`);
        await queryRunner.query(`ALTER TABLE "starships_films" DROP CONSTRAINT "FK_93b7fe60939bacb7164b891808a"`);
        await queryRunner.query(`ALTER TABLE "starships_people" DROP CONSTRAINT "FK_26d0aa1855752c3b47b6703a69e"`);
        await queryRunner.query(`ALTER TABLE "starships_people" DROP CONSTRAINT "FK_917a4f5268f5c608fc22bb5f110"`);
        await queryRunner.query(`ALTER TABLE "species_films" DROP CONSTRAINT "FK_c39d2aecfd9c301a9cd5bc3aef7"`);
        await queryRunner.query(`ALTER TABLE "species_films" DROP CONSTRAINT "FK_80755b97f28bfae4f163d389609"`);
        await queryRunner.query(`ALTER TABLE "species_people" DROP CONSTRAINT "FK_8019a9b0a4e75b66f02bc76a7c1"`);
        await queryRunner.query(`ALTER TABLE "species_people" DROP CONSTRAINT "FK_3fcb52d51b8b93c9707ac164d8a"`);
        await queryRunner.query(`ALTER TABLE "planets_films" DROP CONSTRAINT "FK_d7f4d68dc596fce125db571c771"`);
        await queryRunner.query(`ALTER TABLE "planets_films" DROP CONSTRAINT "FK_1b9e498a7b6714398614766c245"`);
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
