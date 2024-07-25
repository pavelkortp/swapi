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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { GetPlanetDto } from './dto/get-planet.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionalImagePipe } from '../pipes/optional-image.pipe';
import { Entities } from '../common/constants';
import { PlanetsPageDto } from '../documentation/api/responses/planets.page.dto';
import { PageQueryDoc } from '../documentation/api/requests/page.query.doc.decorator';

@ApiTags(Entities.PLANETS)
@Controller(Entities.PLANETS)
export class PlanetsController {
  constructor(private service: PlanetsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiResponse({ type: GetPlanetDto })
  async create(
    @Body(ValidationPipe) p: CreatePlanetDto,
    @UploadedFiles(OptionalImagePipe)
    images?: Express.Multer.File[],
  ): Promise<GetPlanetDto> {
    return new GetPlanetDto(await this.service.create(p, images));
  }

  @Get()
  @ApiResponse({ type: PlanetsPageDto })
  @PageQueryDoc(Entities.PLANETS)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name: string,
  ): Promise<Page<GetPlanetDto>> {
    const [planets, count] = await this.service.findAll(page, name);
    return {
      items: planets.map((p) => new GetPlanetDto(p)),
      count,
      page,
    };
  }

  @Get(':id')
  @ApiResponse({ type: GetPlanetDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GetPlanetDto> {
    return new GetPlanetDto(await this.service.findOne(id));
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiResponse({ type: GetPlanetDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) p: UpdatePlanetDto,
    @UploadedFiles(OptionalImagePipe)
    images?: Express.Multer.File[],
  ): Promise<GetPlanetDto> {
    return new GetPlanetDto(await this.service.update(id, p, images));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }

  // @Get('copy')
  // async copyPlanets(): Promise<void> {
  //   let response: Response = await fetch('https://swapi.dev/api/planets');
  //
  //   let res: { next: string; results: CreatePlanetDto[] } =
  //     await response.json();
  //   console.log(res);
  //   do {
  //     for (const e of res.results) {
  //       await this.service.create(e);
  //     }
  //
  //     response = await fetch(res.next);
  //     res = await response.json();
  //   } while (res.next);
  // }
}
