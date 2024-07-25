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
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionalImagePipe } from '../pipes/optional-image.pipe';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { GetStarshipDto } from './dto/get-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Entities } from '../common/constants';
import { StarshipsPageDto } from '../documentation/api/responses/starships.page.dto';
import { PageQueryDoc } from '../documentation/api/requests/page.query.doc.decorator';

@ApiTags(Entities.STARSHIPS)
@Controller(Entities.STARSHIPS)
export class StarshipsController {
  constructor(private service: StarshipsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiResponse({ type: GetStarshipDto })
  async create(
    @Body(ValidationPipe) p: CreateStarshipDto,
    @UploadedFiles(OptionalImagePipe)
    images?: Express.Multer.File[],
  ): Promise<GetStarshipDto> {
    return new GetStarshipDto(await this.service.create(p, images));
  }

  @Get()
  @ApiResponse({ type: StarshipsPageDto })
  @PageQueryDoc(Entities.STARSHIPS)
  async findAll(
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
  @ApiResponse({ type: GetStarshipDto })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetStarshipDto> {
    return new GetStarshipDto(await this.service.findOne(id));
  }

  // @Get('copy')
  // async copyStarships(): Promise<void> {
  //   let response: Response = await fetch('https://swapi.dev/api/starships');
  //   let res: { next: string; results: CreateStarshipDto[] } =
  //     await response.json();
  //   do {
  //     for (const e of res.results) {
  //       await this.service.create(e);
  //     }
  //
  //     response = await fetch(res.next);
  //     res = await response.json();
  //   } while (res.next);
  // }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiResponse({ type: GetStarshipDto })
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
