import { People } from '../entities/People';
import { ApiProperty } from '@nestjs/swagger';
import { Film } from '../../films/entities/Film';
import { EntityName } from '../../declarations';
import { Specie } from '../../species/entities/Specie';
import { Vehicle } from '../../vehicles/entities/Vehicle';
import { Starship } from '../../starships/entities/Starship';

export class GetPeopleDTO {
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
  created: Date;

  @ApiProperty()
  edited: Date;

  @ApiProperty()
  url: string;

  constructor(p: People) {
    this.name = p.name;
    this.birth_year = p.birth_year;
    this.eye_color = p.eye_color;
    this.gender = p.gender;
    this.hair_color = p.hair_color;
    this.height = p.height;
    this.mass = p.mass;
    this.skin_color = p.skin_color;
    this.homeworld = p.homeworld
      ? this.toLink('planets', p.homeworld.id)
      : 'null';
    this.films = p.films.map((f: Film) => this.toLink('films', f.id));
    this.species = p.species.map((s: Specie) => this.toLink('species', s.id));
    this.vehicles = p.vehicles.map((v: Vehicle) =>
      this.toLink('vehicles', v.id),
    );
    this.vehicles = p.starships.map((s: Starship) =>
      this.toLink('starships', s.id),
    );
    this.created = p.created;
    this.edited = p.edited;
    this.url = `http://localhost:3000/api/people/${p.id}`;
  }

  private toLink(name: EntityName, id: number): string {
    return `http://localhost:3000/api/${name}/${id}`;
  }
}
