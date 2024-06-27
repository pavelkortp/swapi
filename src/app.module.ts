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
import { ImageModule } from './images/image.module';
import { StarshipsModule } from './starships/starships.module';
import { VehicleModule } from './vehicles/vehicle.module';

@Module({
  imports: [
    PlanetsModule,
    PeopleModule,
    FilmsModule,
    SpeciesModule,
    StarshipsModule,
    VehicleModule,
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
