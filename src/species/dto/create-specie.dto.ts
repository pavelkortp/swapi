import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';

export class CreateSpecieDTO {
  @ApiProperty()
  @Validate(UniqueNameConstraint)
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  classification: string;

  @ApiProperty()
  @IsString()
  designation: string;

  @ApiProperty()
  @IsString()
  average_height: string;

  @ApiProperty()
  @IsString()
  skin_colors: string;

  @ApiProperty()
  @IsString()
  hair_colors: string;

  @ApiProperty()
  @IsString()
  eye_colors: string;

  @ApiProperty()
  @IsString()
  average_lifespan: string;

  @ApiProperty()
  @IsString()
  homeworld: string;

  @ApiProperty()
  @IsString()
  language: string;
}
