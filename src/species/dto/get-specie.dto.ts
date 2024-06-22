import { Specie } from '../entities/Specie';
import { ResponseDTO } from '../../declarations';

export class GetSpeciesDto implements ResponseDTO {
  constructor(s: Specie) {}

  toLink(name: string, id: number): string {
    return '';
  }
}
