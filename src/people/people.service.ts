import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { People } from './entities/People';
import { CreatePeopleDto } from './dto/create-people.dto';
import { plainToClass } from 'class-transformer';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { FilmsService } from '../films/films.service';
import { Film } from '../films/entities/Film';

@Injectable()
export class PeopleService {
  constructor(
    private filmsService: FilmsService,
    @InjectRepository(People)
    private repository: Repository<People>,
  ) {}

  /**
   * Returns all people.
   */
  async findAll(): Promise<People[]> {
    return await this.repository.find({ relations: ['films'] });
  }

  /**
   * Searches people by id and return result.
   * @param id people id.
   * @return found people or null.
   */
  async findOne(id: number): Promise<People> {
    const res: People | null = await this.repository.findOne({
      where: { id },
      relations: ['films', 'homeworld'],
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
  async create(p: CreatePeopleDto): Promise<People> {
    const films: Film[] = await Promise.all(
      p.films.map(
        async (id: number): Promise<Film> =>
          await this.filmsService.findOne(id),
      ),
    );
    const peopleEntity: People = plainToClass(People, p);
    peopleEntity.films = films;
    return await this.repository.save(peopleEntity);
  }

  /**
   * Updates people, by changing exists on current.
   * @param id people id.
   * @param p new people.
   */
  async update(id: number, p: UpdatePeopleDto): Promise<void> {
    const films: Film[] = await Promise.all(
      p?.films.map(
        async (id: number): Promise<Film> =>
          await this.filmsService.findOne(id),
      ) || [],
    );
    const existingPeople: People = await this.findOne(id);
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
