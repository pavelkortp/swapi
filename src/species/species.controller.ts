import { SpeciesService } from './species.service';
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
import { GetSpeciesDto } from './dto/get-specie.dto';
import { CreateSpecieDTO } from './dto/create-specie.dto';
import { UpdateSpeciesDto } from './dto/update-specie.dto';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(private service: SpeciesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body(ValidationPipe) f: CreateSpecieDTO,
    @UploadedFiles(OptionalImagePipe)
    images?: Array<Express.Multer.File>,
  ): Promise<GetSpeciesDto> {
    console.log(images);
    console.log(f);
    return new GetSpeciesDto(await this.service.create(f, images));
  }

  @Get('copy')
  async copyPeople(): Promise<void> {
    let response: Response = await fetch('https://swapi.py4e.com/api/species');
    let res: { next: string; results: CreateSpecieDTO[] } =
      await response.json();
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
  ): Promise<Page<GetSpeciesDto>> {
    const [films, count] = await this.service.findAll(page, name);
    return {
      items: films.map((p) => new GetSpeciesDto(p)),
      count,
      page,
    };
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetSpeciesDto> {
    return new GetSpeciesDto(await this.service.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) s: UpdateSpeciesDto,
  ): Promise<void> {
    await this.service.update(id, s);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
