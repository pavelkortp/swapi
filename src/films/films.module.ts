import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueTitleConstraint } from './validation/unique-title.constraint';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { CommonService } from '../common/common.service';
import { CommonModule } from '../common/common.module';
import { Film } from './entities/Film';


@Module({
  imports: [forwardRef(() => CommonModule), TypeOrmModule.forFeature([Film])],
  providers: [UniqueTitleConstraint, FilmsService],
  controllers: [FilmsController],
  exports: [FilmsService],
})
export class FilmsModule {}
