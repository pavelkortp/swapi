import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ImageService } from '../images/image.service';
import { PeopleService } from '../people/people.service';
import { FilmService } from '../films/film.service';
import { PlanetsService } from '../planets/planets.service';
import { VehicleService } from '../vehicles/vehicle.service';
import { StarshipsService } from '../starships/starships.service';
import { SpeciesService } from '../species/species.service';
import { People } from '../people/entities/people.entity';
import { Film } from '../films/entities/film.entity';
import { Specie } from '../species/entities/specie.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Image } from '../images/entities/image.entity';

@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => ImageService))
    private imageService: ImageService,
    @Inject(forwardRef(() => PeopleService))
    private peopleService: PeopleService,
    @Inject(forwardRef(() => FilmService))
    private filmsService: FilmService,
    @Inject(forwardRef(() => PlanetsService))
    private planetsService: PlanetsService,
    @Inject(forwardRef(() => VehicleService))
    private vehicleService: VehicleService,
    @Inject(forwardRef(() => StarshipsService))
    private starshipService: StarshipsService,
    @Inject(forwardRef(() => SpeciesService))
    private specieService: SpeciesService,
  ) {}

  /**
   * Returns array of people from array of they ids.
   * @param ids Array of people ids.
   */
  async getPeople(ids: number[]): Promise<People[]> {
    return Promise.all(
      ids.map(
        async (id: number): Promise<People> =>
          await this.peopleService.findOne(id),
      ),
    );
  }

  /**
   * Returns array of films from array of they ids.
   * @param ids Array of films ids.
   */
  async getFilms(ids: number[]): Promise<Film[]> {
    return Promise.all(
      ids.map(
        async (id: number): Promise<Film> =>
          await this.filmsService.findOne(id),
      ),
    );
  }

  /**
   * Returns array of species from array of they ids.
   * @param ids Array of species ids.
   */
  async getSpecies(ids: number[]): Promise<Specie[]> {
    return Promise.all(
      ids.map(
        async (id: number): Promise<Specie> =>
          await this.specieService.findOne(id),
      ),
    );
  }

  /**
   * Returns array of planets from array of they ids.
   * @param ids Array of planets ids.
   */
  async getPlanets(ids: number[]): Promise<Planet[]> {
    return Promise.all(
      ids.map(
        async (id: number): Promise<Planet> =>
          await this.planetsService.findOne(id),
      ),
    );
  }

  /**
   * Returns array of vehicles from array of they ids.
   * @param ids Array of vehicles ids.
   */
  async getVehicles(ids: number[]): Promise<Vehicle[]> {
    return Promise.all(
      ids.map(
        async (id: number): Promise<Vehicle> =>
          await this.vehicleService.findOne(id),
      ),
    );
  }

  /**
   * Returns array of starships from array of they ids.
   * @param ids Array of starships ids.
   */
  async getStarships(ids: number[]): Promise<Starship[]> {
    return Promise.all(
      ids.map(
        async (id: number): Promise<Starship> =>
          await this.starshipService.findOne(id),
      ),
    );
  }

  /**
   * Saves images to storage and returns it.
   * @param images Array of images from request.
   */
  async saveImages(images: Express.Multer.File[]): Promise<Image[]> {
    return await this.imageService.saveAll(images);
  }
}
