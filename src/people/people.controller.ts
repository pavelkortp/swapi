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
import { CreatePeopleDTO } from './dto/create-people.dto';
import { UpdatePeopleDTO } from './dto/update-people.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetPeopleDTO } from './dto/get-people.dto';
import { People } from './entities/People';
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
    @Body(ValidationPipe) p: CreatePeopleDTO,
    @UploadedFiles(OptionalImagePipe)
    images?: Array<Express.Multer.File>,
  ): Promise<GetPeopleDTO> {
    console.log(images);
    console.log(p);
    return new GetPeopleDTO(await this.service.create(p, images));
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name?: string,
  ): Promise<Page<GetPeopleDTO>> {
    const [people, count] = await this.service.findAll(page, name);
    return {
      items: people.map((p) => new GetPeopleDTO(p)),
      count,
      page,
    };
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetPeopleDTO> {
    const p: People = await this.service.findOne(id);
    return new GetPeopleDTO(p);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdatePeopleDTO,
    @UploadedFiles(OptionalImagePipe)
    images?: Array<Express.Multer.File>,
  ): Promise<GetPeopleDTO> {
    console.log();
    return new GetPeopleDTO(await this.service.update(id, p, images));
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
