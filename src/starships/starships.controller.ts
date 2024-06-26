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
import { CreateStarshipDTO } from './dto/create-starship.dto';
import { GetStarshipDTO } from './dto/get-starship.dto';
import { Starship } from './entities/Starship';
import { UpdateStarshipDTO } from './dto/update-starship.dto';

@Controller('starships')
export class StarshipsController {
  constructor(
    @Inject(StarshipsService)
    private service: StarshipsService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body(ValidationPipe) p: CreateStarshipDTO,
    @UploadedFiles(OptionalImagePipe)
    images?: Array<Express.Multer.File>,
  ): Promise<GetStarshipDTO> {
    return new GetStarshipDTO(await this.service.create(p, images));
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name?: string,
  ): Promise<Page<GetStarshipDTO>> {
    const [starships, count] = await this.service.findAll(page, name);
    return {
      items: starships.map((p) => new GetStarshipDTO(p)),
      count,
      page,
    };
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetStarshipDTO> {
    const s: Starship = await this.service.findOne(id);
    return new GetStarshipDTO(s);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdateStarshipDTO,
    @UploadedFiles(OptionalImagePipe)
    images?: Array<Express.Multer.File>,
  ): Promise<GetStarshipDTO> {
    return new GetStarshipDTO(await this.service.update(id, p, images));
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
