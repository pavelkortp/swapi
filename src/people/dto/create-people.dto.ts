import { IsNumberString, IsString, Validate } from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';

export class CreatePeopleDto {
  @IsString()
  @Validate(UniqueNameConstraint)
  name: string;

  @IsString()
  birth_year: string;

  @IsString()
  eye_color: string;

  @IsString()
  gender: string;

  @IsString()
  hair_color: string;

  @IsNumberString()
  height: string;

  @IsNumberString()
  mass: string;

  @IsString()
  skin_color: string;
}
