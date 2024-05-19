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
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PlanetsService } from './planets.service';
import { CreatePlanetDTO } from './dto/create-planet.dto';
import { UpdatePlanetDTO } from './dto/update-planet.dto';
import { Page } from '../declarations';
import { GetPlanetDTO } from './dto/get-planet.dto';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private service: PlanetsService) {}

  @Post()
  async create(@Body(ValidationPipe) p: CreatePlanetDTO): Promise<void> {
    await this.service.create(p);
  }

  // @Get('copy')
  // async copyPeople(): Promise<void> {
  //   let response: Response = await fetch('https://swapi.py4e.com/api/planets');
  //   let res: { next: string; results: CreatePlanetDTO[] } =
  //     await response.json();
  //   do {
  //     for (const e of res.results) {
  //       await this.service.create(e);
  //     }
  //     response = await fetch(res.next);
  //     res = await response.json();
  //   } while (res.next);
  // }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<Page<GetPlanetDTO>> {
    return await this.service.findAll(page);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetPlanetDTO> {
    return new GetPlanetDTO(await this.service.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdatePlanetDTO,
  ): Promise<void> {
    await this.service.update(id, p);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
