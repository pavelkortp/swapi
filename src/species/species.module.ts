import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './entities/Specie';
import { SpeciesService } from './species.service';
import { ImageService } from '../images/image.service';
import { SpeciesController } from './species.controller';
import { Image } from '../images/entities/Image';

@Module({
  imports: [TypeOrmModule.forFeature([Specie, Image])],
  providers: [SpeciesService, ImageService],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
