import { Injectable } from '@nestjs/common';

export const ITEMS_PER_PAGE = 10;
export const BASE_URL = 'http://localhost:3000/api/v1';
@Injectable()
export class AppService {
  getHello() {
    return {
      films: 'https://localhost:3000/api/films/',
      people: 'https://localhost:3000/api/people/',
      planets: 'https://localhost:3000/api/planets/',
      species: 'https://localhost:3000/api/species/',
      starships: 'https://localhost:3000/api/starships/',
      vehicles: 'https://localhost:3000/api/vehicles/',
    };
  }
}
