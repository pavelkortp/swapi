import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People } from './entities/People';

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
  async create(p: People): Promise<void> {
    this.repository.create(p);
  }

  /**
   * Updates people, by changing exists on current.
   * @param id people id.
   * @param p new people.
   */
  async update(id: number, p: People): Promise<void> {
    await this.repository.update({ id: p.id }, p);
  }
}
