import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Planet } from './entities/Planet';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UpdatePlanetDTO } from './dto/update-planet.dto';
import { CreatePlanetDTO } from './dto/create-planet.dto';

import { ITEMS_PER_PAGE } from '../app.service';
import { ImageService } from '../images/image.service';

@Injectable()
export class PlanetsService {
  constructor(
    @Inject(forwardRef(() => ImageService))
    private imageService: ImageService,
    @InjectRepository(Planet)
    private repository: Repository<Planet>,
  ) {}

  /**
   * Returns all Planets by page.
   * @param page page from planets list
   * @param name
   */
  async findAll(page: number, name?: string): Promise<[Planet[], number]> {
    console.log(name);
    const skip: number = (page - 1) * ITEMS_PER_PAGE;
    const [items, count] = await this.repository.findAndCount({
      order: { created: 'DESC' },
      where: {
        name: ILike<string>(name ? `%${name}%` : '%%'),
      },
      skip,
      take: ITEMS_PER_PAGE,
      relations: ['films', 'images', 'residents'],
    });
    return [items, count];
  }

  /**
   * Searches Planet by id and return result.
   * @param id Planet id.
   * @return found Planet or null.
   */
  async findOne(id: number): Promise<Planet> {
    const res: Planet | null = await this.repository.findOne({
      where: { id },
      relations: ['residents', 'films'],
    });
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  /**
   * Removes Planet by id.
   * @param id Planet id.
   */
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Creates new Planet.
   * @param p new Planet.
   * @param images
   */
  async create(
    p: CreatePlanetDTO,
    images?: Array<Express.Multer.File>,
  ): Promise<Planet> {
    const planet: Planet = plainToClass(Planet, p);
    let pImages = [];

    if (images) {
      pImages = await this.imageService.saveAll(images);
    }

    planet.images = pImages;
    return await this.repository.save(planet);
  }

  /**
   * Updates planets, by changing exists on current.
   * @param id people id.
   * @param p new planet.
   * @param images
   */
  async update(
    id: number,
    p: UpdatePlanetDTO,
    images: Array<Express.Multer.File>,
  ): Promise<Planet> {
    const pImages = await this.imageService.saveAll(images);
    const existingPlanet: Planet = await this.findOne(id);
    Object.assign(existingPlanet, p);
    existingPlanet.images = pImages;
    return await this.repository.save(existingPlanet, { reload: true });
  }

  /**
   * Checks if name is not exist in store.
   * @param name checked value.
   */
  public async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ name: ILike<string>(name) }));
  }
}
