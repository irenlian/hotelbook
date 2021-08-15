import { dbQuery } from '../db/init';

export const getHotelRooms = (id: number) => dbQuery(`SELECT * FROM rooms WHERE hotel_id=${id}`);
