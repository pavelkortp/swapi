import { PresentDTO } from '../../common/present.dto';
import { ApiProperty } from '@nestjs/swagger';
import { People } from '../../people/entities/People';
import { Planet } from '../entities/Planet';

export class GetPlanetDTO extends PresentDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  rotation_period: string;

  @ApiProperty()
  orbital_period: string;

  @ApiProperty()
  diameter: string;

  @ApiProperty()
  climate: string;

  @ApiProperty()
  gravity: string;

  @ApiProperty()
  terrain: string;

  @ApiProperty()
  surface_water: string;

  @ApiProperty()
  population: string;

  constructor(p: Planet) {
    super(p);
    this.setKeys(p);
    this.url = this.toLink('planets', p.id);
  }
}
