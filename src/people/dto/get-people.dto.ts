import { People } from '../entities/People';
import { ApiProperty } from '@nestjs/swagger';
import { Film } from '../../films/entities/Film';

export class GetPeopleDto {
  @ApiProperty()
  url: string;

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
  films: string[];

  @ApiProperty()
  created: Date;

  @ApiProperty()
  edited: Date;

  constructor(p: People) {
    this.name = p.name;
    this.birth_year = p.birth_year;
    this.eye_color = p.eye_color;
    this.gender = p.gender;
    this.hair_color = p.hair_color;
    this.height = p.height;
    this.mass = p.mass;
    this.skin_color = p.skin_color;
    this.films = p.films.map((e: Film) => this.toLink('films', e.id));
    this.created = p.created;
    this.edited = p.edited;
    this.url = `http://localhost:3000/api/people/${p.id}`;
  }

  private toLink(name: EntityName, id: number): string {
    return `http://localhost:3000/api/${name}/${id}`;
  }
}
