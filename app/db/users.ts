import { dbQuery } from './init';

export const getUser = dbQuery(async client => {
  return client.query('SELECT * FROM users');
});
