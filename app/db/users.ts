import { dbQuery } from './init';

export const getAllUsers = () => dbQuery(async client => {
  return client.query('SELECT * FROM users');
});

export const getUser = (id: number) => dbQuery(async client => {
  return client.query(`SELECT * FROM users WHERE id=${id}`);
});
