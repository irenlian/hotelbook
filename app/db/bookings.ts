import {dbQuery} from "../db/init";
import {BookingType} from "../models/booking";

export const addBooking = (booking: Omit<BookingType, 'id'>) => dbQuery(async client => {
  return client.query(`INSERT INTO bookings (user_id, room_id, check_in, check_out) VALUES (${booking.userId}, ${booking.roomId}, ${booking.checkIn}, ${booking.checkOut})`);
});
