import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { People } from './entities/People';

@Controller('people')
export class PeopleController {
  constructor(private service: PeopleService) {}

  @Post()
  async create(@Body() p: People) {
    await this.service.create(p);
  }

  @Get()
  async getAll() {
    return await this.service.findAll();
  }

  @Get('id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Patch('id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() p: People) {
    await this.service.update(id, p);
  }

  @Delete('id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id);
  }
}
