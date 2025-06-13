import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { People } from '../../people/entities/people.entity';
import { Film } from '../../films/entities/film.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { Image } from '../../images/entities/image.entity';
import { CommonEntity } from '../../common/CommonEntity';

@Entity('species')
export class Specie extends CommonEntity {
  @Column({ unique: true })
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
  average_lifespan: string;

  @ManyToOne(() => Planet, { nullable: true })
  @JoinColumn({ name: 'homeworldId' })
  homeworld: Planet | null;

  @Column()
  language: string;

  @ManyToMany(() => People, (p: People) => p.species)
  @JoinTable({ name: 'species_people' })
  people: People[];

  @ManyToMany(() => Film, (f: Film) => f.species)
  @JoinTable({ name: 'species_films' })
  films: Film[];

  @ManyToMany(() => Image, () => Image)
  @JoinTable({ name: 'species_images' })
  images: Image[];
}
