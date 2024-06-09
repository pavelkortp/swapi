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
import { Film } from '../films/entities/Film';
import { ImageService } from '../images/image.service';

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
  async findAll(page: number): Promise<[People[], number]> {
    const skip: number = (page - 1) * ITEMS_PER_PAGE;
    const [items, count] = await this.repository.findAndCount({
      order: { created: 'DESC' },
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
    images: Array<Express.Multer.File>,
  ): Promise<People> {
    const pImages = await this.imageService.saveAll(images);
    const peopleEntity: People = plainToClass(People, p);
    peopleEntity.images = pImages;
    return await this.repository.save(peopleEntity);
  }

  /**
   * Updates people, by changing exists on current.
   * @param id people id.
   * @param p new people.
   */
  async update(id: number, p: UpdatePeopleDTO): Promise<People> {
    const existingPeople: People = await this.repository.findOneBy({ id });
    Object.assign(existingPeople, p);
    existingPeople.films = p.films.map((f) => {
      return { id: f } as Film;
    });
    await this.repository.save(existingPeople, { reload: true });
    return existingPeople;
  }

  public async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ name: ILike<string>(name) }));
  }
}
