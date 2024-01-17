import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/People';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { FilmsModule } from '../films/films.module';
import { FilmsService } from '../films/films.service';
import { Film } from '../films/entities/Film';
import { SpeciesService } from '../species/species.service';
import { SpeciesModule } from '../species/species.module';
import { Specie } from '../species/entities/Specie';

@Module({
  imports: [
    TypeOrmModule.forFeature([People, Film, Specie]),
    FilmsModule,
    SpeciesModule,
  ],
  controllers: [PeopleController],
  providers: [
    PeopleService,
    UniqueNameConstraint,
    FilmsService,
    SpeciesService,
  ],
})
export class PeopleModule {}
