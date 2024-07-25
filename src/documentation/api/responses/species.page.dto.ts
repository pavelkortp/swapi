import { ApiProperty } from '@nestjs/swagger';
import { BASE_API_URL, Entities } from '../../../common/constants';
import { GetSpecieDto } from '../../../species/dto/get-specie.dto';

export class SpeciesPageDto implements ResponsePage<GetSpecieDto> {
  @ApiProperty({ example: '10' })
  count: string;

  @ApiProperty({ example: BASE_API_URL + '/' + Entities.SPECIES + '/?page=2' })
  next: string;

  @ApiProperty({ example: 'null' })
  previous: string;

  @ApiProperty({ type: [GetSpecieDto] })
  results: GetSpecieDto[];
}
