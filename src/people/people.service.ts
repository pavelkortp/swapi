import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { People } from './entities/People';
import { CreatePeopleDto } from './dto/create-people.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private repository: Repository<People>,
  ) {}

  /**
   * Returns all people.
   */
  async findAll(): Promise<People[]> {
    return this.repository.find();
  }

  /**
   * Searches people by id and return result.
   * @param id people id.
   * @return found people or null.
   */
  async findOne(id: number): Promise<People | null> {
    return this.repository.findOneBy({ id });
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
    const peopleEntity = plainToClass(People, p);
    return await this.repository.save(peopleEntity);
  }

  /**
   * Updates people, by changing exists on current.
   * @param id people id.
   * @param p new people.
   */
  async update(id: number, p: People): Promise<void> {
    await this.repository.update({ id }, p);
  }

  /**
   * Checks if name is not exist in store.
   * @param name checked value.
   */
  public async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({ name: ILike<string>(name) }));
  }
}
