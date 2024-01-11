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

declare type StarWarsEntity =
  | Planet
  | Film
  | People
  | Starship
  | Specie
  | Vehicle;

declare interface Page<E> {
  total: number;
  items: E[];
  page: number;
}
