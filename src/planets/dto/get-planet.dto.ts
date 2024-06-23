import { PresentDTO } from "../../common/present.dto";
import { ApiProperty } from "@nestjs/swagger";

export class GetPlanetDTO extends PresentDTO{
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
}
