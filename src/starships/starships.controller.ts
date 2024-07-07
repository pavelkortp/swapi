import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionalImagePipe } from '../pipes/optional-image.pipe';
import { Page } from '../declarations';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { GetStarshipDto } from './dto/get-starship.dto';
import { Starship } from './entities/starship.entity';
import { UpdateStarshipDto } from './dto/update-starship.dto';

@Controller('starships')
export class StarshipsController {
  constructor(private service: StarshipsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body(ValidationPipe) p: CreateStarshipDto,
    @UploadedFiles(OptionalImagePipe)
    images?: Express.Multer.File[],
  ): Promise<GetStarshipDto> {
    return new GetStarshipDto(await this.service.create(p, images));
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name?: string,
  ): Promise<Page<GetStarshipDto>> {
    const [starships, count] = await this.service.findAll(page, name);
    return {
      items: starships.map((starship) => new GetStarshipDto(starship)),
      count,
      page,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GetStarshipDto> {
    const s: Starship = await this.service.findOne(id);
    return new GetStarshipDto(s);
  }

  @Get('copy')
  async copyStarships(): Promise<void> {
    let response: Response = await fetch('https://swapi.dev/api/starships');
    let res: { next: string; results: CreateStarshipDto[] } =
      await response.json();
    do {
      for (const e of res.results) {
        await this.service.create(e);
      }

      response = await fetch(res.next);
      res = await response.json();
    } while (res.next);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdateStarshipDto,
    @UploadedFiles(OptionalImagePipe) images?: Express.Multer.File[],
  ): Promise<GetStarshipDto> {
    return new GetStarshipDto(await this.service.update(id, p, images));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
