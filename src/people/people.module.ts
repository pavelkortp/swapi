import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/People';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { Image } from '../images/entities/Image';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../middlewares/multer-config.service';
import { ImageModule } from '../images/image.module';
import { ImageService } from '../images/image.service';
import { CommonService } from '../common/common.service';
import { Specie } from '../species/entities/Specie';
import { Film } from '../films/entities/Film';
import { Vehicle } from '../vehicles/entities/Vehicle';
import { FilmsService } from '../films/films.service';
import { PlanetsService } from '../planets/planets.service';
import { SpeciesService } from '../species/species.service';
import { StarshipsService } from '../starships/starships.service';
import { VehicleService } from '../vehicles/vehicle.service';
import { Planet } from '../planets/entities/Planet';
import { Starship } from '../starships/entities/Starship';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People,
      Image,
      Specie,
      Film,
      Vehicle,
      Planet,
      Starship,
    ]),
    ImageModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [PeopleController],
  providers: [
    PeopleService,
    UniqueNameConstraint,
    MulterConfigService,
    ImageService,
    FilmsService,
    PlanetsService,
    SpeciesService,
    StarshipsService,
    VehicleService,
    CommonService,
  ],
})
export class PeopleModule {}
