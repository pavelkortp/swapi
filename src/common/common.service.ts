import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ImageService } from '../images/image.service';
import { PeopleService } from '../people/people.service';
import { FilmsService } from '../films/films.service';
import { PlanetsService } from '../planets/planets.service';
import { VehicleService } from '../vehicles/vehicle.service';
import { StarshipsService } from '../starships/starships.service';
import { SpeciesService } from '../species/species.service';
import { People } from '../people/entities/People';
import { Film } from '../films/entities/Film';
import { Specie } from '../species/entities/Specie';
import { Planet } from '../planets/entities/Planet';
import { Vehicle } from '../vehicles/entities/Vehicle';
import { Starship } from '../starships/entities/Starship';

@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => ImageService))
    private imageService: ImageService,
    @Inject(forwardRef(() => PeopleService))
    private peopleService: PeopleService,
    @Inject(forwardRef(() => FilmsService))
    private filmsService: FilmsService,
    @Inject(forwardRef(() => PlanetsService))
    private planetsService: PlanetsService,
    @Inject(forwardRef(() => VehicleService))
    private vehicleService: VehicleService,
    @Inject(forwardRef(() => StarshipsService))
    private starshipService: StarshipsService,
    @Inject(forwardRef(() => SpeciesService))
    private specieService: SpeciesService,
  ) {}

  async getPeople(ids: number[]): Promise<People[]> {
    return Promise.all(
      ids.map(async (id) => await this.peopleService.findOne(id)),
    );
  }

  async getFilms(ids: number[]): Promise<Film[]> {
    return Promise.all(
      ids.map(async (id) => await this.filmsService.findOne(id)),
    );
  }

  async getSpecies(ids: number[]): Promise<Specie[]> {
    return Promise.all(
      ids.map(async (id) => await this.specieService.findOne(id)),
    );
  }

  async getPlanets(ids: number[]): Promise<Planet[]> {
    return Promise.all(
      ids.map(async (id) => await this.planetsService.findOne(id)),
    );
  }

  async getVehicles(ids: number[]): Promise<Vehicle[]> {
    return Promise.all(
      ids.map(async (id) => await this.vehicleService.findOne(id)),
    );
  }

  async getStarships(ids: number[]): Promise<Starship[]> {
    return Promise.all(
      ids.map(async (id) => await this.starshipService.findOne(id)),
    );
  }
}
