import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueTitleConstraint } from './validation/unique-title.constraint';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { CommonModule } from '../common/common.module';
import { Film } from './entities/film.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../middlewares/multer-config.service';

@Module({
  imports: [
    forwardRef(() => CommonModule),
    TypeOrmModule.forFeature([Film]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [UniqueTitleConstraint, FilmService],
  controllers: [FilmController],
  exports: [FilmService],
})
export class FilmModule {}
