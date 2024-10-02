import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { VehicleService } from '../vehicle.service';

@ValidatorConstraint()
@Injectable()
export class UniqueNameConstraint implements ValidatorConstraintInterface {
  constructor(@Inject(VehicleService) private service: VehicleService) {}

  defaultMessage(): string {
    return 'Vehicle with current name already exists';
  }

  async validate(value: string): Promise<boolean> {
    return await this.service.isUniqueName(value);
  }
}
