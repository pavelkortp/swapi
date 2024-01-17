import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { dataSourceOptions } from './database/config';
import { FilmsModule } from './films/films.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PageInterceptor } from './interceptors/page.interceptor';
import { PlanetsModule } from './planets/planets.module';
import { SpeciesModule } from './species/species.module';

@Module({
  imports: [
    PlanetsModule,
    PeopleModule,
    FilmsModule,
    SpeciesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: PageInterceptor },
  ],
})
export class AppModule {}
