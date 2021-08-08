import { dbQuery } from '../db/init';

export const getHotelRooms = (id: number) => dbQuery(async client => {
  return client.query(`SELECT * FROM rooms WHERE hotel_id=${id}`);
});
