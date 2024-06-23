import { Column, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Planet } from "../../planets/entities/Planet";
import { People } from "../../people/entities/People";
import { Film } from "../../films/entities/Film";
import { Image } from "../../images/entities/Image";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Validate } from "class-validator";
import { UniqueTitleConstraint } from "../../films/validation/unique-title.constraint";

export class CreateSpecieDTO {
  @ApiProperty()
  @Validate(UniqueTitleConstraint)
  @IsString()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  skin_colors: string;

  @Column()
  hair_colors: string;

  @Column()
  eye_colors: string;

  @Column()
  average_lifespan: number;

  @ManyToOne(() => Planet)
  @JoinTable({ name: 'planets' })
  homeworld: Planet;

  @Column()
  language: string;

  @ManyToMany(() => People, (p: People) => p.species)
  @JoinTable({ name: 'species_people' })
  people: People[];

  @ManyToMany(() => Film, (f: Film) => f.species)
  @JoinTable({ name: 'species_films' })
  films: Film[];

  @ManyToMany(() => Image, () => Image)
  @JoinTable({ name: 'species_images' })
  images: Image[];
}
