import express from 'express';
import { createBookingController, getAllHotelsController, getHotelController, getHotelBookingsController } from '../controllers/hotels';
import authenticate from "../middlewares/authenticate";

const router = express.Router();
router.get('/hotel', getAllHotelsController);
router.get('/hotel/:id', getHotelController);
router.get('/hotel/:id/booking', getHotelBookingsController);
router.put('/hotel/room/:id/booking', authenticate, createBookingController);

export default router;
