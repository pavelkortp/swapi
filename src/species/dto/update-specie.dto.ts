import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString } from 'class-validator';

export class UpdateSpeciesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  classification: string;

  @ApiProperty()
  @IsString()
  designation: string;

  @ApiProperty()
  @IsString()
  average_height: string;

  @ApiProperty()
  @IsString()
  skin_colors: string;

  @ApiProperty()
  @IsString()
  hair_colors: string;

  @ApiProperty()
  @IsString()
  eye_colors: string;

  @ApiProperty()
  @IsString()
  average_lifespan: number;

  @ApiProperty()
  @IsString()
  homeworld: string;

  @ApiProperty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  people: number[];

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  films: number[];
}
