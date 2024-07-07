import { Module, forwardRef } from '@nestjs/common';
import { ImageModule } from '../images/image.module';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { PlanetsModule } from '../planets/planets.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { SpeciesModule } from '../species/species.module';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from '../people/entities/People';
import { Planet } from '../planets/entities/Planet';
import { Film } from '../films/entities/Film';
import { Image } from '../images/entities/Image';
import { Specie } from '../species/entities/Specie';
import { Vehicle } from '../vehicles/entities/Vehicle';
import { Starship } from '../starships/entities/Starship';

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
    forwardRef(() => FilmsModule),
    forwardRef(() => PlanetsModule),
    forwardRef(() => StarshipsModule),
    forwardRef(() => VehiclesModule),
    forwardRef(() => SpeciesModule),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
