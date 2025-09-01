import { People } from '../entities/people.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PresentDto } from '../../common/present.dto';

export class GetPeopleDto extends PresentDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  birth_year: string;

  @ApiProperty()
  eye_color: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  hair_color: string;

  @ApiProperty()
  height: string;

  @ApiProperty()
  mass: string;

  @ApiProperty()
  skin_color: string;

  @ApiProperty()
  homeworld: string;

  @ApiProperty()
  films: string[];

  @ApiProperty()
  species: string[];

  @ApiProperty()
  vehicles: string[];

  @ApiProperty()
  starships: string[];

  @ApiProperty()
  images: string[];

  constructor(p: People) {
    super(p);
    this.setKeys(p);
    this.url = this.toLink('people', p.id);
    this.homeworld = p.homeworld
      ? this.toLink('planets', p.homeworld.id)
      : 'null';
  }
}
