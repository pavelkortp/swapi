import {
  IsArray,
  IsInt,
  IsNumber,
  isNumberString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePeopleDTO {
  @ApiProperty()
  @IsOptional()
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
  @IsArray()
  species?: number[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  vehicles?: number[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  starships?: number[];
}
