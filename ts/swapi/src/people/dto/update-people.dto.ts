import {
  IsArray,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';

export class UpdatePeopleDto {
  @ApiProperty()
  @IsOptional()
  @Validate(UniqueNameConstraint)
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  birth_year?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  eye_color?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hair_color?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  height?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  mass?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  skin_color?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  homeworld?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  films?: number[];

  @ApiProperty()
  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  species?: number[];

  @ApiProperty()
  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  vehicles?: number[];

  @ApiProperty()
  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  starships?: number[];
}
