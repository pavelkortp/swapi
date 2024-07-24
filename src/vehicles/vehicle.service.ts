import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ITEMS_PER_PAGE } from '../common/constants';
import { plainToClass } from 'class-transformer';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class VehicleService {
  /**
   * Db entity relations.
   */
  private readonly relations = ['films', 'pilots', 'images'];

  constructor(
    @InjectRepository(Vehicle)
    private repository: Repository<Vehicle>,
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
  ) {}

  /**
   * Returns last 10 vehicles by the specified page and name, as well as the total
   * number of vehicles. If you use the name search, the total number of
   * vehicles with this name is returned.
   * @param page Number of page.
   * @param name Filter for vehicles name.
   * @return Array of vehicles at 0 index and count at index 1
   */
  async findAll(page: number, name?: string): Promise<[Vehicle[], number]> {
    const skip: number = (page - 1) * ITEMS_PER_PAGE;
    const [items, count] = await this.repository.findAndCount({
      order: { created: 'DESC' },
      where: {
        name: ILike<string>(name ? `%${name}%` : '%%'),
      },
      skip,
      take: ITEMS_PER_PAGE,
      relations: this.relations,
    });
    return [items, count];
  }

  /**
   * Searches Vehicle by id and return result.
   * @param id Vehicle's id.
   * @throws NotFoundException If Vehicle with current id not found.
   * @return Found Vehicle.
   */
  async findOne(id: number): Promise<Vehicle> {
    const res: Vehicle | null = await this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!res) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }
    return res;
  }

  /**
   * Removes Vehicle by id.
   * @param id Vehicle's id.
   * @throws NotFoundException If Vehicle with current id not found.
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }

  /**
   * Creates new Vehicle.
   * @param vehicle New Vehicle.
   * @param images images for Vehicle.
   * @throws BadGatewayException If something went wrong with db
   * @return Created Vehicle.
   */
  async create(
    vehicle: CreateVehicleDto,
    images?: Express.Multer.File[],
  ): Promise<Vehicle> {
    const vehicleEntity: Vehicle = plainToClass(Vehicle, vehicle);
    const savedVehicle = await this.repository.save(vehicleEntity);
    return await this.update(savedVehicle.id, vehicle, images);
  }

  /**
   * Updates vehicle, by changing exists on current.
   * @param id Vehicle id.
   * @param vehicle New Vehicle.
   * @param images new Images for Vehicle.
   * @return Updated Vehicle.
   */
  async update(
    id: number,
    vehicle: UpdateVehicleDTO,
    images?: Express.Multer.File[],
  ): Promise<Vehicle> {
    const existingVehicle: Vehicle = await this.findOne(id);
    Object.assign(existingVehicle, vehicle);

    if (images) {
      existingVehicle.images = await this.commonService.saveImages(images);
    }

    if (vehicle.films) {
      existingVehicle.films = await this.commonService.getFilms([
        ...new Set<number>(vehicle.films),
      ]);
    }

    if (vehicle.pilots) {
      existingVehicle.pilots = await this.commonService.getPeople([
        ...new Set<number>(vehicle.pilots),
      ]);
    }

    await this.repository.save(existingVehicle, { reload: true });
    return this.findOne(id);
  }

  async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({
      name: ILike<string>(name),
    }));
  }
}
