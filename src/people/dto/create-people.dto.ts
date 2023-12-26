import { IsNumberString, IsString, Validate } from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePeopleDto {
  @ApiProperty()
  @IsString()
  @Validate(UniqueNameConstraint)
  name: string;

  @ApiProperty()
  @IsString()
  birth_year: string;

  @ApiProperty()
  @IsString()
  eye_color: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  hair_color: string;

  @ApiProperty()
  @IsNumberString()
  height: string;

  @ApiProperty()
  @IsNumberString()
  mass: string;

  @ApiProperty()
  @IsString()
  skin_color: string;
}
