import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';

export class CreatePlanetDto {
  @ApiProperty()
  @IsString()
  @Validate(UniqueNameConstraint)
  name: string;

  @ApiProperty()
  @IsString()
  rotation_period: string;

  @ApiProperty()
  @IsString()
  orbital_period: string;

  @ApiProperty()
  @IsString()
  diameter: string;

  @ApiProperty()
  @IsString()
  climate: string;

  @ApiProperty()
  @IsString()
  gravity: string;

  @ApiProperty()
  @IsString()
  terrain: string;

  @ApiProperty()
  @IsString()
  surface_water: string;

  @ApiProperty()
  @IsString()
  population: string;
}
