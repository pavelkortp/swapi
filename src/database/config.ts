// src/database/config.ts

import * as process from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config(); // This is still useful for local development outside of Docker

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // Add the host property! This is the most important change.
  host: process.env.DB_HOST || 'localhost',

  // The port inside the Docker network is 5432
  port: parseInt(process.env.DB_PORT) || 5432,

  // Read credentials from environment variables
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/database/migrations/*.js'],

  // Be careful with synchronize in production
  synchronize: process.env.NODE_ENV !== 'production',
};

const dataSource = new DataSource(dataSourceOptions);
console.log('DataSource Initialized with Options:', {
  ...dataSourceOptions,
  password: '***',
});
export default dataSource;
