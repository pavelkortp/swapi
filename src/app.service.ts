import { Injectable } from '@nestjs/common';
import { BASE_API_URL, Entities } from './common/constants';

@Injectable()
export class AppService {
  getHello() {
    return {
      films: BASE_API_URL + '/' + Entities.FILMS,
      people: BASE_API_URL + '/' + Entities.PEOPLE,
      planets: BASE_API_URL + '/' + Entities.PLANETS,
      species: BASE_API_URL + '/' + Entities.SPECIES,
      starships: BASE_API_URL + '/' + Entities.STARSHIPS,
      vehicles: BASE_API_URL + '/' + Entities.VEHICLES,
    };
  }
}
