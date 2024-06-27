import { PresentDTO } from '../../common/present.dto';
import { Vehicle } from '../entities/Vehicle';
import { ApiProperty } from '@nestjs/swagger';

export class GetVehicleDTO extends PresentDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  cost_in_credits: string;

  @ApiProperty()
  length: string;

  @ApiProperty()
  max_atmosphering_speed: string;

  @ApiProperty()
  crew: string;

  @ApiProperty()
  passengers: string;

  @ApiProperty()
  cargo_capacity: string;

  @ApiProperty()
  consumables: string;

  @ApiProperty()
  vehicle_class: string;

  @ApiProperty()
  pilots: string[];

  @ApiProperty()
  films: string[];

  @ApiProperty()
  images: string[];

  constructor(v: Vehicle) {
    super(v);
    this.setKeys(v);
    this.url = this.toLink('vehicles', v.id);
  }
}
