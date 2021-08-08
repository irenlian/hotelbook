import { dbQuery } from '../db/init';

export const getAllHotels = () => dbQuery(async client => {
  return client.query('SELECT * FROM hotels');
});

export const getHotel = (id: number) => dbQuery(async client => {
  return client.query(`SELECT * FROM hotels WHERE id=${id}`);
});
