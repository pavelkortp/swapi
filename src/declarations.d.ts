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

declare interface Url {
  toUrl(): string;
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

declare interface Page<E> {
  count: number;
  items: E[];
  page: number;
}
