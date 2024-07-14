import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueTitleConstraint } from '../validation/unique-title.constraint';
import { IsStringNumber } from '../../validators/IsStringNumberConstraint';

export class CreateFilmDto {
  @ApiProperty()
  @Validate(UniqueTitleConstraint)
  @IsString()
  title: string;

  @ApiProperty()
  @IsStringNumber()
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
  @IsDateString({ strict: false })
  release_date: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsStringNumber({ each: true })
  @IsOptional()
  characters?: number[] = [];

  @ApiPropertyOptional()
  @IsArray()
  @IsStringNumber({ each: true })
  @IsOptional()
  planets?: number[];

  @ApiPropertyOptional()
  @IsArray()
  @IsStringNumber({ each: true })
  @IsOptional()
  starships?: number[];

  @ApiPropertyOptional()
  @IsArray()
  @IsStringNumber({ each: true })
  @IsOptional()
  vehicles?: number[];

  @ApiPropertyOptional()
  @IsArray()
  @IsStringNumber({ each: true })
  @IsOptional()
  species?: number[];
}
