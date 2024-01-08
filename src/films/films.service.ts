import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/Film';
import { ILike, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { PeopleService } from '../people/people.service';

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
  async findAll(): Promise<Film[]> {
    return this.repository.find({ relations: ['characters'] });
  }

  /**
   * Searches films by id and return result.
   * @param id film id.
   * @return found film or null.
   */
  async findOne(id: number): Promise<Film | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['characters'],
    });
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
  async create(f: CreateFilmDto): Promise<Film> {
    const characters = await Promise.all(
      f.characters.map(
        async (id: number) => await this.peopleService.findOne(id),
      ),
    );
    const filmEntity = plainToClass(Film, f);
    filmEntity.characters = characters;
    return await this.repository.save(filmEntity);
  }

  /**
   * Updates film, by changing exists on current.
   * @param id film id.
   * @param f new film.
   */
  async update(id: number, f: UpdateFilmDto): Promise<void> {
    const characters = await Promise.all(
      f?.characters.map(
        async (id: number) => await this.peopleService.findOne(id),
      ),
    );
    const updated = plainToClass(Film, f);
    if (characters.length > 0) {
      updated.characters = characters;
    }
    await this.repository.update({ id }, updated);
  }

  /**
   * Checks if name is not exist in store.
   * @param title checked value.
   */
  public async isUniqueTitle(title: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ title: ILike<string>(title) }));
  }
}
