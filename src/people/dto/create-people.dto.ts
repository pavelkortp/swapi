import {
  IsArray,
  IsNumberString,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsStringNumber } from '../../validators/IsStringNumberConstraint';

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
  @IsOptional()
  homeworld: string | null;

  @ApiProperty()
  @IsNumberString()
  mass: string;

  @ApiProperty()
  @IsString()
  skin_color: string;

  @ApiPropertyOptional({ example: ['1', '2', '3'] })
  @IsOptional()
  @IsStringNumber({ each: true })
  @IsArray()
  films?: number[];

  @ApiPropertyOptional({ example: ['1', '2', '3'] })
  @IsOptional()
  @IsStringNumber({ each: true })
  @IsArray()
  species?: number[];

  @ApiPropertyOptional({ example: ['1', '2', '3'] })
  @IsOptional()
  @IsStringNumber({ each: true })
  @IsArray()
  vehicles?: number[];

  @ApiPropertyOptional({ example: ['1', '2', '3'] })
  @IsOptional()
  @IsStringNumber({ each: true })
  @IsArray()
  starships?: number[];
}
