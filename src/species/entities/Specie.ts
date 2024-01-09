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
import { People } from '../../people/entities/People';
import { Film } from '../../films/entities/Film';
import { Planet } from '../../planets/entities/Planet';

@Entity('species')
export class Specie {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  skin_colors: string;

  @Column()
  hair_colors: string;

  @Column()
  eye_colors: string;

  @Column()
  average_lifespan: number;

  @ManyToOne(() => Planet)
  @JoinTable({ name: 'planets' })
  homeworld: Planet;

  @Column()
  language: string;

  @ManyToMany(() => People, (p: People) => p.species)
  @JoinTable({ name: 'species_people' })
  people: People[];

  @ManyToMany(() => Film, (f: Film) => f.species)
  @JoinTable({ name: 'species_films' })
  films: Film[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  edited: Date;
}
