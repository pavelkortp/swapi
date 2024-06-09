import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/People';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { Image } from '../images/entities/Image';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../middlewares/multer-config.service';
import { ImageModule } from '../images/image.module';
import { ImageService } from '../images/image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([People, Image]),
    ImageModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [PeopleController],
  providers: [
    PeopleService,
    UniqueNameConstraint,
    MulterConfigService,
    ImageService,
  ],
})
export class PeopleModule {}
