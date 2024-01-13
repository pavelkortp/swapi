import { People } from '../../people/entities/People';
import { Film } from '../../films/entities/Film';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';

export class CreatePlanetDTO {
  @ApiProperty()
  @IsString()
  @Validate(UniqueNameConstraint)
  name: string;

  @ApiProperty()
  @IsNumber()
  rotation_period: number;

  @ApiProperty()
  @IsNumber()
  orbital_period: number;

  @ApiProperty()
  @IsNumber()
  diameter: number;

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
  @IsNumber()
  surface_water: number;

  @ApiProperty()
  @IsString()
  population: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  residents: People[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  films: Film[];
}
