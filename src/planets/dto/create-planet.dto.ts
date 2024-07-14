import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Validate } from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';
import { IsStringNumber } from '../../validators/IsStringNumberConstraint';

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

  @ApiPropertyOptional({ example: ['1', '2', '3'] })
  @IsArray()
  @IsOptional()
  @IsStringNumber({ each: true })
  films?: number[];

  @ApiPropertyOptional({ example: ['1', '2', '3'] })
  @IsArray()
  @IsOptional()
  @IsStringNumber({ each: true })
  residents?: number[];
}
