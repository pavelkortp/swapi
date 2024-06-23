import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Film } from '../../films/entities/Film';
import { People } from '../../people/entities/People';
import { Image } from '../../images/entities/Image';
import { CommonEntity } from "../../common/CommonEntity";

@Entity('starships')
export class Starship extends CommonEntity{
  @Column({ unique: true })
  name: string;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: string;

  @Column()
  length: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @Column()
  hyperdrive_rating: string;

  @Column()
  MGLT: string;

  @Column()
  starship_class: string;

  @ManyToMany(() => People, (p: People) => p.starships)
  @JoinTable({ name: 'starships_people' })
  pilots: People[];

  @ManyToMany(() => Film, (f: Film) => f.starships)
  @JoinTable({ name: 'starships_films' })
  films: Film[];

  @ManyToMany(() => Image, () => Image)
  @JoinTable({ name: 'starships_images' })
  images: Image[];
}
