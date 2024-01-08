import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Film } from '../../films/entities/Film';
import { People } from '../../people/entities/People';

@Entity('planets')
export class Planet {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name: string;

  @Column()
  rotation_period: number;
  @Column()
  orbital_period: number;

  @Column()
  diameter: number;

  @Column()
  climate: string;

  @Column()
  gravity: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: number;

  @Column()
  population: string;

  @OneToMany(() => People, (people) => people.homeworld)
  @JoinTable({ name: 'planets_people' })
  residents: People[];

  @ManyToMany(() => Film, (film) => film.characters)
  @JoinTable({ name: 'planets_films' })
  films: Film[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  edited: Date;
}
