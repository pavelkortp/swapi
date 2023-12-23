import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PeoplePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    return undefined;
  }
}
