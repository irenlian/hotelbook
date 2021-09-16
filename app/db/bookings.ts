import { dbQuery } from '../db/init';
import { BookingType } from '../models/booking';

export const getHotelBookings = (id: number) =>
  dbQuery(`
    SELECT 
    bookings.*,
    rooms.name,
    rooms.type,
    rooms.price
    FROM bookings JOIN rooms ON bookings.room_id=rooms.id 
    WHERE hotel_id=${id}`
  );

export const getUserBookings = (id: number) =>
  dbQuery(
    `
    SELECT 
    bookings.*,
    rooms.hotel_id,
    rooms.name AS room_name,
    rooms.type,
    rooms.price,
    hotels.name AS hotel_name,
    hotels.country,
    hotels.city 
    FROM bookings 
    JOIN rooms ON bookings.room_id=rooms.id 
    JOIN hotels ON rooms.hotel_id=hotels.id
    WHERE user_id=${id}
    `,
  );

export const addBooking = (booking: Omit<BookingType, 'id'>) =>
  dbQuery(
    `CALL insert_booking(${booking.userId}, ${booking.roomId}, $1, $2)`, [booking.checkIn, booking.checkOut]
  );
