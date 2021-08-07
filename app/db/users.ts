import { dbQuery } from './init';

export const getUsers = dbQuery(async client => {
  return client.query('SELECT * FROM users');
});
