import { ApiProperty } from '@nestjs/swagger';
import { PresentDTO } from "../../common/present.dto";

export class GetFilmDTO extends PresentDTO{
  @ApiProperty()
  title: string;

  @ApiProperty()
  episode_id: number;

  @ApiProperty()
  opening_crawl: string;

  @ApiProperty()
  director: string;

  @ApiProperty()
  producer: string;

  @ApiProperty()
  release_date: Date;

  @ApiProperty()
  characters: string[];

  @ApiProperty()
  planets: string[];

  @ApiProperty()
  starships: string[];

  @ApiProperty()
  vehicles: string[];

  @ApiProperty()
  species: string[];
}
