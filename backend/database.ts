import * as knex from 'knex';

const defaults = {
    client: 'pg',
    connection: {
              host: 'localhost',
              user: 'postgres',
              password: 'admin',
              database: 'app_bank',
              port: 5432,
              ssl: {
                rejectUnauthorized: false,
              },
            }
}

export {defaults}