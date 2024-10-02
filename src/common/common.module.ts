import { Module, forwardRef } from '@nestjs/common';
import { ImageModule } from '../images/image.module';
import { PeopleModule } from '../people/people.module';
import { FilmModule } from '../films/film.module';
import { PlanetsModule } from '../planets/planets.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { SpeciesModule } from '../species/species.module';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from '../people/entities/people.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Film } from '../films/entities/film.entity';
import { Image } from '../images/entities/image.entity';
import { Specie } from '../species/entities/specie.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Starship } from '../starships/entities/starship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People,
      Planet,
      Film,
      Image,
      Specie,
      Vehicle,
      Starship,
    ]),
    forwardRef(() => ImageModule),
    forwardRef(() => PeopleModule),
    forwardRef(() => FilmModule),
    forwardRef(() => PlanetsModule),
    forwardRef(() => StarshipsModule),
    forwardRef(() => VehiclesModule),
    forwardRef(() => SpeciesModule),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
