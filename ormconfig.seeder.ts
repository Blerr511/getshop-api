import config from './ormconfig';

export = {
  ...config,
  migrationsTableName: 'seeds',
  migrations: ['src/db/postgres/seeds/*.ts'],
  cli: {
    migrationsDir: 'src/db/postgres/seeds',
  },
};
