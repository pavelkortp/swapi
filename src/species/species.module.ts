import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './entities/Specie';
import { SpeciesService } from './species.service';

@Module({
  imports: [TypeOrmModule.forFeature([Specie])],
  providers: [SpeciesService],
  controllers: [],
})
export class SpeciesModule {}
