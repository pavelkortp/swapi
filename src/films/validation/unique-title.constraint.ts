import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { FilmService } from '../film.service';
import { Inject, Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'isUniqueTitle', async: true })
@Injectable()
export class UniqueTitleConstraint implements ValidatorConstraintInterface {
  constructor(@Inject(FilmService) private filmsService: FilmService) {}

  defaultMessage(): string {
    return 'Row with current name already exists';
  }

  async validate(value: string): Promise<boolean> {
    return await this.filmsService.isUniqueName(value);
  }
}
