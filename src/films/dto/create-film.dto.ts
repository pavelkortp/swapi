import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueTitleConstraint } from '../validation/unique-title.constraint';

export class CreateFilmDto {
  @ApiProperty()
  @Validate(UniqueTitleConstraint)
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  episode_id: number;

  @ApiProperty()
  @IsString()
  opening_crawl: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty()
  @IsString()
  producer: string;

  @ApiProperty()
  @IsDateString()
  release_date: string;

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  characters?: number[] = [];

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
