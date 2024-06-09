import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from 'express';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/:id')
  async getImage(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const imageStream = await this.imageService.findOne(id);
    res.set({
      'Content-Type': 'image/jpg',
    });
    imageStream.pipe(res);
  }
}
