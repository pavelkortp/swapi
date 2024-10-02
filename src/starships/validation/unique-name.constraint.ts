import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { StarshipsService } from '../starships.service';

@ValidatorConstraint()
@Injectable()
export class UniqueNameConstraint implements ValidatorConstraintInterface {
  constructor(@Inject(StarshipsService) private service: StarshipsService) {}

  defaultMessage(): string {
    return 'Row with current name already exists';
  }

  async validate(value: string): Promise<boolean> {
    return await this.service.isUniqueName(value);
  }
}
