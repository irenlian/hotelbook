import express from 'express';
import { createBookingController, getAllHotelsController, getHotelController, getHotelBookingsController } from '../controllers/hotels';

const router = express.Router();
router.get('/hotel', getAllHotelsController);
router.get('/hotel/:id', getHotelController);
router.get('/hotel/:id/booking', getHotelBookingsController);
router.put('/hotel/room/:id/booking', createBookingController);

export default router;
