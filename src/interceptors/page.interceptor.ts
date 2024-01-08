import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class PageInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<ResponsePage<StarWarsEntity> | StarWarsEntity>> {
    return next.handle().pipe(
      map(
        (
          data: StarWarsEntity[] | StarWarsEntity,
        ): ResponsePage<StarWarsEntity> | StarWarsEntity => {
          if (!Array.isArray(data)) return data;
          return {
            count: data.length.toString(),
            next: 'null',
            previous: 'null',
            results: data,
          };
        },
      ),
    );
  }
}
