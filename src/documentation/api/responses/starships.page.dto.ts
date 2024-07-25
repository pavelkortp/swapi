import { GetStarshipDto } from '../../../starships/dto/get-starship.dto';
import { ApiProperty } from '@nestjs/swagger';
import { BASE_API_URL, Entities } from '../../../common/constants';

export class StarshipsPageDto implements ResponsePage<GetStarshipDto> {
  @ApiProperty({ example: '10' })
  count: string;

  @ApiProperty({
    example: BASE_API_URL + '/' + Entities.STARSHIPS + '/?page=2',
  })
  next: string;

  @ApiProperty({ example: 'null' })
  previous: string;

  @ApiProperty({ type: [GetStarshipDto] })
  results: GetStarshipDto[];
}
