import { PresentDto } from '../../common/present.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Specie } from '../entities/specie.entity';

export class GetSpecieDto extends PresentDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  classification: string;

  @ApiProperty()
  designation: string;

  @ApiProperty()
  average_height: string;

  @ApiProperty()
  skin_colors: string;

  @ApiProperty()
  hair_colors: string;

  @ApiProperty()
  eye_colors: string;

  @ApiProperty()
  average_lifespan: string;

  @ApiProperty()
  homeworld: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  people: string[];

  @ApiProperty()
  films: string[];

  constructor(s: Specie) {
    super(s);
    this.setKeys(s);
    this.url = this.toLink('species', s.id);
  }
}
