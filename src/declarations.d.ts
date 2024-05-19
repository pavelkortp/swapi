import { Planet } from './planets/entities/Planet';
import { Film } from './films/entities/Film';
import { People } from './people/entities/People';
import { Starship } from './starships/entities/Starship';
import { Specie } from './species/entities/Specie';
import { Vehicle } from './vehicles/entities/Vehicle';

declare type EntityName =
  | 'people'
  | 'films'
  | 'planets'
  | 'species'
  | 'starships'
  | 'vehicles';

declare interface ResponsePage<E> {
  count: string;
  previous: string;
  next: string;
  results: E[];
}

declare interface UniqueNameChecker {
  /**
   * Checks if name is not exist in store.
   * @param name checked value.
   */
  isUniqueName(name: string): boolean | Promise<boolean>;
}

declare type StarWarsEntity =
  | Planet
  | Film
  | People
  | Starship
  | Specie
  | Vehicle;

declare interface ResponseDTO {
  toLink(name: string, id: number): string;
}

declare interface Page<E> {
  count: number;
  items: E[];
  page: number;
}
