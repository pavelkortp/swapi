import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { People } from '../../people/entities/People';
import { Planet } from '../../planets/entities/Planet';
import { Specie } from '../../species/entities/Specie';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('identity')
  id: number;

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

  @ManyToMany(() => People, (people) => people.films)
  @JoinTable({ name: 'people_films' })
  characters: People[];

  @ManyToMany(() => Planet, (planet) => planet.films)
  @JoinTable({ name: 'planets_films' })
  planets: Planet[];

  @ManyToMany(() => Specie, (specie) => specie.films)
  @JoinTable({ name: 'species_films' })
  species: Specie[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  edited: Date;
}
