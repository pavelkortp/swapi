import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { ITEMS_PER_PAGE } from '../app.service';
import { Page, ResponseDTO } from '../declarations';

@Injectable()
export class PageInterceptor implements NestInterceptor<any, any> {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    return next.handle().pipe(
      map((response) => {
        if (response.count) {
          return processMany(context, response);
        } else {
          return response;
        }
      }),
    );
  }
}

// const processOne = async (data: any) => {
//   return {}
// }

const processMany = (context: ExecutionContext, o: Page<ResponseDTO>) => {
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
