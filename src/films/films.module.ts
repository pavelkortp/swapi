import { Module } from '@nestjs/common';
import { UniqueTitleConstraint } from './validation/unique-title.constraint';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/Film';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  providers: [UniqueTitleConstraint, FilmsService],
  controllers: [FilmsController],
})
export class FilmsModule {}
