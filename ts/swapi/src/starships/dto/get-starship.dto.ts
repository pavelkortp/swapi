import { PresentDto } from '../../common/present.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Starship } from '../entities/starship.entity';

export class GetStarshipDto extends PresentDto {
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
  hyperdrive_rating: string;

  @ApiProperty()
  MGLT: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  starship_class?: string;

  @ApiProperty()
  pilots: string[];

  @ApiProperty()
  films: string[];

  @ApiProperty()
  images: string[];

  constructor(s: Starship) {
    super(s);
    this.setKeys(s);
    this.url = this.toLink('starships', s.id);
  }
}
