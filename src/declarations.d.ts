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

declare type StarWarsEntity = Planet | Film | People;
