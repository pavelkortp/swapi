import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from 'express';
import { Stream } from 'stream';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    const imageStream: Stream = await this.imageService.findOne(id);
    res.set({
      'Content-Type': 'image/jpg',
    });
    imageStream.pipe(res);
  }
}
