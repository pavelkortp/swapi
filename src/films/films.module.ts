import { Module } from '@nestjs/common';
import { UniqueTitleConstraint } from './validation/unique-title.constraint';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/Film';
import { ImageService } from '../images/image.service';
import { Image } from '../images/entities/Image';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Image])],
  providers: [UniqueTitleConstraint, FilmsService, ImageService],
  controllers: [FilmsController],
})
export class FilmsModule {}
