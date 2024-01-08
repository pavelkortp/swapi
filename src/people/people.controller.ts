import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { People } from './entities/People';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { ApiTags } from '@nestjs/swagger';
import { ManyPeopleInterceptor } from './interceptor/many-people.interceptor';

@ApiTags(`people`)
@Controller('people')
export class PeopleController {
  constructor(private service: PeopleService) {}

  @Post()
  async create(@Body(ValidationPipe) p: CreatePeopleDto): Promise<void> {
    await this.service.create(p);
  }

  @Get()
  @UseInterceptors(ManyPeopleInterceptor)
  async getAll(): Promise<People[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<People | null> {
    return await this.service.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdatePeopleDto,
  ): Promise<void> {
    await this.service.update(id, p);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
