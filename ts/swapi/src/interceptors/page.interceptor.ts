import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ITEMS_PER_PAGE } from '../app.service';
import { Page, ResponsePage } from '../declarations';
import { PresentDto } from '../common/present.dto';

@Injectable()
export class PageInterceptor
  implements
    NestInterceptor<
      PresentDto | Page<PresentDto>,
      PresentDto | ResponsePage<PresentDto>
    >
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<PresentDto | ResponsePage<PresentDto>>> {
    return next.handle().pipe(
      map((response) => {
        if (response?.count) {
          return processMany(context, response);
        } else {
          return response;
        }
      }),
    );
  }
}

const processMany = (
  context: ExecutionContext,
  o: Page<PresentDto>,
): ResponsePage<PresentDto> => {
  const nextPage: number =
    o.page * ITEMS_PER_PAGE < o.count ? o.page + 1 : null;
  const prevPage: number = o.page > 1 ? o.page - 1 : null;
  const url: string = context.switchToHttp().getRequest().url;
  return {
    count: o.count.toString(),
    next: nextPage ? `http://localhost:3000${url}/?page=${nextPage}` : 'null',
    previous: prevPage
      ? `http://localhost:3000${url}/?page=${prevPage}`
      : 'null',
    results: o.items,
  };
};
