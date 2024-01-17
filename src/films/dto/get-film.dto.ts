import { Film } from '../entities/Film';
import { ApiProperty } from '@nestjs/swagger';
import { EntityName } from '../../declarations';
import { People } from '../../people/entities/People';
import { Planet } from '../../planets/entities/Planet';
import { Starship } from '../../starships/entities/Starship';
import { Vehicle } from '../../vehicles/entities/Vehicle';
import { Specie } from '../../species/entities/Specie';

export class GetFilmDTO {
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
    this.title = f.title;
    this.episode_id = f.episode_id;
    this.opening_crawl = f.opening_crawl;
    this.director = f.director;
    this.producer = f.producer;
    this.release_date = f.release_date;
    this.characters = f.characters.map((c: People) =>
      this.toLink('people', c.id),
    );
    this.planets = f.planets.map((p: Planet) => this.toLink('planets', p.id));
    this.starships = f.starships.map((s: Starship) =>
      this.toLink('starships', s.id),
    );
    this.vehicles = f.vehicles.map((v: Vehicle) =>
      this.toLink('vehicles', v.id),
    );
    this.species = f.species.map((s: Specie) => this.toLink('species', s.id));
    this.created = f.created;
    this.edited = f.edited;
    this.url = this.toLink('films', f.id);
  }

  private toLink(name: EntityName, id: number): string {
    return `http://localhost:3000/api/${name}/${id}`;
  }
}
