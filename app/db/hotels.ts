import { dbQuery } from '../db/init';
import { FiltersType } from '../models/hotel';

export const getHotels = (filters: FiltersType) => {
  let query = '';
  if (filters.from && filters.to) {
    query = `
      SELECT * 
      FROM hotels
      WHERE id IN
      (
        SELECT rawHotels.hotel_id FROM
        (
          SELECT rooms_priced.hotel_id, COUNT(rooms_priced.id) as allRooms
          FROM
          (
            SELECT rooms.hotel_id, rooms.id
            FROM rooms
            ${filters.minPrice && filters.maxPrice ? `WHERE rooms.price BETWEEN ${filters.minPrice} AND ${filters.maxPrice}` : ''}
            ${filters.minPrice && !filters.maxPrice ? `WHERE rooms.price >= ${filters.minPrice}` : ''}
            ${!filters.minPrice && filters.maxPrice ? `WHERE rooms.price <= ${filters.maxPrice}` : ''}
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
            (CAST('${filters.from}' AS DATE) BETWEEN bookings.check_in AND bookings.check_out) OR
            (CAST('${filters.to}' AS DATE) BETWEEN bookings.check_in AND bookings.check_out) OR
            (bookings.check_in BETWEEN CAST('${filters.from}' AS DATE) AND CAST('${filters.to}' AS DATE))
          ) AS bookedRooms
          GROUP by hotel_id
        ) AS bookedHotels
        ON rawHotels.hotel_id = bookedHotels.hotel_id
        WHERE rawHotels.allRooms > bookedHotels.countBookedRooms OR bookedHotels.countBookedRooms IS NULL
      )
    `;
  } else {
    query = `
      SELECT * 
      FROM hotels
      WHERE id IN
      (
        SELECT DISTINCT rooms.hotel_id
        FROM rooms
        ${filters.minPrice && filters.maxPrice ? `WHERE rooms.price BETWEEN ${filters.minPrice} AND ${filters.maxPrice}` : ''}
        ${filters.minPrice && !filters.maxPrice ? `WHERE rooms.price >= ${filters.minPrice}` : ''}
        ${!filters.minPrice && filters.maxPrice ? `WHERE rooms.price <= ${filters.maxPrice}` : ''}
      )
    `;
  }
  return dbQuery(query);
}

export const getHotel = (id: number) => dbQuery(`SELECT * FROM hotels WHERE id=${id}`);
