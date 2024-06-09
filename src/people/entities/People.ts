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
import { Starship } from '../../starships/entities/Starship';
import { Vehicle } from '../../vehicles/entities/Vehicle';
import { Image } from '../../images/entities/Image';

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

  @ManyToOne(() => Planet, (p: Planet) => p.residents)
  @JoinTable({ name: 'planets_people' })
  homeworld: Planet | null;

  @ManyToMany(() => Film, (f: Film) => f.characters)
  @JoinTable({ name: 'people_films' })
  films: Film[];

  @ManyToMany(() => Specie, (s: Specie) => s.people)
  @JoinTable({ name: 'species_people' })
  species: Specie[];

  @ManyToMany(() => Vehicle, (v: Vehicle) => v.pilots)
  @JoinTable({ name: 'vehicles_people' })
  vehicles: Vehicle[];

  @ManyToMany(() => Image)
  @JoinTable({ name: 'people_images' })
  images: Image[];

  @ManyToMany(() => Starship, (s: Starship) => s.pilots)
  @JoinTable({ name: 'starships_people' })
  starships: Starship[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  edited: Date;
}
