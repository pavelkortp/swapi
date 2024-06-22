import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { People } from './entities/People';
import { CreatePeopleDTO } from './dto/create-people.dto';
import { plainToClass } from 'class-transformer';
import { UpdatePeopleDTO } from './dto/update-people.dto';
import { ITEMS_PER_PAGE } from '../app.service';
import { UniqueNameChecker } from '../declarations';
import { ImageService } from '../images/image.service';
import { Image } from '../images/entities/Image';

@Injectable()
export class PeopleService implements UniqueNameChecker {
  constructor(
    @Inject(forwardRef(() => ImageService))
    private imageService: ImageService,
    @InjectRepository(People)
    private repository: Repository<People>,
  ) {}

  /**
   * Returns all people.
   */
  async findAll(page: number, name?: string): Promise<[People[], number]> {
    const skip: number = (page - 1) * ITEMS_PER_PAGE;
    const [items, count] = await this.repository.findAndCount({
      order: { created: 'DESC' },
      where: {
        name: ILike<string>(name ? `%${name}%` : '%%'),
      },
      skip,
      take: ITEMS_PER_PAGE,
      relations: [
        'films',
        'homeworld',
        'vehicles',
        'starships',
        'species',
        'images',
      ],
    });
    return [items, count];
  }

  /**
   * Searches people by id and return result.
   * @param id people id.
   * @return found people or null.
   */
  async findOne(id: number): Promise<People> {
    const res: People | null = await this.repository.findOne({
      where: { id },
      relations: ['films', 'homeworld', 'starships', 'species', 'images'],
    });
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  /**
   * Removes people by id.
   * @param id people id.
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
    p: CreatePeopleDTO,
    images?: Array<Express.Multer.File>,
  ): Promise<People> {
    const peopleEntity: People = plainToClass(People, p);
    let pImages = [];

    if (images) {
      pImages = await this.imageService.saveAll(images);
    }

    peopleEntity.images = pImages;
    return await this.repository.save(peopleEntity);
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
  ): Promise<People> {
    let pImages: Image[];
    if (images) {
      pImages = await this.imageService.saveAll(images);
    }
    console.log(p);
    const existingPeople: People = await this.repository.findOneBy({ id });
    Object.assign(existingPeople, p);
    existingPeople.images = pImages;
    await this.repository.save(existingPeople, { reload: true });
    return existingPeople;
  }

  public async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({
      name: ILike<string>(name),
    }));
  }
}
