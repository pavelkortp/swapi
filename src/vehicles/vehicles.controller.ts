import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
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
import { Vehicle } from './entities/Vehicle';
import { GetVehicleDTO } from './dto/get-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { CreateSpecieDTO } from '../species/dto/create-specie.dto';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(
    @Inject(VehicleService)
    private service: VehicleService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body(ValidationPipe) v: CreateVehicleDTO,
    @UploadedFiles(OptionalImagePipe)
    images?: Array<Express.Multer.File>,
  ): Promise<GetVehicleDTO> {
    return new GetVehicleDTO(await this.service.create(v, images));
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name?: string,
  ): Promise<Page<GetVehicleDTO>> {
    const [vehicles, count] = await this.service.findAll(page, name);
    return {
      items: vehicles.map((p) => new GetVehicleDTO(p)),
      count,
      page,
    };
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetVehicleDTO> {
    const v: Vehicle = await this.service.findOne(id);
    return new GetVehicleDTO(v);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdateVehicleDTO,
    @UploadedFiles(OptionalImagePipe)
    images?: Array<Express.Multer.File>,
  ): Promise<GetVehicleDTO> {
    return new GetVehicleDTO(await this.service.update(id, p, images));
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
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
