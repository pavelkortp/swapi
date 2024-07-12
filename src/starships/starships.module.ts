import { forwardRef, Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { CommonModule } from '../common/common.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../middlewares/multer-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starship]),
    forwardRef(() => CommonModule),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [StarshipsService, UniqueNameConstraint],
  controllers: [StarshipsController],
  exports: [StarshipsService, TypeOrmModule.forFeature([Starship])],
})
export class StarshipsModule {}
