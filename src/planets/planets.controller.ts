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

import { PlanetsService } from './planets.service';
import { CreatePlanetDTO } from './dto/create-planet.dto';
import { UpdatePlanetDTO } from './dto/update-planet.dto';
import { Page } from '../declarations';
import { GetPlanetDTO } from './dto/get-planet.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionalImagePipe } from '../pipes/optional-image.pipe';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private service: PlanetsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body(ValidationPipe) p: CreatePlanetDTO,
    @UploadedFiles(OptionalImagePipe)
    images?: Array<Express.Multer.File>,
  ): Promise<GetPlanetDTO> {
    console.log(images);
    console.log(p);
    return new GetPlanetDTO(await this.service.create(p, images));
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name: string,
  ): Promise<Page<GetPlanetDTO>> {
    const [planets, count] = await this.service.findAll(page, name);
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
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdatePlanetDTO,
    @UploadedFiles(OptionalImagePipe)
    images?: Array<Express.Multer.File>,
  ): Promise<GetPlanetDTO> {
    return new GetPlanetDTO(await this.service.update(id, p, images));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
