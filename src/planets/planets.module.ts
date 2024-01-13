import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/Planet';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { UniqueNameConstraint } from './validation/unique-name.constraint';

@Module({
  controllers: [PlanetsController],
  imports: [TypeOrmModule.forFeature([Planet])],
  providers: [PlanetsService, UniqueNameConstraint],
})
export class PlanetsModule {}
