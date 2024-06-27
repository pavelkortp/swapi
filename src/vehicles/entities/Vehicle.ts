import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { People } from '../../people/entities/People';
import { Film } from '../../films/entities/Film';
import { Image } from '../../images/entities/Image';
import { CommonEntity } from '../../common/CommonEntity';

@Entity('vehicles')
export class Vehicle extends CommonEntity {
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
  vehicle_class: string;

  @ManyToMany(() => People, (p: People) => p.vehicles)
  @JoinTable({ name: 'vehicles_people' })
  pilots: People[];

  @ManyToMany(() => Film, (f: Film) => f.vehicles)
  @JoinTable({ name: 'vehicles_films' })
  films: Film[];

  @ManyToMany(() => Image, () => Image)
  @JoinTable({ name: 'vehicles_images' })
  images: Image[];
}
