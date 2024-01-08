import { People } from '../entities/People';

export class GetPeopleDto {
  url: string;

  name: string;

  birth_year: string;

  eye_color: string;

  gender: string;

  hair_color: string;

  height: string;

  mass: string;

  skin_color: string;

  films: string[];

  created: Date;

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
    this.films = p.films.map((e) => this.toLink('films', e.id));
    this.created = p.created;
    this.edited = p.edited;
    this.url = `http://localhost:3000/api/people/${p.id}`;
  }

  private toLink(name: EntityName, id: number): string {
    return `http://localhost:3000/api/${name}/${id}`;
  }
}
