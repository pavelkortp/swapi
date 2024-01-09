import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/Planet';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';

@Module({
  controllers: [PlanetsController],
  imports: [TypeOrmModule.forFeature([Planet])],
  providers: [PlanetsService],
})
export class PlanetsModule {}
