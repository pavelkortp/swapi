import { SpeciesService } from './species.service';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(private service: SpeciesService) {}
}
