import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { People } from '../entities/People';
import { GetPeopleDto } from '../dto/get-people.dto';

@Injectable()
export class ManyPeopleInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: People[]) => {
        return {
          count: data.length.toString(),
          next: 'null',
          previous: 'null',
          results: data.map((e) => new GetPeopleDto(e)),
        };
      }),
    );
  }
}
