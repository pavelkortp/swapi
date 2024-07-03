import {
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFilmDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  episode_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  opening_crawl?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  director?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  producer?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  release_date?: Date;

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  characters?: number[];

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  planets?: number[];

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  starships?: number[];

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  vehicles?: number[];

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  species?: number[];
}
