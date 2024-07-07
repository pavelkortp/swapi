import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { People } from '../../people/entities/people.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { Specie } from '../../species/entities/specie.entity';
import { Starship } from '../../starships/entities/starship.entity';
import { Vehicle } from '../../vehicles/entities/Vehicle';
import { Image } from '../../images/entities/image.entity';
import { CommonEntity } from '../../common/CommonEntity';

@Entity('films')
export class Film extends CommonEntity {
  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column()
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @CreateDateColumn()
  release_date: Date;

  @ManyToMany(() => People, (p: People) => p.films)
  @JoinTable({ name: 'people_films' })
  characters: People[];

  @ManyToMany(() => Planet, (p: Planet) => p.films)
  @JoinTable({ name: 'planets_films' })
  planets: Planet[];

  @ManyToMany(() => Starship, (s: Starship) => s.films)
  @JoinTable({ name: 'starships_films' })
  starships: Starship[];

  @ManyToMany(() => Vehicle, (v: Vehicle) => v.films)
  @JoinTable({ name: 'vehicles_films' })
  vehicles: Vehicle[];

  @ManyToMany(() => Specie, (s: Specie) => s.films)
  @JoinTable({ name: 'species_films' })
  species: Specie[];

  @ManyToMany(() => Image, () => Image)
  @JoinTable({ name: 'films_images' })
  images: Image[];
}
