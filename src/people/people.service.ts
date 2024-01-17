import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { People } from './entities/People';
import { CreatePeopleDTO } from './dto/create-people.dto';
import { plainToClass } from 'class-transformer';
import { UpdatePeopleDTO } from './dto/update-people.dto';
import { FilmsService } from '../films/films.service';
import { Film } from '../films/entities/Film';
import { ITEMS_PER_PAGE } from '../app.service';
import { GetPeopleDTO } from './dto/get-people.dto';
import { Page } from '../declarations';

@Injectable()
export class PeopleService {
  constructor(
    // private speciesService: SpeciesService,
    private filmsService: FilmsService,
    @InjectRepository(People)
    private repository: Repository<People>,
  ) {}

  /**
   * Returns all people.
   */
  async findAll(page: number): Promise<Page<GetPeopleDTO>> {
    const skip: number = (page - 1) * ITEMS_PER_PAGE;
    const [items, total] = await this.repository.findAndCount({
      order: { created: 'DESC' },
      skip,
      take: ITEMS_PER_PAGE,
      relations: ['films', 'homeworld', 'vehicles', 'starships', 'species'],
    });
    return {
      total,
      items: items.map((p: People) => new GetPeopleDTO(p)),
      page,
    };
  }

  /**
   * Searches people by id and return result.
   * @param id people id.
   * @return found people or null.
   */
  async findOne(id: number): Promise<People> {
    const res: People | null = await this.repository.findOne({
      where: { id },
      relations: ['films', 'homeworld', 'people', 'starships', 'species'],
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
   */
  async create(p: CreatePeopleDTO): Promise<People> {
    const peopleEntity: People = plainToClass(People, p);
    return await this.repository.save(peopleEntity);
  }

  // FIXME
  /**
   * Updates people, by changing exists on current.
   * @param id people id.
   * @param p new people.
   */
  async update(id: number, p: UpdatePeopleDTO): Promise<void> {
    const films: Film[] = await Promise.all(
      p?.films.map(
        async (id: number): Promise<Film> =>
          await this.filmsService.findOne(id),
      ) || [],
    );
    const existingPeople: People = await this.repository.findOneBy({ id });
    Object.assign(existingPeople, p);
    existingPeople.films = films;
    await this.repository.save(existingPeople, { reload: true });
  }

  /**
   * Checks if name is not exist in store.
   * @param name checked value.
   */
  public async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ name: ILike<string>(name) }));
  }
}
