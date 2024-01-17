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
import { CreateFilmDTO } from './dto/create-film.dto';
import { FilmsService } from './films.service';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { ApiTags } from '@nestjs/swagger';
import { Page } from '../declarations';
import { GetFilmDTO } from './dto/get-film.dto';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private service: FilmsService) {}

  @Post()
  async create(@Body(ValidationPipe) f: CreateFilmDTO): Promise<void> {
    await this.service.create(f);
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<Page<GetFilmDTO>> {
    return await this.service.findAll(page);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetFilmDTO> {
    return new GetFilmDTO(await this.service.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) f: UpdateFilmDTO,
  ): Promise<void> {
    await this.service.update(id, f);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
