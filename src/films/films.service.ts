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
import { PeopleService } from '../people/people.service';
import { People } from '../people/entities/People';
import { ITEMS_PER_PAGE } from '../app.service';
import { GetPeopleDTO } from '../people/dto/get-people.dto';
import { Page } from '../declarations';
import { GetFilmDTO } from './dto/get-film.dto';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(forwardRef(() => PeopleService))
    private peopleService: PeopleService,
    @InjectRepository(Film)
    private repository: Repository<Film>,
  ) {}

  /**
   * Returns all films.
   */
  async findAll(page: number): Promise<Page<GetFilmDTO>> {
    const skip: number = (page - 1) * ITEMS_PER_PAGE;
    const [items, total] = await this.repository.findAndCount({
      order: { created: 'DESC' },
      skip,
      take: ITEMS_PER_PAGE,
      relations: ['characters', 'planets', 'starships', 'vehicles', 'species'],
    });
    return {
      total,
      items: items.map((f: Film) => new GetFilmDTO(f)),
      page,
    };
  }

  /**
   * Searches films by id and return result.
   * @param id film id.
   * @return found film or null.
   */
  async findOne(id: number): Promise<Film> {
    const res: Film = await this.repository.findOne({
      where: { id },
      relations: ['characters', 'planets', 'starships', 'vehicles', 'species'],
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
   */
  async create(f: CreateFilmDTO): Promise<Film> {
    const filmEntity: Film = plainToClass(Film, f);
    return await this.repository.save(filmEntity);
  }

  // FIXME
  /**
   * Updates film, by changing exists on current.
   * @param id film id.
   * @param f new film.
   */
  async update(id: number, f: UpdateFilmDTO): Promise<void> {
    const characters: People[] = await Promise.all(
      f?.characters.map(
        async (id: number): Promise<People> =>
          await this.peopleService.findOne(id),
      ),
    );
    const existingFilm: Film = await this.findOne(id);
    Object.assign(existingFilm, f);
    if (characters.length > 0) {
      existingFilm.characters = characters;
    }
    await this.repository.save(existingFilm, { reload: true });
  }

  /**
   * Checks if name is not exist in store.
   * @param title checked value.
   */
  public async isUniqueTitle(title: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ title: ILike<string>(title) }));
  }
}
