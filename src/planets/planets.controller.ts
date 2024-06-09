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
import { GetPeopleDTO } from '../people/dto/get-people.dto';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private service: PlanetsService) {}

  @Post()
  async create(@Body(ValidationPipe) p: CreatePlanetDTO): Promise<void> {
    await this.service.create(p);
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<Page<GetPlanetDTO>> {
    const [planets, count] = await this.service.findAll(page);
    return {
      items: planets.map((p) => new GetPlanetDTO(p)),
      count,
      page,
    };
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
