import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Film } from '../../films/entities/Film';
import { Planet } from '../../planets/entities/Planet';
import { Specie } from '../../species/entities/Specie';

@Entity('people')
export class People {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  birth_year: string;

  @Column()
  eye_color: string;

  @Column()
  gender: string;

  @Column()
  hair_color: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  skin_color: string;

  @ManyToOne(() => Planet, (planet) => planet.residents)
  @JoinTable({ name: 'planets_people' })
  homeworld: Planet;

  @ManyToMany(() => Film, (film) => film.characters)
  @JoinTable({ name: 'people_films' })
  films: Film[];

  @ManyToMany(() => Specie, (specie) => specie.people)
  @JoinTable({ name: 'species_people' })
  species: Specie[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  edited: Date;
}
