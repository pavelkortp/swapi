import { People } from '../entities/People';
import { ApiProperty } from '@nestjs/swagger';
import { BASE_URL } from '../../app.service';
import { ResponseDTO } from '../../declarations';

export class GetPeopleDTO implements ResponseDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  birth_year: string;

  @ApiProperty()
  eye_color: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  hair_color: string;

  @ApiProperty()
  height: string;

  @ApiProperty()
  mass: string;

  @ApiProperty()
  skin_color: string;

  @ApiProperty()
  homeworld: string;

  @ApiProperty()
  films: string[];

  @ApiProperty()
  species: string[];

  @ApiProperty()
  vehicles: string[];

  @ApiProperty()
  starships: string[];

  @ApiProperty()
  images: string[];

  @ApiProperty()
  created: Date;

  @ApiProperty()
  edited: Date;

  @ApiProperty()
  url: string;

  constructor(p: People) {
    for (const key in p) {
      if (Array.isArray(p[key])) {
        this[key] = p[key].map((e) => this.toLink(key, e.id));
      } else if (key == 'id') {
        continue;
      } else {
        this[key] = p[key];
      }
    }
    this.homeworld = p.homeworld
      ? this.toLink('planets', p.homeworld.id)
      : 'null';
    this.url = this.toLink('people', p.id);
  }

  toLink(name: string, id: number): string {
    return `${BASE_URL}/${name}/${id}/`;
  }
}
