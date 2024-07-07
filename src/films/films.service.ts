import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/Film';
import { ILike, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateFilmDTO } from './dto/create-film.dto';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { ITEMS_PER_PAGE } from '../app.service';
import { UniqueNameChecker } from '../declarations';
import { CommonService } from '../common/common.service';
import { Image } from '../images/entities/Image';

@Injectable()
export class FilmsService implements UniqueNameChecker {
  private readonly relations = [
    'characters',
    'planets',
    'starships',
    'vehicles',
    'species',
    'images',
  ];

  constructor(
    @InjectRepository(Film)
    private repository: Repository<Film>,
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
  ) {}

  /**
   * Returns all films.
   */
  async findAll(page: number, title?: string): Promise<[Film[], number]> {
    const skip: number = (page - 1) * ITEMS_PER_PAGE;
    const [items, count] = await this.repository.findAndCount({
      order: { created: 'DESC' },
      where: {
        title: ILike<string>(title ? `%${title}%` : '%%'),
      },
      skip,
      take: ITEMS_PER_PAGE,
      relations: this.relations,
    });
    return [items, count];
  }

  /**
   * Searches films by id and return result.
   * @param id film id.
   * @return found film or null.
   */
  async findOne(id: number): Promise<Film> {
    const res: Film = await this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  /**
   * Removes films by id.
   * @param id film id.
   */
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Creates new films.
   * @param f new film.
   * @param images images for film.
   * @return Created film.
   */
  async create(
    f: CreateFilmDTO,
    images?: Array<Express.Multer.File>,
  ): Promise<Film> {
    const filmEntity: Film = plainToClass(Film, f);
    let fImages: Image[] = [];

    if (images) {
      fImages = await this.commonService.saveAll(images);
    }
    filmEntity.images = fImages;
    return await this.repository.save(filmEntity);
  }

  /**
   * Updates film, by changing exists on current.
   * @param id film id.
   * @param f new film.
   * @param images
   * @return Updated film.
   */
  async update(
    id: number,
    f: UpdateFilmDTO,
    images?: Array<Express.Multer.File>,
  ): Promise<Film> {
    const existingFilm: Film = await this.repository.findOneBy({ id });
    Object.assign(existingFilm, f);
    if (images) {
      existingFilm.images = await this.commonService.saveAll(images);
    }

    if (f.characters) {
      existingFilm.characters = await this.commonService.getPeople([
        ...new Set<number>(f.characters),
      ]);
    }

    if (f.planets) {
      existingFilm.planets = await this.commonService.getPlanets([
        ...new Set<number>(f.planets),
      ]);
    }

    if (f.species) {
      existingFilm.species = await this.commonService.getSpecies([
        ...new Set<number>(f.species),
      ]);
    }
    if (f.vehicles) {
      existingFilm.vehicles = await this.commonService.getVehicles([
        ...new Set<number>(f.vehicles),
      ]);
    }
    if (f.starships) {
      existingFilm.starships = await this.commonService.getStarships([
        ...new Set<number>(f.starships),
      ]);
    }
    console.log(existingFilm);
    await this.repository.save(existingFilm, { reload: true });
    return this.findOne(id);
  }

  async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ title: ILike<string>(name) }));
  }
}
