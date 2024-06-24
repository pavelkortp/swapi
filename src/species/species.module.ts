import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './entities/Specie';
import { SpeciesService } from './species.service';
import { ImageService } from '../images/image.service';
import { SpeciesController } from './species.controller';
import { Image } from '../images/entities/Image';
import { PlanetsService } from '../planets/planets.service';
import { Planet } from '../planets/entities/Planet';
import { UniqueNameConstraint } from './validation/unique-name.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Specie, Image, Planet])],
  providers: [
    SpeciesService,
    ImageService,
    PlanetsService,
    UniqueNameConstraint,
  ],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
