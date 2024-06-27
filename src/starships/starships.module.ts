import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from '../planets/entities/Planet';
import { Starship } from './entities/Starship';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { Image } from '../images/entities/Image';
import { ImageService } from '../images/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Starship, Planet, Image])],
  providers: [StarshipsService, UniqueNameConstraint, ImageService],
  controllers: [StarshipsController],
})
export class StarshipsModule {}
