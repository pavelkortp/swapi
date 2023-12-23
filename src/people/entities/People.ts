import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('people')
export class People {
  @PrimaryGeneratedColumn('identity')
  id: number;

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

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;
}
