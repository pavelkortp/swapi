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
import { GetSpecieDto } from './dto/get-specie.dto';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(private service: SpeciesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body(ValidationPipe) createSpecieDto: CreateSpecieDto,
    @UploadedFiles(OptionalImagePipe)
    images?: Express.Multer.File[],
  ): Promise<GetSpecieDto> {
    return new GetSpecieDto(await this.service.create(createSpecieDto, images));
  }

  @Get('copy')
  async copySpecies(): Promise<void> {
    let response: Response = await fetch('https://swapi.dev/api/species');
    let res: { next: string; results: CreateSpecieDto[] } =
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
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name?: string,
  ): Promise<Page<GetSpecieDto>> {
    const [species, count] = await this.service.findAll(page, name);
    return {
      items: species.map((specie) => new GetSpecieDto(specie)),
      count,
      page,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GetSpecieDto> {
    return new GetSpecieDto(await this.service.findOne(id));
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateSpecieDto: UpdateSpecieDto,
    @UploadedFiles(OptionalImagePipe) images?: Express.Multer.File[],
  ): Promise<GetSpecieDto> {
    return new GetSpecieDto(
      await this.service.update(id, updateSpecieDto, images),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
