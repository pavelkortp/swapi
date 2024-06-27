import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../images/entities/Image';
import { Vehicle } from './entities/Vehicle';
import { VehicleService } from './vehicle.service';
import { ImageService } from '../images/image.service';
import { VehiclesController } from './vehicles.controller';
import { UniqueNameConstraint } from './validation/unique-name.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Vehicle])],
  providers: [VehicleService, ImageService, UniqueNameConstraint],
  controllers: [VehiclesController],
})
export class VehicleModule {}
