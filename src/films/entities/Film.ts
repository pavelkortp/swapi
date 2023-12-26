import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column()
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @CreateDateColumn()
  release_date: Date;
  // characters: [
  //   "https://swapi.dev/api/people/1/",
  //   "https://swapi.dev/api/people/2/",
  //   "https://swapi.dev/api/people/3/",
  //   "https://swapi.dev/api/people/4/",
  //   "https://swapi.dev/api/people/5/",
  //   "https://swapi.dev/api/people/6/",
  //   "https://swapi.dev/api/people/7/",
  //   "https://swapi.dev/api/people/8/",
  //   "https://swapi.dev/api/people/9/",
  //   "https://swapi.dev/api/people/10/",
  //   "https://swapi.dev/api/people/12/",
  //   "https://swapi.dev/api/people/13/",
  //   "https://swapi.dev/api/people/14/",
  //   "https://swapi.dev/api/people/15/",
  //   "https://swapi.dev/api/people/16/",
  //   "https://swapi.dev/api/people/18/",
  //   "https://swapi.dev/api/people/19/",
  //   "https://swapi.dev/api/people/81/"
  // ],

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  edited: Date;
}
