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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetFilmDto } from './dto/get-film.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionalImagePipe } from '../pipes/optional-image.pipe';
import { Entities } from '../common/constants';
import { FilmsPageDto } from '../documentation/api/responses/films.page.dto';
import { PageQueryDoc } from '../documentation/api/requests/page.query.doc.decorator';

@ApiTags(Entities.FILMS)
@Controller(Entities.FILMS)
export class FilmController {
  constructor(private service: FilmService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiResponse({ type: GetFilmDto })
  async create(
    @Body(ValidationPipe) f: CreateFilmDto,
    @UploadedFiles(OptionalImagePipe) images?: Express.Multer.File[],
  ): Promise<GetFilmDto> {
    return new GetFilmDto(await this.service.create(f, images));
  }

  // @Get('copy')
  // async copyFilms(): Promise<void> {
  //   let response: Response = await fetch('https://swapi.py4e.com/api/films');
  //   let res: { next: string; results: CreateFilmDto[] } = await response.json();
  //   do {
  //     for (const e of res.results) {
  //       await this.service.create(e);
  //     }
  //
  //     response = await fetch(res.next);
  //     res = await response.json();
  //   } while (res.next);
  // }

  @Get()
  @ApiResponse({ type: FilmsPageDto })
  @PageQueryDoc(Entities.FILMS)
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
  @ApiResponse({ type: GetFilmDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GetFilmDto> {
    return new GetFilmDto(await this.service.findOne(id));
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiResponse({ type: GetFilmDto })
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
