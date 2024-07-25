import { GetPeopleDto } from '../../../people/dto/get-people.dto';
import { ApiProperty } from '@nestjs/swagger';
import { BASE_API_URL, Entities } from '../../../common/constants';

export class PeoplePageDto implements ResponsePage<GetPeopleDto> {
  @ApiProperty({ example: '10' })
  count: string;

  @ApiProperty({ example: BASE_API_URL + '/' + Entities.PEOPLE + '/?page=2' })
  next: string;

  @ApiProperty({ example: 'null' })
  previous: string;

  @ApiProperty({ type: [GetPeopleDto] })
  results: GetPeopleDto[];
}
