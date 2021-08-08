import express from 'express';
import { createBookingController, getAllHotelsController, getHotelController } from '../controllers/hotels';

const router = express.Router();
router.get('/hotels', getAllHotelsController);
router.get('/hotels/:id', getHotelController);
router.put('/hotels/rooms/:id/bookings', createBookingController);

export default router;
