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
import { CreateFilmDto } from './dto/create-film.dto';
import { FilmService } from './film.service';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiTags } from '@nestjs/swagger';
import { Page } from '../declarations';
import { GetFilmDto } from './dto/get-film.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionalImagePipe } from '../pipes/optional-image.pipe';

@ApiTags('films')
@Controller('films')
export class FilmController {
  constructor(private service: FilmService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body(ValidationPipe) f: CreateFilmDto,
    @UploadedFiles(OptionalImagePipe) images?: Express.Multer.File[],
  ): Promise<GetFilmDto> {
    return new GetFilmDto(await this.service.create(f, images));
  }

  @Get('copy')
  async copyFilms(): Promise<void> {
    let response: Response = await fetch('https://swapi.py4e.com/api/films');
    let res: { next: string; results: CreateFilmDto[] } = await response.json();
    do {
      for (const e of res.results) {
        await this.service.create(e);
      }

      response = await fetch(res.next);
      res = await response.json();
    } while (res.next);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name?: string,
  ): Promise<Page<GetFilmDto>> {
    const [films, count] = await this.service.findAll(page, name);
    return {
      items: films.map((film) => new GetFilmDto(film)),
      count,
      page,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GetFilmDto> {
    return new GetFilmDto(await this.service.findOne(id));
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) f: UpdateFilmDto,
    @UploadedFiles(OptionalImagePipe) images?: Express.Multer.File[],
  ): Promise<GetFilmDto> {
    return new GetFilmDto(await this.service.update(id, f, images));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
