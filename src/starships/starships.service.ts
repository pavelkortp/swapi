import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { ILike, Repository } from 'typeorm';
import { ITEMS_PER_PAGE } from '../common/constants';
import { plainToClass } from 'class-transformer';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class StarshipsService implements UniqueNameChecker {
  /**
   * Db entity relations.
   */
  private readonly relations = ['films', 'pilots', 'images'];

  constructor(
    @InjectRepository(Starship)
    private repository: Repository<Starship>,
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
  ) {}

  /**
   * Returns last 10 starships by the specified page and name, as well as the total
   * number of starships. If you use the name search, the total number of
   * starships with this name is returned.
   * @param page Number of page.
   * @param name Filter for starships name.
   * @return Array of starships at 0 index and count at index 1
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
      relations: this.relations,
    });
    return [items, count];
  }

  /**
   * Searches Starship by id and return result.
   * @param id Starship's id.
   * @throws NotFoundException If Starship with current id not found.
   * @return Found Starship.
   */
  async findOne(id: number): Promise<Starship> {
    const res: Starship | null = await this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!res) {
      throw new NotFoundException(`Starship with id ${id} not found`);
    }
    return res;
  }

  /**
   * Removes Starship by id.
   * @param id Starship's id.
   * @throws NotFoundException If Starship with current id not found.
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }

  /**
   * Creates new Starship.
   * @param starship New Starship.
   * @param images images for Starship.
   * @throws BadGatewayException If something went wrong with db
   * @return Created Starship.
   */
  async create(
    starship: CreateStarshipDto,
    images?: Express.Multer.File[],
  ): Promise<Starship> {
    const starshipEntity: Starship = plainToClass(Starship, starship);
    const savedStarship = await this.repository.save(starshipEntity);
    return await this.update(savedStarship.id, starship, images);
  }

  /**
   * Updates starship, by changing exists on current.
   * @param id Starship id.
   * @param starship New Starship.
   * @param images new Images for Starship.
   * @return Updated Starship.
   */
  async update(
    id: number,
    starship: UpdateStarshipDto,
    images?: Express.Multer.File[],
  ): Promise<Starship> {
    const existingStarship: Starship = await this.findOne(id);
    Object.assign(existingStarship, starship);
    if (images) {
      existingStarship.images = await this.commonService.saveImages(images);
    }

    if (starship.films) {
      existingStarship.films = await this.commonService.getFilms([
        ...new Set<number>(starship.films),
      ]);
    }

    if (starship.pilots) {
      existingStarship.pilots = await this.commonService.getPeople([
        ...new Set<number>(starship.pilots),
      ]);
    }

    await this.repository.save(existingStarship, { reload: true });
    return this.findOne(id);
  }

  async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({
      name: ILike<string>(name),
    }));
  }
}
