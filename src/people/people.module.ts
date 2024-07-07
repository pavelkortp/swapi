import { forwardRef, Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/People';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../middlewares/multer-config.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([People]),
    forwardRef(() => CommonModule),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, UniqueNameConstraint, MulterConfigService],
  exports: [PeopleService, TypeOrmModule.forFeature([People])],
})
export class PeopleModule {}
