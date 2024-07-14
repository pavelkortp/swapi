import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Film } from '../../films/entities/film.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { Specie } from '../../species/entities/specie.entity';
import { Starship } from '../../starships/entities/starship.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Image } from '../../images/entities/image.entity';
import { CommonEntity } from '../../common/CommonEntity';

@Entity('people')
export class People extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  birth_year: string | null;

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

  @ManyToOne(() => Planet, (p: Planet) => p.residents)
  homeworld: Planet | null;

  @ManyToMany(() => Film, (f: Film) => f.characters)
  films: Film[];

  @ManyToMany(() => Specie, (s: Specie) => s.people)
  @JoinTable()
  species: Specie[];

  @ManyToMany(() => Vehicle, (v: Vehicle) => v.pilots)
  @JoinTable()
  vehicles: Vehicle[];

  @ManyToMany(() => Starship, (s: Starship) => s.pilots)
  @JoinTable()
  starships: Starship[];

  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];
}
