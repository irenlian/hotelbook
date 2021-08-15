import { dbQuery } from '../db/init';
import { BookingType } from '../models/booking';

export const getHotelBookings = (id: number) =>
  dbQuery(`SELECT * FROM bookings JOIN rooms ON bookings.room_id=rooms.id WHERE hotel_id=${id}`);

export const getUserBookings = (id: number) =>
  dbQuery(
    `SELECT * FROM (SELECT * FROM bookings JOIN rooms ON bookings.room_id=rooms.id WHERE user_id=${id}) AS room_bookings JOIN hotels ON room_bookings.hotel_id=hotels.id`,
  );

export const addBooking = (booking: Omit<BookingType, 'id'>) =>
  dbQuery(
    `INSERT INTO bookings (user_id, room_id, check_in, check_out) VALUES (${booking.userId}, ${booking.roomId}, ${booking.checkIn}, ${booking.checkOut})`,
  );
