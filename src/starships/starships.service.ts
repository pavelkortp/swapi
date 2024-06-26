import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UniqueNameChecker } from '../declarations';
import { InjectRepository } from '@nestjs/typeorm';
import { Starship } from './entities/Starship';
import { ILike, Repository } from 'typeorm';
import { People } from '../people/entities/People';
import { ITEMS_PER_PAGE } from '../app.service';
import { plainToClass } from 'class-transformer';
import { UpdatePeopleDTO } from '../people/dto/update-people.dto';
import { Image } from '../images/entities/Image';
import { CreateStarshipDTO } from './dto/create-starship.dto';
import { ImageService } from '../images/image.service';

@Injectable()
export class StarshipsService implements UniqueNameChecker {
  constructor(
    @InjectRepository(Starship)
    private repository: Repository<Starship>,
    @Inject(forwardRef(() => ImageService))
    private imageService: ImageService,
  ) {}

  /**
   * Returns all Starships.
   */
  async findAll(page: number, name?: string): Promise<[Starship[], number]> {
    const skip: number = (page - 1) * ITEMS_PER_PAGE;
    const [items, count] = await this.repository.findAndCount({
      order: { created: 'DESC' },
      where: {
        name: ILike<string>(name ? `%${name}%` : '%%'),
      },
      skip,
      take: ITEMS_PER_PAGE,
      relations: ['films', 'pilots', 'images'],
    });
    return [items, count];
  }

  /**
   * Searches Starships by id and return result.
   * @param id Starship id.
   * @return found Starship or null.
   */
  async findOne(id: number): Promise<Starship> {
    const res: Starship | null = await this.repository.findOne({
      where: { id },
      relations: ['films', 'pilots', 'images'],
    });
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  /**
   * Removes Starship by id.
   * @param id Starship id.
   */
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Creates new people.
   * @param p new people.
   * @param images
   */
  async create(
    p: CreateStarshipDTO,
    images?: Array<Express.Multer.File>,
  ): Promise<Starship> {
    const starship: Starship = plainToClass(Starship, p);
    let pImages = [];

    if (images) {
      pImages = await this.imageService.saveAll(images);
    }

    starship.images = pImages;
    return await this.repository.save(starship);
  }

  /**
   * Updates people, by changing exists on current.
   * @param id people id.
   * @param p new people.
   * @param images
   */
  async update(
    id: number,
    p: UpdatePeopleDTO,
    images?: Array<Express.Multer.File>,
  ): Promise<Starship> {
    let pImages: Image[];
    if (images) {
      pImages = await this.imageService.saveAll(images);
    }
    const existingStarship: Starship = await this.repository.findOneBy({ id });
    Object.assign(existingStarship, p);
    existingStarship.images = pImages;
    await this.repository.save(existingStarship, { reload: true });
    return existingStarship;
  }

  async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({
      name: ILike<string>(name),
    }));
  }
}
