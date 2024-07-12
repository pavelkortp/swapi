import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './entities/specie.entity';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { CommonModule } from '../common/common.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../middlewares/multer-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Specie]),
    forwardRef(() => CommonModule),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [SpeciesService, UniqueNameConstraint],
  controllers: [SpeciesController],
  exports: [SpeciesService, TypeOrmModule.forFeature([Specie])],
})
export class SpeciesModule {}
