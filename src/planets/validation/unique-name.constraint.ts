import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PlanetsService } from '../planets.service';
import { Inject, Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'isUniqueName', async: true })
@Injectable()
export class UniqueNameConstraint implements ValidatorConstraintInterface {
  constructor(@Inject(PlanetsService) private planetService: PlanetsService) {}

  defaultMessage(): string {
    return 'Row with current name already exists';
  }

  async validate(value: string): Promise<boolean> {
    return await this.planetService.isUniqueName(value);
  }
}
