import { GetFilmDto } from '../../../films/dto/get-film.dto';
import { ApiProperty } from '@nestjs/swagger';
import { BASE_API_URL, Entities } from '../../../common/constants';

export class FilmsPageDto implements ResponsePage<GetFilmDto> {
  @ApiProperty({ example: '10' })
  count: string;

  @ApiProperty({ example: BASE_API_URL + '/' + Entities.FILMS + '/?page=2' })
  next: string;

  @ApiProperty({ example: 'null' })
  previous: string;

  @ApiProperty({ type: [GetFilmDto] })
  results: GetFilmDto[];
}
