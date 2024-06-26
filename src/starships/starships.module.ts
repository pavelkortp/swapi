import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from '../planets/entities/Planet';
import { Starship } from './entities/Starship';
import { UniqueNameConstraint } from './validation/unique-name.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Starship, Planet])],
  providers: [StarshipsService, UniqueNameConstraint],
  controllers: [StarshipsController],
})
export class StarshipsModule {}
