import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
              host: 'localhost',
              user: 'postgres',
              password: 'postgres',
              database: 'postgres',
              port: 5432,
              ssl: {
                rejectUnauthorized: false,
              },
            }
})

export {db}
