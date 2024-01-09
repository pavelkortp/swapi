import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { People } from './entities/People';
import { CreatePeopleDTO } from './dto/create-people.dto';
import { UpdatePeopleDTO } from './dto/update-people.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`people`)
@Controller('people')
export class PeopleController {
  constructor(private service: PeopleService) {}

  @Post()
  async create(@Body(ValidationPipe) p: CreatePeopleDTO): Promise<void> {
    await this.service.create(p);
  }

  @Get()
  async getAll(): Promise<People[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<People> {
    return await this.service.findOne(id);
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
