import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { People } from '../../people/entities/People';
import { Film } from '../../films/entities/Film';
import { Image } from '../../images/entities/Image';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('identity')
  id: number;

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

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  edited: Date;
}
