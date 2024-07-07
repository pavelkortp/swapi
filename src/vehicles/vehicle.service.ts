import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ITEMS_PER_PAGE } from '../app.service';
import { plainToClass } from 'class-transformer';
import { Image } from '../images/entities/Image';
import { Vehicle } from './entities/Vehicle';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class VehicleService {
  private readonly relations = ['films', 'pilots', 'images'];

  constructor(
    @InjectRepository(Vehicle)
    private repository: Repository<Vehicle>,
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
  ) {}

  /**
   * Returns all Vehicles.
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
   * Searches Vehicles by id and return result.
   * @param id Vehicle id.
   * @return found Starship or null.
   */
  async findOne(id: number): Promise<Vehicle> {
    const res: Vehicle | null = await this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  /**
   * Removes vehicle by id.
   * @param id vehicle id.
   */
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Creates new vehicle.
   * @param p new vehicle.
   * @param images
   */
  async create(
    p: CreateVehicleDTO,
    images?: Array<Express.Multer.File>,
  ): Promise<Vehicle> {
    const starship: Vehicle = plainToClass(Vehicle, p);
    let pImages = [];

    if (images) {
      pImages = await this.commonService.saveAll(images);
    }

    starship.images = pImages;
    return await this.repository.save(starship);
  }

  /**
   * Updates vehicle, by changing exists on current.
   * @param id vehicle id.
   * @param p new vehicle.
   * @param images
   */
  async update(
    id: number,
    p: UpdateVehicleDTO,
    images?: Array<Express.Multer.File>,
  ): Promise<Vehicle> {
    let pImages: Image[];
    if (images) {
      pImages = await this.commonService.saveAll(images);
    }
    const vehicle: Vehicle = await this.repository.findOneBy({ id });
    Object.assign(vehicle, p);
    vehicle.images = pImages;
    await this.repository.save(vehicle, { reload: true });
    return vehicle;
  }

  async isUniqueName(name: string): Promise<boolean> {
    return !(await this.repository.findOneBy({
      name: ILike<string>(name),
    }));
  }
}
