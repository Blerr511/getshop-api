import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/entities/**.entity{.ts,.js}'],
  migrations: ['src/db/postgres/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/db/postgres/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
};
