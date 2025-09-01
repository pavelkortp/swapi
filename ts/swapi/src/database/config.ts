// src/database/config.ts

import * as process from 'process';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config(); // This is still useful for local development outside of Docker

// Base configuration options shared by both environments
const baseOptions = {
  type: 'postgres',
  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: process.env.NODE_ENV !== 'production',
};

// Explicitly choose the configuration based on the environment
let connectionOptions;

if (process.env.DATABASE_URL) {
  // --- Production/Staging configuration (e.g., on Render) ---
  console.log('Using DATABASE_URL for connection.');
  connectionOptions = {
    ...baseOptions,
    url: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Required for Render's managed databases
    },
  };
} else {
  // --- Local Docker development configuration ---
  console.log('Using DB_HOST for local Docker connection.');
  connectionOptions = {
    ...baseOptions,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };
}

export const dataSourceOptions = connectionOptions;

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
