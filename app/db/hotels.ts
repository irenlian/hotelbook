import { dbQuery } from '../db/init';
import { FiltersType } from '../models/hotel';

export const getHotels = ({ from, to, minPrice, maxPrice, offset, limit }: FiltersType) => {
  let query = '';
  if (from && to) {
    query = `
      SELECT rawHotels.hotel_id FROM
      (
        SELECT rooms_priced.hotel_id, COUNT(rooms_priced.id) as allRooms
        FROM
        (
          SELECT rooms.hotel_id, rooms.id
          FROM rooms
          ${minPrice && maxPrice ? `WHERE rooms.price BETWEEN ${minPrice} AND ${maxPrice}` : ''}
          ${minPrice && !maxPrice ? `WHERE rooms.price >= ${minPrice}` : ''}
          ${!minPrice && maxPrice ? `WHERE rooms.price <= ${maxPrice}` : ''}
        ) AS rooms_priced
        GROUP by rooms_priced.hotel_id
      ) AS rawHotels
      LEFT JOIN
      (
        SELECT bookedRooms.hotel_id, COUNT(bookedRooms.id) AS countBookedRooms
        FROM
        (
          SELECT rooms.hotel_id, rooms.id
          FROM rooms 
          JOIN bookings ON bookings.room_id = rooms.id
          WHERE 
          ($3 BETWEEN bookings.check_in AND bookings.check_out) OR
          ($4 BETWEEN bookings.check_in AND bookings.check_out) OR
          (bookings.check_in BETWEEN $3 AND $4)
        ) AS bookedRooms
        GROUP by hotel_id
      ) AS bookedHotels
      ON rawHotels.hotel_id = bookedHotels.hotel_id
      WHERE rawHotels.allRooms > bookedHotels.countBookedRooms OR bookedHotels.countBookedRooms IS NULL
    `;
  } else {
    query = `
      SELECT DISTINCT rooms.hotel_id
      FROM rooms
      ${minPrice && maxPrice ? `WHERE rooms.price BETWEEN ${minPrice} AND ${maxPrice}` : ''}
      ${minPrice && !maxPrice ? `WHERE rooms.price >= ${minPrice}` : ''}
      ${!minPrice && maxPrice ? `WHERE rooms.price <= ${maxPrice}` : ''}
    `;
  }
  const wrapped = `
    SELECT * 
    FROM hotels
    WHERE id IN
    (${query})
    LIMIT $1
    OFFSET $2
  `;
  return dbQuery(wrapped, [limit, offset, ...(from || to ? [from, to] : [])]);
}

export const getHotel = (id: number) => dbQuery(`SELECT * FROM hotels WHERE id=${id}`);
