import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Planet } from './entities/Planet';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from '../people/entities/People';
import { plainToClass } from 'class-transformer';
import { UpdatePlanetDTO } from './dto/update-planet.dto';
import { CreatePlanetDTO } from './dto/create-planet.dto';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private repository: Repository<Planet>,
  ) {}

  /**
   * Returns all Planets.
   */
  async findAll(): Promise<Planet[]> {
    return await this.repository.find({
      relations: ['residents', 'films'],
    });
  }

  /**
   * Searches Planet by id and return result.
   * @param id Planet id.
   * @return found Planet or null.
   */
  async findOne(id: number): Promise<Planet> {
    const res: Planet | null = await this.repository.findOne({
      where: { id },
      relations: ['residents', 'films'],
    });
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  /**
   * Removes Planet by id.
   * @param id Planet id.
   */
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Creates new Planet.
   * @param p new Planet.
   */
  async create(p: CreatePlanetDTO): Promise<void> {
    const planet: Planet = plainToClass(Planet, p);
    await this.repository.save(p);
  }

  /**
   * Updates people, by changing exists on current.
   * @param id people id.
   * @param p new people.
   */
  async update(id: number, p: UpdatePlanetDTO): Promise<void> {
    // const films: Film[] = await Promise.all(
    //   p?.films.map(
    //     async (id: number): Promise<Film> =>
    //       await this.filmsService.findOne(id),
    //   ) || [],
    // );
    // const existingPeople: People = await this.findOne(id);
    // Object.assign(existingPeople, p);
    // existingPeople.films = films;
    // await this.repository.save(existingPeople, { reload: true });
  }

  /**
   * Checks if name is not exist in store.
   * @param name checked value.
   */
  public async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ name: ILike<string>(name) }));
  }
}
