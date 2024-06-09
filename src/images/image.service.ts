import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './entities/Image';
import { createReadStream } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Stream } from 'stream';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private repository: Repository<Image>,
  ) {}

  async save(image: Express.Multer.File): Promise<Image> {
    const newImage = { link: image.path };
    return await this.repository.save(newImage);
  }

  async findOne(id: number): Promise<Stream> {
    const image = await this.repository.findOne({ where: { id } });
    return createReadStream(image.link);
  }
}
