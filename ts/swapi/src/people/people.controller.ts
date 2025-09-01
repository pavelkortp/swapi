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
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetPeopleDto } from './dto/get-people.dto';
import { People } from './entities/people.entity';
import { Page } from '../declarations';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionalImagePipe } from '../pipes/optional-image.pipe';

@ApiTags(`people`)
@Controller('people')
export class PeopleController {
  constructor(private service: PeopleService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body(ValidationPipe) p: CreatePeopleDto,
    @UploadedFiles(OptionalImagePipe) images?: Express.Multer.File[],
  ): Promise<GetPeopleDto> {
    return new GetPeopleDto(await this.service.create(p, images));
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name?: string,
  ): Promise<Page<GetPeopleDto>> {
    const [people, count] = await this.service.findAll(page, name);
    return {
      items: people.map((p) => new GetPeopleDto(p)),
      count,
      page,
    };
  }

  @Get('copy')
  async copyPeople(): Promise<void> {
    let response: Response = await fetch('https://swapi.dev/api/people');
    let res: { next: string; results: CreatePeopleDto[] } =
      await response.json();
    do {
      for (const e of res.results) {
        // e.homeworld = e.homeworld?.split(/\/(\d+)\/$/)[1];
        e.homeworld = null;
        await this.service.create(e);
      }

      response = await fetch(res.next);
      res = await response.json();
    } while (res.next);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GetPeopleDto> {
    const p: People = await this.service.findOne(id);
    return new GetPeopleDto(p);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdatePeopleDto,
    @UploadedFiles(OptionalImagePipe) images?: Express.Multer.File[],
  ): Promise<GetPeopleDto> {
    return new GetPeopleDto(await this.service.update(id, p, images));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
