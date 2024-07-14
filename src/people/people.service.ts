import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { People } from './entities/people.entity';
import { CreatePeopleDto } from './dto/create-people.dto';
import { plainToClass } from 'class-transformer';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { ITEMS_PER_PAGE } from '../app.service';
import { UniqueNameChecker } from '../declarations';
import { CommonService } from '../common/common.service';

@Injectable()
export class PeopleService implements UniqueNameChecker {
  /**
   * Db entity relations.
   */
  private readonly relations = [
    'films',
    'homeworld',
    'vehicles',
    'starships',
    'species',
    'images',
  ];

  constructor(
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
    @InjectRepository(People)
    private repository: Repository<People>,
  ) {}

  /**
   * Returns last 10 people by the specified page and name, as well as the total
   * number of people. If you use the name search, the total number of
   * people with this name is returned.
   * @param page number of page.
   * @param name Filter for people name.
   * @return array of people at 0 index and count at index 1
   */
  async findAll(page: number, name?: string): Promise<[People[], number]> {
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
   * Searches people by id and return result.
   * @param id People's id.
   * @throws NotFoundException If people with current id not found.
   * @return Found people.
   */
  async findOne(id: number): Promise<People> {
    const res: People | null = await this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!res) {
      throw new NotFoundException(`People with id ${id} not found`);
    }
    return res;
  }

  /**
   * Removes people by id.
   * @param id Person id.
   * @throws NotFoundException If person with current id not found.
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }

  /**
   * Creates new person.
   * @param people New person.
   * @param images images for person.
   * @throws BadGatewayException If something went wrong with db
   * @return Created person.
   */
  async create(
    people: CreatePeopleDto,
    images?: Express.Multer.File[],
  ): Promise<People> {
    const peopleEntity: People = plainToClass(People, people);

    if (images) {
      peopleEntity.images = await this.commonService.saveImages(images);
    }
    const savedPeople: People = await this.repository.save(peopleEntity);
    return await this.update(savedPeople.id, people);
  }

  /**
   * Updates people, by changing exists on current.
   * @param id Person id.
   * @param people New person.
   * @param images new Images for person.
   * @return Updated person.
   */
  async update(
    id: number,
    people: UpdatePeopleDto,
    images?: Array<Express.Multer.File>,
  ): Promise<People> {
    const existingPeople: People = await this.repository.findOneBy({ id });
    Object.assign(existingPeople, people);
    if (images) {
      existingPeople.images = await this.commonService.saveImages(images);
    }

    if (people.homeworld) {
      existingPeople.homeworld = (
        await this.commonService.getPlanets([parseInt(people.homeworld)])
      )[0];
    }

    if (people.films) {
      existingPeople.films = await this.commonService.getFilms([
        ...new Set<number>(people.films),
      ]);
    }

    if (people.species) {
      existingPeople.species = await this.commonService.getSpecies([
        ...new Set<number>(people.species),
      ]);
    }
    if (people.vehicles) {
      existingPeople.vehicles = await this.commonService.getVehicles([
        ...new Set<number>(people.vehicles),
      ]);
    }
    if (people.starships) {
      existingPeople.starships = await this.commonService.getStarships([
        ...new Set<number>(people.starships),
      ]);
    }
    await this.repository.save(existingPeople, { reload: true });
    return this.findOne(id);
  }

  public async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({
      name: ILike<string>(name),
    }));
  }
}
