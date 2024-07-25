import { GetPlanetDto } from '../../../planets/dto/get-planet.dto';
import { ApiProperty } from '@nestjs/swagger';
import { BASE_API_URL, Entities } from '../../../common/constants';

export class PlanetsPageDto implements ResponsePage<GetPlanetDto> {
  @ApiProperty({ example: '10' })
  count: string;

  @ApiProperty({ example: BASE_API_URL + '/' + Entities.PLANETS + '/?page=2' })
  next: string;

  @ApiProperty({ example: 'null' })
  previous: string;

  @ApiProperty({ type: [GetPlanetDto] })
  results: GetPlanetDto[];
}
