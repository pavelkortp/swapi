import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleService } from './vehicle.service';
import { VehiclesController } from './vehicles.controller';
import { UniqueNameConstraint } from './validation/unique-name.constraint';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    forwardRef(() => CommonModule),
  ],
  providers: [VehicleService, UniqueNameConstraint],
  controllers: [VehiclesController],
  exports: [VehicleService, TypeOrmModule.forFeature([Vehicle])],
})
export class VehiclesModule {}
