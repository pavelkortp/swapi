import * as process from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

//Call this to read all .env files
config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
console.log('DataSourceOptions:', dataSourceOptions);
export default dataSource;
