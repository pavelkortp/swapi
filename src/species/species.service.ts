import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specie } from './entities/Specie';
import { ILike, Repository } from 'typeorm';
import { People } from '../people/entities/People';
import { ITEMS_PER_PAGE } from '../app.service';
import { CreatePeopleDTO } from '../people/dto/create-people.dto';
import { plainToClass } from 'class-transformer';
import { Image } from '../images/entities/Image';
import { UpdateSpeciesDto } from './dto/update-specie.dto';
import { ImageService } from '../images/image.service';
import { CreateSpecieDTO } from './dto/create-specie.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject(forwardRef(() => ImageService))
    private imageService: ImageService,
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
      relations: ['films', 'homeworld', 'people', 'images'],
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
      relations: ['films', 'homeworld', 'people', 'images'],
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
    p: CreateSpecieDTO,
    images?: Array<Express.Multer.File>,
  ): Promise<Specie> {
    const specieEntity: Specie = plainToClass(Specie, p);
    let pImages = [];

    if (images) {
      pImages = await this.imageService.saveAll(images);
    }

    specieEntity.images = pImages;
    return await this.repository.save(specieEntity);
  }

  /**
   * Updates people, by changing exists on current.
   * @param id people id.
   * @param p new people.
   * @param images
   */
  async update(
    id: number,
    p: UpdateSpeciesDto,
    images?: Array<Express.Multer.File>,
  ): Promise<Specie> {
    let pImages: Image[];
    if (images) {
      pImages = await this.imageService.saveAll(images);
    }
    console.log(p);
    const existingSpecie: Specie = await this.repository.findOneBy({ id });
    Object.assign(existingSpecie, p);
    existingSpecie.images = pImages;
    await this.repository.save(existingSpecie, { reload: true });
    return existingSpecie;
  }

  public async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({
      name: ILike<string>(name),
    }));
  }
}
