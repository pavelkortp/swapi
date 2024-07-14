import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Validate } from 'class-validator';
import { UniqueNameConstraint } from '../validation/unique-name.constraint';
import { IsStringNumber } from '../../validators/IsStringNumberConstraint';

export class CreateVehicleDto {
  @ApiProperty()
  @IsString()
  @Validate(UniqueNameConstraint)
  name: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @IsString()
  cost_in_credits: string;

  @ApiProperty()
  @IsString()
  length: string;

  @ApiProperty()
  @IsString()
  max_atmosphering_speed: string;

  @ApiProperty()
  @IsString()
  crew: string;

  @ApiProperty()
  @IsString()
  passengers: string;

  @ApiProperty()
  @IsString()
  cargo_capacity: string;

  @ApiProperty()
  @IsString()
  consumables: string;

  @ApiProperty()
  @IsString()
  vehicle_class: string;

  @ApiPropertyOptional({ example: ['1', '2', '3'] })
  @IsArray()
  @IsStringNumber({ each: true })
  @IsOptional()
  pilots?: number[];

  @ApiPropertyOptional({ example: ['1', '2', '3'] })
  @IsArray()
  @IsStringNumber({ each: true })
  @IsOptional()
  films?: number[];
}
