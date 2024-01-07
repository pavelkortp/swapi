import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/People';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { FilmsModule } from '../films/films.module';
import { FilmsService } from '../films/films.service';
import { Film } from '../films/entities/Film';

@Module({
  imports: [
    TypeOrmModule.forFeature([People]),
    TypeOrmModule.forFeature([Film]),
    FilmsModule,
  ],
  controllers: [PeopleController],
  providers: [PeopleService, UniqueNameConstraint, FilmsService],
})
export class PeopleModule {}
