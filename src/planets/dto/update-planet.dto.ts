import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';

export class UpdatePlanetDTO {
  @ApiProperty()
  @IsString()
  @Validate(UniqueNameConstraint)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  rotation_period?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  orbital_period?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  diameter?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  climate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gravity?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  terrain?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  surface_water?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  population?: string;
}
