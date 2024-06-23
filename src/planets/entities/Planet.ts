import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Film } from '../../films/entities/Film';
import { People } from '../../people/entities/People';
import { Image } from '../../images/entities/Image';
import { CommonEntity } from "../../common/CommonEntity";

@Entity('planets')
export class Planet  extends CommonEntity{
  @Column()
  name: string;

  @Column()
  rotation_period: string;
  @Column()
  orbital_period: string;

  @Column()
  diameter: string;

  @Column()
  climate: string;

  @Column()
  gravity: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: string;

  @Column()
  population: string;

  @ManyToMany(() => Image)
  @JoinTable({ name: 'planets_images' })
  images: Image[];

  @OneToMany(() => People, (p: People) => p.homeworld)
  @JoinTable({ name: 'planets_people' })
  residents: People[];

  @ManyToMany(() => Film, (f: Film) => f.characters)
  @JoinTable({ name: 'planets_films' })
  films: Film[];
}
