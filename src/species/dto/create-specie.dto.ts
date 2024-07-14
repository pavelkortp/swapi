import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumberString,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';
import { IsStringNumber } from '../../validators/IsStringNumberConstraint';

export class CreateSpecieDto {
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
  @IsNumberString()
  @IsOptional()
  homeworld: string | null;

  @ApiProperty()
  @IsString()
  language: string;

  @ApiPropertyOptional({ example: ['1', '2', '3'] })
  @IsArray()
  @IsStringNumber({ each: true })
  @IsOptional()
  people?: number[];

  @ApiPropertyOptional({ example: ['1', '2', '3'] })
  @IsArray()
  @IsStringNumber({ each: true })
  @IsOptional()
  films?: number[];
}
