import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/Planet';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../middlewares/multer-config.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planet]),
    forwardRef(() => CommonModule),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService, UniqueNameConstraint, MulterConfigService],
  exports: [PlanetsService, TypeOrmModule.forFeature([Planet])],
})
export class PlanetsModule {}
