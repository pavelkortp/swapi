import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';

export class UpdateStarshipDTO {
  @ApiProperty()
  @IsString()
  @Validate(UniqueNameConstraint)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  manufacturer?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cost_in_credits?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  length?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  max_atmosphering_speed?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  crew?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  passengers?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cargo_capacity?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  consumables?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  hyperdrive_rating?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  MGLT?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  starship_class?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  pilots?: number[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  films?: number[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  images?: number[];
}
