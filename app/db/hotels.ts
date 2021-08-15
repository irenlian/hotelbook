import { dbQuery } from '../db/init';

export const getAllHotels = () => dbQuery('SELECT * FROM hotels');

export const getHotel = (id: number) => dbQuery(`SELECT * FROM hotels WHERE id=${id}`);
