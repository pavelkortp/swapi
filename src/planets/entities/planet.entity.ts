import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Film } from '../../films/entities/film.entity';
import { People } from '../../people/entities/people.entity';
import { Image } from '../../images/entities/image.entity';
import { CommonEntity } from '../../common/CommonEntity';

@Entity('planets')
export class Planet extends CommonEntity {
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

  @OneToMany(() => People, (p: People) => p.homeworld)
  residents: People[];

  @ManyToMany(() => Film, (f: Film) => f.planets)
  films: Film[];

  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];
}
