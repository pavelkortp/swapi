import { ApiProperty } from '@nestjs/swagger';
import { PresentDto } from '../../common/present.dto';
import { Film } from '../entities/film.entity';

export class GetFilmDto extends PresentDto {
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

  constructor(f: Film) {
    super(f);
    this.setKeys(f);
    this.url = this.toLink('films', f.id);
  }
}
