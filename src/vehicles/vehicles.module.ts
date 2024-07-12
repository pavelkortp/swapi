import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleService } from './vehicle.service';
import { VehiclesController } from './vehicles.controller';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { CommonModule } from '../common/common.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../middlewares/multer-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    forwardRef(() => CommonModule),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [VehicleService, UniqueNameConstraint],
  controllers: [VehiclesController],
  exports: [VehicleService, TypeOrmModule.forFeature([Vehicle])],
})
export class VehiclesModule {}
