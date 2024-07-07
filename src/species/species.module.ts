import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './entities/Specie';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Specie]), forwardRef(() => CommonModule)],
  providers: [SpeciesService, UniqueNameConstraint],
  controllers: [SpeciesController],
  exports: [SpeciesService, TypeOrmModule.forFeature([Specie])],
})
export class SpeciesModule {}
