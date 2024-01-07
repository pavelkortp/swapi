import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PeopleService } from '../people.service.js';
import { Inject, Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'isUniqueName', async: true })
@Injectable()
export class UniqueNameConstraint implements ValidatorConstraintInterface {
  constructor(@Inject(PeopleService) private peopleService: PeopleService) {}

  defaultMessage(): string {
    return 'Row with current name already exists';
  }

  async validate(value: string): Promise<boolean> {
    return await this.peopleService.isUniqueName(value);
  }
}
