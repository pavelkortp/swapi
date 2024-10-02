import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stream } from 'stream';
import { createReadStream } from 'fs';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private repository: Repository<Image>,
  ) {}

  /**
   * Saves new Image in database and return it.
   * @param image Image from request.
   * @return Saved image.
   */
  async save(image: Express.Multer.File): Promise<Image> {
    const newImage = { link: image.path };
    return await this.repository.save(newImage);
  }

  /**
   * Saves array of images from request and return saved images.
   * @param images Array of images from request.
   * @return Array of saved images.
   */
  async saveAll(images: Express.Multer.File[]): Promise<Image[]> {
    return Promise.all(
      images.map(
        async (image: Express.Multer.File): Promise<Image> => this.save(image),
      ),
    );
  }

  /**
   * Searches image by id and return the result.
   * @param id Image's id.
   * @throws NotFoundExeption If image with current id not found.
   * @return Stream of found image.
   */
  async findOne(id: number): Promise<Stream> {
    const image: Image | null = await this.repository.findOne({
      where: { id },
    });
    if (!image) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }
    return createReadStream(image.link);
  }
}
