import * as process from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,

  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/database/migrations/*.js'],

  // Be careful with synchronize in production
  synchronize: process.env.NODE_ENV !== 'production',
};

const dataSource = new DataSource(dataSourceOptions);

// Avoid logging sensitive information in production
if (process.env.NODE_ENV !== 'production') {
  console.log('DataSource Initialized with Options:', {
    ...dataSourceOptions,
    password: dataSourceOptions.password ? '***' : undefined,
    url: dataSourceOptions.url ? '***' : undefined,
  });
}

export default dataSource;
