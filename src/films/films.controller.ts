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
import { CreateFilmDTO } from './dto/create-film.dto';
import { FilmsService } from './films.service';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { ApiTags } from '@nestjs/swagger';
import { Page } from '../declarations';
import { GetFilmDTO } from './dto/get-film.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionalImagePipe } from '../pipes/optional-image.pipe';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private service: FilmsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body(ValidationPipe) f: CreateFilmDTO,
    @UploadedFiles(OptionalImagePipe)
    images?: Array<Express.Multer.File>,
  ): Promise<GetFilmDTO> {
    console.log(images);
    console.log(f);
    return new GetFilmDTO(await this.service.create(f, images));
  }

  @Get('copy')
  async copyPeople(): Promise<void> {
    let response: Response = await fetch('https://swapi.py4e.com/api/films');
    let res: { next: string; results: CreateFilmDTO[] } = await response.json();
    do {
      for (const e of res.results) {
        await this.service.create(e);
      }

      response = await fetch(res.next);
      res = await response.json();
    } while (res.next);
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name?: string,
  ): Promise<Page<GetFilmDTO>> {
    const [films, count] = await this.service.findAll(page, name);
    return {
      items: films.map((p) => new GetFilmDTO(p)),
      count,
      page,
    };
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
