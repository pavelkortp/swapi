import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueTitleConstraint } from '../validation/unique-title.constraint';

export class CreateFilmDTO {
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

  // @ApiProperty()
  // @IsArray()
  // characters: string[] | EntityPointer[];
  //
  // @ApiProperty()
  // @IsArray()
  // planets: string[] | EntityPointer[];

  // @ApiProperty()
  // starships: EntityPointer[];
  //
  // @ApiProperty()
  // vehicles: EntityPointer[];
  //
  // @ApiProperty()
  // species: EntityPointer[];
}
