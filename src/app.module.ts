import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { dataSourceOptions } from './database/config';
import { FilmModule } from './films/film.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PageInterceptor } from './interceptors/page.interceptor';
import { PlanetsModule } from './planets/planets.module';
import { SpeciesModule } from './species/species.module';
import { ImageModule } from './images/image.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    PlanetsModule,
    PeopleModule,
    FilmModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ImageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: PageInterceptor },
  ],
})
export class AppModule {}
