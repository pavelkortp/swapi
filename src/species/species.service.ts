import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specie } from './entities/Specie';
import { Repository } from 'typeorm';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Specie) private repository: Repository<Specie>,
  ) {}

  /**
   * Searches Specie by id and return result.
   * @param id Specie id.
   * @return found Specie or null.
   */
  async findOne(id: number): Promise<Specie> {
    const res: Specie | null = await this.repository.findOne({
      where: { id },
      relations: ['films', 'homeworld', 'vehicles'],
    });
    // if (!res) {
    //   throw new NotFoundException();
    // }
    return res;
  }
}
