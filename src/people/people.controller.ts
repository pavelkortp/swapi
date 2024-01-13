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
  ValidationPipe,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDTO } from './dto/create-people.dto';
import { UpdatePeopleDTO } from './dto/update-people.dto';
import { ApiTags } from '@nestjs/swagger';
import { Page } from '../declarations';
import { GetPeopleDTO } from './dto/get-people.dto';

@ApiTags(`people`)
@Controller('people')
export class PeopleController {
  constructor(private service: PeopleService) {}

  @Post()
  async create(@Body(ValidationPipe) p: CreatePeopleDTO): Promise<void> {
    await this.service.create(p);
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<Page<GetPeopleDTO>> {
    return await this.service.findAll(page);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetPeopleDTO> {
    return new GetPeopleDTO(await this.service.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdatePeopleDTO,
  ): Promise<void> {
    await this.service.update(id, p);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
