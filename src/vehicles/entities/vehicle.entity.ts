import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { People } from '../../people/entities/people.entity';
import { Film } from '../../films/entities/film.entity';
import { Image } from '../../images/entities/image.entity';
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
  pilots: People[];

  @ManyToMany(() => Film, (f: Film) => f.vehicles)
  films: Film[];

  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];
}
