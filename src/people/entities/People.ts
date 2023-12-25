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

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  edited: Date;
}
