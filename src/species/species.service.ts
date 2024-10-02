import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specie } from './entities/specie.entity';
import { ILike, Repository } from 'typeorm';
import { ITEMS_PER_PAGE } from '../app.service';
import { plainToClass } from 'class-transformer';
import { UpdateSpecieDto } from './dto/update-specie.dto';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { CommonService } from '../common/common.service';
import { Image } from '../images/entities/image.entity';

@Injectable()
export class SpeciesService {
  private readonly relations = ['films', 'homeworld', 'people', 'images'];

  constructor(
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
    @InjectRepository(Specie) private repository: Repository<Specie>,
  ) {}

  /**
   * Returns all species.
   */
  async findAll(page: number, name?: string): Promise<[Specie[], number]> {
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
   * Searches people by id and return result.
   * @param id people id.
   * @return found people or null.
   */
  async findOne(id: number): Promise<Specie> {
    const res: Specie | null = await this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  /**
   * Removes people by id.
   * @param id specie id.
   */
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Creates new people.
   * @param p new specie.
   * @param images
   */
  async create(
    p: CreateSpecieDto,
    images?: Array<Express.Multer.File>,
  ): Promise<Specie> {
    const specieEntity: Specie = plainToClass(Specie, p);
    let pImages: Image[] = [];
    if (images) {
      pImages = await this.commonService.saveImages(images);
    }
    specieEntity.images = pImages;
    return await this.repository.save(specieEntity);
  }

  /**
   * Updates Specie, by changing exists on current.
   * @param id Specie's id.
   * @param specie Updated Specie.
   * @param images new Images for Specie.
   * @return Updated Specie.
   */
  async update(
    id: number,
    specie: UpdateSpecieDto,
    images?: Express.Multer.File[],
  ): Promise<Specie> {
    const existingSpecie: Specie = await this.repository.findOneBy({ id });
    Object.assign(existingSpecie, specie);
    if (images) {
      existingSpecie.images = await this.commonService.saveImages(images);
    }

    if (specie.films) {
      existingSpecie.films = await this.commonService.getFilms([
        ...new Set<number>(specie.films),
      ]);
    }

    if (specie.homeworld) {
      existingSpecie.homeworld = (
        await this.commonService.getPlanets([parseInt(specie.homeworld)])
      )[0];
    }

    if (specie.people) {
      existingSpecie.people = await this.commonService.getPeople([
        ...new Set<number>(specie.people),
      ]);
    }

    await this.repository.save(existingSpecie, { reload: true });
    return this.findOne(id);
  }

  public async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({
      name: ILike<string>(name),
    }));
  }
}
