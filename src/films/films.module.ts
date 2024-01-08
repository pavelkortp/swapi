import { Module } from '@nestjs/common';
import { UniqueTitleConstraint } from './validation/unique-title.constraint';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/Film';
import { PeopleService } from '../people/people.service';
import { People } from '../people/entities/People';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]),
    TypeOrmModule.forFeature([People]),
  ],
  providers: [UniqueTitleConstraint, FilmsService, PeopleService],
  controllers: [FilmsController],
})
export class FilmsModule {}
