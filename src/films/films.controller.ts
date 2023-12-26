import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { FilmsService } from './films.service';
import { Film } from './entities/Film';
import { UpdateFilmDto } from './dto/update-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private service: FilmsService) {}

  @Post()
  async create(@Body(ValidationPipe) f: CreateFilmDto): Promise<void> {
    await this.service.create(f);
  }

  @Get()
  async getAll(): Promise<Film[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Film | null> {
    return await this.service.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) f: UpdateFilmDto,
  ): Promise<void> {
    await this.service.update(id, f);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
