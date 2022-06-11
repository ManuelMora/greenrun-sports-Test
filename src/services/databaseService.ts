import knex from 'knex';
import config from '../config';

export const databaseClient = knex({
    client: 'mysql',
    connection: {
        host: config.databaseHost,
        port: Number(config.databasePort),
        user: config.databaseUser,
        password: config.databasePassword,
        database: config.databaseName,
    },
    pool: { min: 0, max: 7 }
});
