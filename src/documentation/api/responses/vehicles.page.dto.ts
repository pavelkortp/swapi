import { GetVehicleDto } from '../../../vehicles/dto/get-vehicle.dto';
import { ApiProperty } from '@nestjs/swagger';
import { BASE_API_URL, Entities } from '../../../common/constants';

export class VehiclesPageDto implements ResponsePage<GetVehicleDto> {
  @ApiProperty({ example: '10' })
  count: string;

  @ApiProperty({ example: BASE_API_URL + '/' + Entities.VEHICLES + '/?page=2' })
  next: string;

  @ApiProperty({ example: 'null' })
  previous: string;

  @ApiProperty({ type: [GetVehicleDto] })
  results: GetVehicleDto[];
}
