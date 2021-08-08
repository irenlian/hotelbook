import express from 'express';
import { createBookingController, getAllHotelsController, getHotelController, getHotelBookingsController } from '../controllers/hotels';

const router = express.Router();
router.get('/hotels', getAllHotelsController);
router.get('/hotels/:id', getHotelController);
router.get('/hotels/:id/bookings', getHotelBookingsController);
router.put('/hotels/rooms/:id/bookings', createBookingController);

export default router;
