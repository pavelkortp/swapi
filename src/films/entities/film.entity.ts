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
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
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
  @JoinTable()
  characters: People[];

  @ManyToMany(() => Planet, (p: Planet) => p.films)
  @JoinTable()
  planets: Planet[];

  @ManyToMany(() => Starship, (s: Starship) => s.films)
  @JoinTable()
  starships: Starship[];

  @ManyToMany(() => Vehicle, (v: Vehicle) => v.films)
  @JoinTable()
  vehicles: Vehicle[];

  @ManyToMany(() => Specie, (s: Specie) => s.films)
  @JoinTable()
  species: Specie[];

  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];
}
