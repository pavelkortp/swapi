import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/Film';
import { ILike, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateFilmDTO } from './dto/create-film.dto';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { ITEMS_PER_PAGE } from '../app.service';
import { Page, UniqueNameChecker } from '../declarations';
import { GetFilmDTO } from './dto/get-film.dto';

@Injectable()
export class FilmsService implements UniqueNameChecker {
  constructor(
    @InjectRepository(Film)
    private repository: Repository<Film>,
  ) {}

  /**
   * Returns all films.
   */
  async findAll(page: number): Promise<Page<GetFilmDTO>> {
    const skip: number = (page - 1) * ITEMS_PER_PAGE;
    const [items, count] = await this.repository.findAndCount({
      order: { created: 'DESC' },
      skip,
      take: ITEMS_PER_PAGE,
      relations: ['characters', 'planets', 'starships', 'vehicles', 'species'],
    });
    return {
      count,
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
    const existingFilm: Film = await this.findOne(id);
    Object.assign(existingFilm, f);
    await this.repository.save(existingFilm, { reload: true });
  }

  async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ title: ILike<string>(name) }));
  }
}
