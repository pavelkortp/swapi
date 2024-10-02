import { Planet } from './planets/entities/planet.entity';
import { Film } from './films/entities/film.entity';
import { People } from './people/entities/people.entity';
import { Starship } from './starships/entities/starship.entity';
import { Specie } from './species/entities/specie.entity';
import { Vehicle } from './vehicles/entities/vehicle.entity';

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
  isUniqueName(name: string): Promise<boolean>;
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
