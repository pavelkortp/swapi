import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';

export class UpdateSpecieDto {
  @ApiProperty()
  @Validate(UniqueNameConstraint)
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  classification?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  average_height?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  skin_colors?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  hair_colors?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  eye_colors?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  average_lifespan?: number;

  @ApiProperty()
  @IsString()
  @IsNumberString()
  @IsOptional()
  homeworld?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  language?: string;

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  people?: number[];

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  films?: number[];
}
