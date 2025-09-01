import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Inject, Injectable } from '@nestjs/common';
import { SpeciesService } from '../species.service';

@ValidatorConstraint({ name: 'isUniqueName', async: true })
@Injectable()
export class UniqueNameConstraint implements ValidatorConstraintInterface {
  constructor(@Inject(SpeciesService) private service: SpeciesService) {}

  defaultMessage(): string {
    return 'Row with current name already exists';
  }

  async validate(value: string): Promise<boolean> {
    return await this.service.isUniqueName(value);
  }
}
