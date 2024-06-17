import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/Planet';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { Image } from '../images/entities/Image';
import { ImageModule } from '../images/image.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../middlewares/multer-config.service';
import { ImageService } from '../images/image.service';

@Module({
  controllers: [PlanetsController],
  imports: [
    TypeOrmModule.forFeature([Planet, Image]),
    ImageModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [
    PlanetsService,
    UniqueNameConstraint,
    MulterConfigService,
    ImageService,
  ],
})
export class PlanetsModule {}
