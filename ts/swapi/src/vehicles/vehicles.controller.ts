import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionalImagePipe } from '../pipes/optional-image.pipe';
import { Page } from '../declarations';
import { VehicleService } from './vehicle.service';
import { GetVehicleDto } from './dto/get-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private service: VehicleService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body(ValidationPipe) v: CreateVehicleDto,
    @UploadedFiles(OptionalImagePipe) images?: Express.Multer.File[],
  ): Promise<GetVehicleDto> {
    return new GetVehicleDto(await this.service.create(v, images));
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name?: string,
  ): Promise<Page<GetVehicleDto>> {
    const [vehicles, count] = await this.service.findAll(page, name);
    return {
      items: vehicles.map((vehicle) => new GetVehicleDto(vehicle)),
      count,
      page,
    };
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetVehicleDto> {
    return new GetVehicleDto(await this.service.findOne(id));
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdateVehicleDTO,
    @UploadedFiles(OptionalImagePipe) images?: Express.Multer.File[],
  ): Promise<GetVehicleDto> {
    return new GetVehicleDto(await this.service.update(id, p, images));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }

  // @Get('copy')
  // async copyPeople(): Promise<void> {
  //   let response: Response = await fetch('https://swapi.dev/api/vehicles');
  //   let res: { next: string; results: CreateVehicleDTO[] } =
  //     await response.json();
  //   do {
  //     for (const e of res.results) {
  //       await this.service.create(e);
  //     }
  //
  //     response = await fetch(res.next);
  //     res = await response.json();
  //   } while (res.next);
  // }
}
