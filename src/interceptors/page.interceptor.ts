import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ITEMS_PER_PAGE } from '../app.service';
import { Page, ResponsePage, StarWarsEntity } from '../declarations';

@Injectable()
export class PageInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<ResponsePage<StarWarsEntity> | StarWarsEntity>> {
    return next.handle().pipe(
      map(
        (
          data: Page<StarWarsEntity> | StarWarsEntity,
        ): ResponsePage<StarWarsEntity> | StarWarsEntity => {
          if (!('page' in data)) return data;
          const nextPage: number =
            data.page * ITEMS_PER_PAGE < data.total ? data.page + 1 : null;
          const prevPage: number = data.page > 1 ? data.page - 1 : null;
          const url: string = context.switchToHttp().getRequest().url;
          return {
            count: data.total.toString(),
            next: nextPage
              ? `http://localhost:3000${url}/?page=${nextPage}`
              : 'null',
            previous: prevPage
              ? `http://localhost:3000${url}/?page=${prevPage}`
              : 'null',
            results: data.items,
          };
        },
      ),
    );
  }
}
