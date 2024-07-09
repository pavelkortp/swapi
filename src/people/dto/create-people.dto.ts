import {
  IsArray,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  homeworld: string | null;

  @ApiProperty()
  @IsNumberString()
  mass: string;

  @ApiProperty()
  @IsString()
  skin_color: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  films?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  species?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  vehicles?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  starships?: number[];
}
