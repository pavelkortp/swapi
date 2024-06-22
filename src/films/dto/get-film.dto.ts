import { Film } from '../entities/Film';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDTO } from '../../declarations';
import { BASE_URL } from '../../app.service';

export class GetFilmDTO implements ResponseDTO {
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

  @ApiProperty()
  created: Date;

  @ApiProperty()
  edited: Date;

  @ApiProperty()
  url: string;

  constructor(f: Film) {
    for (const key in f) {
      if (Array.isArray(f[key])) {
        this[key] = f[key].map((e) => this.toLink(key, e.id));
      } else if (key == 'id') {
        continue;
      } else {
        this[key] = f[key];
      }
    }

    this.url = this.toLink('films', f.id);
  }

  toLink(name: string, id: number): string {
    return `${BASE_URL}/${name}/${id}/`;
  }
}
