import { dbQuery } from '../db/init';
import { FiltersType } from '../models/hotel';

type QueryProps = {
  filters: FiltersType;
  query: string;
};

const getQueryForHotelsIdsByDatesAndPrices = ({ filters }: QueryProps) => {
  const { from, to, minPrice, maxPrice } = filters;
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
          ($1 BETWEEN bookings.check_in AND bookings.check_out - 1) OR
          ($2 BETWEEN bookings.check_in + 1 AND bookings.check_out) OR
          (bookings.check_in + 1 BETWEEN $1 AND $2)
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
  return { query, filters };
};

const getQueryForHotelsByLocationSortedByPrice = ({ query, filters }: QueryProps) => {
  const { sort, country, city } = filters;

  const withPhotoFiltered = `
  SELECT hotels.id, hotels.name, hotels.country, hotels.city , photos.name as photo
  FROM hotels
  LEFT JOIN photos ON hotels.id=photos.hotel_id
  WHERE photos.main=TRUE AND hotels.id IN (${query}) 
  `;

  const searched = `
    SELECT filtered_hotels.*
    FROM (${withPhotoFiltered}) AS filtered_hotels
    JOIN
    (
      SELECT distinct rooms.hotel_id,
      MIN(rooms.price) OVER (PARTITION BY rooms.hotel_id) AS min_price,
      MAX(rooms.price) OVER (PARTITION BY rooms.hotel_id) AS max_price
      FROM rooms
    ) AS rooms_with_price
    ON filtered_hotels.id = rooms_with_price.hotel_id
    ${country ? `AND LOWER(country) LIKE '%${country}%' ` : ''}
    ${city ? `AND LOWER(city) LIKE '%${city}%' ` : ''}
    ORDER BY ${sort === 'ASC' ? 'rooms_with_price.min_price ASC' : 'rooms_with_price.max_price DESC'}
  `;

  return { query: searched, filters };
};

const getQueryByLimit = ({ query, filters }: QueryProps) => {
  const { offset, limit } = filters;
  return `${query} LIMIT ${limit} OFFSET ${offset}`;
};

const getCountQuery = ({ query }: QueryProps) => {
  return `SELECT COUNT(query.id) FROM (${query}) AS query`;
};

export const getHotels = (filters: FiltersType) => {
  const { from, to } = filters;
  const query = getQueryByLimit(getQueryForHotelsByLocationSortedByPrice(getQueryForHotelsIdsByDatesAndPrices({ filters, query: '' })));

  return dbQuery(query, [...(from || to ? [from, to] : [])]);
};

export const getHotelsCount = (filters: FiltersType) => {
  const { from, to } = filters;
  const query = getCountQuery(
    getQueryForHotelsByLocationSortedByPrice(getQueryForHotelsIdsByDatesAndPrices({ filters, query: '' })),
  );

  return dbQuery(query, [...(from || to ? [from, to] : [])]);
};

export const getHotel = (id: number) => dbQuery(`SELECT * FROM hotels WHERE id=${id}`);

export const getPhotos = (id: number) => dbQuery(`SELECT id, name, main FROM photos WHERE hotel_id=${id}`);
