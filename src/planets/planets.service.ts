import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { ITEMS_PER_PAGE } from '../app.service';
import { CommonService } from '../common/common.service';
import { Image } from '../images/entities/image.entity';

@Injectable()
export class PlanetsService {
  /**
   * Db entity relations.
   */
  private readonly relations = ['films', 'images', 'residents'];

  constructor(
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
    @InjectRepository(Planet)
    private repository: Repository<Planet>,
  ) {}

  /**
   * Returns last 10 planets by the specified page and name, as well as the total
   * number of planets. If you use the title search, the total number of
   * planets with this name is returned.
   * @param page Number of page.
   * @param name Filter for planets name.
   * @return Array of planets at 0 index and count at index 1
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
      relations: this.relations,
    });
    return [items, count];
  }

  /**
   * Searches Planet by id and return result.
   * @param id Planet's id.
   * @throws NotFoundException If Planet with current id not found.
   * @return Found Planet.
   */
  async findOne(id: number): Promise<Planet> {
    const res: Planet | null = await this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!res) {
      throw new NotFoundException(`Planet with id ${id} not found`);
    }
    return res;
  }

  /**
   * Removes Planet by id.
   * @param id Planet's id.
   * @throws NotFoundException If Planet with current id not found.
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }

  /**
   * Creates new Planet.
   * @param planet New Planet.
   * @param images images for Planet.
   * @throws BadGatewayException If something went wrong with db
   * @return Created Planet.
   */
  async create(
    planet: CreatePlanetDto,
    images?: Express.Multer.File[],
  ): Promise<Planet> {
    const planetEntity: Planet = plainToClass(Planet, planet);
    let pImages: Image[] = [];

    if (images) {
      pImages = await this.commonService.saveImages(images);
    }

    planetEntity.images = pImages;
    return await this.repository.save(planetEntity);
  }

  /**
   * Updates planet, by changing exists on current.
   * @param id Planet id.
   * @param planet New Planet.
   * @param images new Images for Planet.
   * @return Updated Planet.
   */
  async update(
    id: number,
    planet: UpdatePlanetDto,
    images: Express.Multer.File[],
  ): Promise<Planet> {
    const existingPlanet: Planet = await this.findOne(id);
    Object.assign(existingPlanet, planet);
    if (images) {
      existingPlanet.images = await this.commonService.saveImages(images);
    }

    if (planet.residents) {
      existingPlanet.residents = await this.commonService.getPeople([
        ...new Set<number>(planet.residents),
      ]);
    }

    if (planet.films) {
      existingPlanet.films = await this.commonService.getFilms([
        ...new Set<number>(planet.films),
      ]);
    }

    await this.repository.save(existingPlanet, { reload: true });
    return this.findOne(id);
  }

  public async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ name: ILike<string>(name) }));
  }
}
