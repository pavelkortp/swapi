import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlanetDTO {
  @ApiProperty()
  @IsString()
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

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  films?: number[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  residents?: number[];
}
