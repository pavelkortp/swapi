import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
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

@ApiTags(`people`)
@Controller('people')
export class PeopleController {
  constructor(private service: PeopleService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    images: Array<Express.Multer.File>,
    @Body(ValidationPipe) p: CreatePeopleDTO,
  ): Promise<GetPeopleDTO> {
    return new GetPeopleDTO(await this.service.create(p, images));
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<Page<GetPeopleDTO>> {
    const [people, count] = await this.service.findAll(page);
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdatePeopleDTO,
  ): Promise<GetPeopleDTO> {
    return new GetPeopleDTO(await this.service.update(id, p));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
