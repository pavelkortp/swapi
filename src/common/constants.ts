import * as process from 'node:process';

export const PORT = process.env.PORT || 3000;
export const ITEMS_PER_PAGE = 10;
export const BASE_URL = `http://localhost:${PORT}`;
export const BASE_API_URL = `${BASE_URL}/api/v1`;

export enum Entities {
  PEOPLE = 'people',
  FILMS = 'films',
  PLANETS = 'planets',
  SPECIES = 'species',
  STARSHIPS = 'starships',
  VEHICLES = 'vehicles',
}
