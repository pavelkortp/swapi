import {
  IsArray,
  IsInt,
  IsNumber,
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
  @IsNumber()
  @IsOptional()
  homeworld?: number;

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  films?: number[];

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  species?: number[];

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  vehicles?: number[];

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  starships?: number[];
}
