import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Film } from './entities/film.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { CommonService } from '../common/common.service';
import { ITEMS_PER_PAGE } from '../common/constants';

@Injectable()
export class FilmService implements UniqueNameChecker {
  /**
   * Db entity relations.
   */
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
   * Returns last 10 films by the specified page and title, as well as the total
   * number of films. If you use the title search, the total number of
   * films with this title is returned.
   * @param page number of page.
   * @param title filter for films title.
   * @return array of films at 0 index and count at index 1
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
   * Searches film by id and return result.
   * @param id Film's id.
   * @throws NotFoundException If film with current id not found.
   * @return Found film.
   */
  async findOne(id: number): Promise<Film> {
    const res: Film | null = await this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!res) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }
    return res;
  }

  /**
   * Removes Films by id.
   * @param id Film id.
   * @throws NotFoundException If film with current id not found.
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }

  /**
   * Creates new film.
   * @param film New film.
   * @param images images for film.
   * @throws BadGatewayException If something went wrong with db
   * @return Created film.
   */
  async create(
    film: CreateFilmDto,
    images?: Express.Multer.File[],
  ): Promise<Film> {
    const filmEntity: Film = plainToClass(Film, film);
    const savedFilm = await this.repository.save(filmEntity);
    return this.update(savedFilm.id, film, images);
  }

  /**
   * Updates film, by changing exists on current.
   * @param id Film id.
   * @param film New film.
   * @param images new Images for film.
   * @return Updated film.
   */
  async update(
    id: number,
    film: UpdateFilmDto,
    images?: Express.Multer.File[],
  ): Promise<Film> {
    const existingFilm: Film = await this.findOne(id);
    Object.assign(existingFilm, film);
    if (images) {
      existingFilm.images = await this.commonService.saveImages(images);
    }

    if (film.characters) {
      existingFilm.characters = await this.commonService.getPeople([
        ...new Set<number>(film.characters),
      ]);
    }

    if (film.planets) {
      existingFilm.planets = await this.commonService.getPlanets([
        ...new Set<number>(film.planets),
      ]);
    }

    if (film.species) {
      existingFilm.species = await this.commonService.getSpecies([
        ...new Set<number>(film.species),
      ]);
    }
    if (film.vehicles) {
      existingFilm.vehicles = await this.commonService.getVehicles([
        ...new Set<number>(film.vehicles),
      ]);
    }
    if (film.starships) {
      existingFilm.starships = await this.commonService.getStarships([
        ...new Set<number>(film.starships),
      ]);
    }

    await this.repository.save(existingFilm);
    return this.findOne(id);
  }

  async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ title: ILike<string>(name) }));
  }
}
